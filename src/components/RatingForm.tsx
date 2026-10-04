import React, { useState, useRef } from 'react';
import { Star, CheckCircle, AlertCircle, Sparkles, Send, ArrowRight, Camera, RefreshCw } from 'lucide-react';
import { ALL_BATCHES, PhotoUploadItem, SubmitFeedbackPayload } from '../types/alumni';
import { PhotoUploader } from './PhotoUploader';
import { submitFeedbackAndPhotos } from '../lib/reviewsApi';

interface RatingFormProps {
  onFeedbackSubmitted: () => void;
}

export const RatingForm: React.FC<RatingFormProps> = ({ onFeedbackSubmitted }) => {
  // Step State: 'rating' (Step 1) -> 'feedback' (Step 2) -> 'success' (Step 3)
  const [step, setStep] = useState<'rating' | 'feedback' | 'success'>('rating');

  // Star Rating
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [ratingError, setRatingError] = useState<string | null>(null);

  // Detailed Feedback Form Fields
  const [name, setName] = useState('');
  const [batch, setBatch] = useState('');
  const [card, setCard] = useState('');
  const [feedback, setFeedback] = useState('');
  const [improvements, setImprovements] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Photos
  const [photos, setPhotos] = useState<PhotoUploadItem[]>([]);
  const [showPhotoSection, setShowPhotoSection] = useState(false);

  // UI / Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [submissionResult, setSubmissionResult] = useState<{ success: boolean; message: string } | null>(null);

  const feedbackSectionRef = useRef<HTMLDivElement>(null);

  // Dynamic feedback messages per rating
  const getRatingMessage = (stars: number): string => {
    switch (stars) {
      case 1:
        return "We'd love to hear how we can do better.";
      case 2:
        return "Thank you. Your feedback helps us improve.";
      case 3:
        return "Thank you for sharing your experience.";
      case 4:
        return "Great! We're glad to hear that.";
      case 5:
        return "Excellent! Thank you for supporting our alumni community.";
      default:
        return "Select a star rating from 1 to 5.";
    }
  };

  // STEP 1 -> STEP 2
  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setRatingError("Please select a rating of 1 to 5 stars before continuing.");
      return;
    }
    setRatingError(null);
    setStep('feedback');

    // Smooth scroll to the revealed feedback form
    setTimeout(() => {
      feedbackSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // STEP 2 Validation and Submission
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = "Please enter your name.";
    }
    if (!batch) {
      errors.batch = "Please select your batch.";
    }
    if (!card.trim()) {
      errors.card = "Please enter your card number.";
    }
    if (!feedback.trim()) {
      errors.feedback = "Please enter your feedback.";
    }
    if (!improvements.trim()) {
      errors.improvements = "Please tell us what we can do better.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionResult(null);

    const payload: SubmitFeedbackPayload = {
      name: name.trim(),
      batch: batch,
      card: card.trim(),
      rating: rating,
      feedback: feedback.trim(),
      improvements: improvements.trim(),
      photos: photos.map(p => ({
        name: p.name,
        mimeType: p.mimeType,
        base64: p.base64
      })),
      honeypot: honeypot
    };

    try {
      const result = await submitFeedbackAndPhotos(payload);
      if (result.success) {
        setSubmissionResult({
          success: true,
          message: result.message
        });
        setStep('success');
        onFeedbackSubmitted();
      } else {
        setSubmissionResult({
          success: false,
          message: result.message || "Unable to submit your feedback. Please try again."
        });
      }
    } catch (err) {
      console.error(err);
      setSubmissionResult({
        success: false,
        message: "Network error. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForNew = () => {
    setStep('rating');
    setRating(0);
    setName('');
    setBatch('');
    setCard('');
    setFeedback('');
    setImprovements('');
    setPhotos([]);
    setShowPhotoSection(false);
    setValidationErrors({});
    setSubmissionResult(null);
  };

  return (
    <section id="rate-us" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-[#0c0507] via-[#1a0408] to-[#0c0507]">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#dfb15b] block mb-2">
            Alumni Voice
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fcf9f2]">
            Share Your Experience
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#dfb15b] to-transparent mx-auto mt-4" />
        </div>

        {/* ============================================================== */}
        {/* STEP 1: STAR RATING EXPERIENCE */}
        {/* ============================================================== */}
        <div className="bg-[#1c0409] border border-[#dfb15b]/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-500">
          
          {/* Subtle gold perimeter glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#dfb15b]/80 to-transparent" />

          <div className="text-center mb-8">
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#fcf9f2]">
              How would you rate the HNDE Labuduwa Alumni Association?
            </h3>
            <p className="text-xs sm:text-sm text-[#e7dece]/70 mt-1">
              Select your rating to begin your feedback
            </p>
          </div>

          {/* 5 Large Interactive Stars */}
          <div className="flex flex-col items-center justify-center">
            <div 
              className="flex items-center justify-center gap-2 sm:gap-4 my-2"
              role="radiogroup"
              aria-label="Star rating from 1 to 5"
            >
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setRating(star);
                      setRatingError(null);
                    }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 sm:p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfb15b] rounded-xl transition-transform active:scale-90 hover:scale-110"
                    role="radio"
                    aria-checked={rating === star}
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      className={`w-10 h-10 sm:w-14 sm:h-14 transition-colors duration-200 ${
                        isFilled
                          ? 'fill-[#dfb15b] text-[#fce5a3] drop-shadow-[0_0_12px_rgba(223,177,91,0.5)]'
                          : 'fill-transparent text-[#dfb15b]/30 hover:text-[#dfb15b]/70'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Dynamic Message Box Based on Star */}
            <div className="min-h-[2.5rem] flex items-center justify-center mt-3">
              <p className={`text-sm sm:text-base font-serif-display italic transition-opacity duration-300 ${
                rating > 0 ? 'text-[#fce5a3]' : 'text-[#e7dece]/50'
              }`}>
                {getRatingMessage(hoverRating || rating)}
              </p>
            </div>

            {ratingError && (
              <div className="mt-3 flex items-center gap-2 text-xs text-red-400 bg-red-950/60 px-4 py-2 rounded-lg border border-red-500/30">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{ratingError}</span>
              </div>
            )}

            {/* Step 1 Submit Button (Only visible if in rating step) */}
            {step === 'rating' && (
              <button
                type="button"
                onClick={handleRatingSubmit}
                className="mt-8 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wider text-[#1a080d] bg-gradient-to-r from-[#fce5a3] via-[#dfb15b] to-[#c59a3f] hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#dfb15b]/15 flex items-center gap-2"
              >
                <span>SUBMIT RATING</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {/* If rating submitted, show quiet edit button */}
            {step !== 'rating' && (
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs text-[#dfb15b] font-medium flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {rating} / 5 Rating Selected
                </span>
                <button
                  type="button"
                  onClick={() => setStep('rating')}
                  className="text-xs text-[#e7dece]/60 hover:text-white underline"
                >
                  Change Rating
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* STEP 2: DETAILED FEEDBACK FORM (REVEALED AFTER RATING SUBMITTED) */}
        {/* ============================================================== */}
        {step === 'feedback' && (
          <div
            ref={feedbackSectionRef}
            className="mt-10 bg-[#1c0409] border border-[#dfb15b]/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative animate-in fade-in slide-in-from-top-6 duration-500"
          >
            <div className="mb-8 pb-4 border-b border-white/5">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#dfb15b] block mb-1">
                Step 2 of 2
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#fcf9f2]">
                Tell Us About Your Experience
              </h3>
              <p className="text-xs sm:text-sm text-[#e7dece]/70 mt-1">
                All five fields are required to submit your review.
              </p>
            </div>

            <form onSubmit={handleFeedbackSubmit} noValidate className="space-y-6">
              
              {/* Anti-spam honeypot (invisible to real humans) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website_hp_check"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Grid: Name & Batch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Field 1: Name */}
                <div>
                  <label htmlFor="alumni-name" className="block text-xs font-semibold uppercase tracking-wider text-[#dfb15b] mb-2">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="alumni-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (validationErrors.name) {
                        setValidationErrors(prev => ({ ...prev, name: '' }));
                      }
                    }}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 rounded-xl bg-[#120205] border text-sm text-[#fcf9f2] placeholder-[#e7dece]/40 focus:outline-none focus:ring-2 focus:ring-[#dfb15b] transition-all ${
                      validationErrors.name ? 'border-red-500' : 'border-[#dfb15b]/25 focus:border-[#dfb15b]'
                    }`}
                  />
                  {validationErrors.name && (
                    <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{validationErrors.name}</span>
                    </p>
                  )}
                </div>

                {/* Field 2: Batch */}
                <div>
                  <label htmlFor="alumni-batch" className="block text-xs font-semibold uppercase tracking-wider text-[#dfb15b] mb-2">
                    Batch <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="alumni-batch"
                    value={batch}
                    onChange={(e) => {
                      setBatch(e.target.value);
                      if (validationErrors.batch) {
                        setValidationErrors(prev => ({ ...prev, batch: '' }));
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-[#120205] border text-sm text-[#fcf9f2] focus:outline-none focus:ring-2 focus:ring-[#dfb15b] transition-all ${
                      validationErrors.batch ? 'border-red-500' : 'border-[#dfb15b]/25 focus:border-[#dfb15b]'
                    }`}
                  >
                    <option value="" disabled className="bg-[#120205] text-[#e7dece]/50">
                      Select your batch
                    </option>
                    {ALL_BATCHES.map((b) => (
                      <option key={b} value={b} className="bg-[#120205] text-[#fcf9f2]">
                        {b}
                      </option>
                    ))}
                  </select>
                  {validationErrors.batch && (
                    <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{validationErrors.batch}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Field 3: Card */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="alumni-card" className="block text-xs font-semibold uppercase tracking-wider text-[#dfb15b]">
                    Card <span className="text-red-400">*</span>
                  </label>
                  <span className="text-[11px] text-[#e7dece]/50">
                    Confidential & strictly internal (never published)
                  </span>
                </div>
                <input
                  id="alumni-card"
                  type="text"
                  value={card}
                  onChange={(e) => {
                    setCard(e.target.value);
                    if (validationErrors.card) {
                      setValidationErrors(prev => ({ ...prev, card: '' }));
                    }
                  }}
                  placeholder="Enter your card number"
                  className={`w-full px-4 py-3 rounded-xl bg-[#120205] border text-sm text-[#fcf9f2] placeholder-[#e7dece]/40 focus:outline-none focus:ring-2 focus:ring-[#dfb15b] transition-all ${
                    validationErrors.card ? 'border-red-500' : 'border-[#dfb15b]/25 focus:border-[#dfb15b]'
                  }`}
                />
                {validationErrors.card && (
                  <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{validationErrors.card}</span>
                  </p>
                )}
              </div>

              {/* Field 4: Feedback */}
              <div>
                <label htmlFor="alumni-feedback" className="block text-xs font-semibold uppercase tracking-wider text-[#dfb15b] mb-2">
                  Feedback <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="alumni-feedback"
                  rows={4}
                  value={feedback}
                  onChange={(e) => {
                    setFeedback(e.target.value);
                    if (validationErrors.feedback) {
                      setValidationErrors(prev => ({ ...prev, feedback: '' }));
                    }
                  }}
                  placeholder="Share your experience with the HNDE Labuduwa Alumni Association..."
                  className={`w-full px-4 py-3 rounded-xl bg-[#120205] border text-sm text-[#fcf9f2] placeholder-[#e7dece]/40 focus:outline-none focus:ring-2 focus:ring-[#dfb15b] transition-all leading-relaxed ${
                    validationErrors.feedback ? 'border-red-500' : 'border-[#dfb15b]/25 focus:border-[#dfb15b]'
                  }`}
                />
                {validationErrors.feedback && (
                  <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{validationErrors.feedback}</span>
                  </p>
                )}
              </div>

              {/* Field 5: How can we improve? */}
              <div>
                <label htmlFor="alumni-improve" className="block text-xs font-semibold uppercase tracking-wider text-[#dfb15b] mb-2">
                  How can we improve? <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="alumni-improve"
                  rows={3}
                  value={improvements}
                  onChange={(e) => {
                    setImprovements(e.target.value);
                    if (validationErrors.improvements) {
                      setValidationErrors(prev => ({ ...prev, improvements: '' }));
                    }
                  }}
                  placeholder="Tell us what we can do better..."
                  className={`w-full px-4 py-3 rounded-xl bg-[#120205] border text-sm text-[#fcf9f2] placeholder-[#e7dece]/40 focus:outline-none focus:ring-2 focus:ring-[#dfb15b] transition-all leading-relaxed ${
                    validationErrors.improvements ? 'border-red-500' : 'border-[#dfb15b]/25 focus:border-[#dfb15b]'
                  }`}
                />
                {validationErrors.improvements && (
                  <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{validationErrors.improvements}</span>
                  </p>
                )}
              </div>

              {/* Optional Photo Attachment toggle */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowPhotoSection(!showPhotoSection)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#dfb15b] hover:text-[#fce5a3] transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  <span>
                    {showPhotoSection ? "Hide photo attachment" : "Attach event / alumni photos (Optional)"}
                  </span>
                  {photos.length > 0 && (
                    <span className="ml-1 text-[11px] px-2 py-0.5 rounded-full bg-[#dfb15b] text-[#1a080d] font-bold">
                      {photos.length}
                    </span>
                  )}
                </button>

                {showPhotoSection && (
                  <div className="mt-4 p-4 rounded-2xl bg-[#140306] border border-[#dfb15b]/20">
                    <PhotoUploader
                      onPhotosChange={setPhotos}
                      initialPhotos={photos}
                      maxFiles={5}
                      maxSizeMb={5}
                    />
                  </div>
                )}
              </div>

              {/* Error Alert */}
              {submissionResult && !submissionResult.success && (
                <div className="p-4 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{submissionResult.message}</span>
                </div>
              )}

              {/* Submit Feedback Action */}
              <div className="pt-4 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setStep('rating')}
                  className="px-5 py-3 text-xs font-semibold text-[#e7dece] hover:text-white"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-xl text-sm font-bold tracking-wider text-[#1a080d] bg-gradient-to-r from-[#fce5a3] via-[#dfb15b] to-[#c59a3f] hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all shadow-xl shadow-[#dfb15b]/20 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Submitting your feedback...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SUBMIT FEEDBACK</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP 3: SUCCESS EXPERIENCE & PHOTO UPLOAD SECTION */}
        {/* ============================================================== */}
        {step === 'success' && (
          <div className="mt-10 bg-[#1c0409] border border-[#dfb15b]/40 rounded-3xl p-8 sm:p-12 shadow-2xl text-center relative overflow-hidden animate-in zoom-in-95 duration-500">
            
            {/* Success icon badge */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#dfb15b] to-[#9a7428] text-[#1a080d] flex items-center justify-center mx-auto mb-6 shadow-xl">
              <CheckCircle className="w-9 h-9" />
            </div>

            <h3 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#fcf9f2] mb-3">
              Thank You!
            </h3>

            <p className="text-base sm:text-lg font-serif-display italic text-[#dfb15b] max-w-xl mx-auto mb-6">
              "Your voice helps us build a stronger HNDE Labuduwa alumni community."
            </p>

            <div className="flex items-center justify-center gap-1.5 text-[#dfb15b] mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-6 h-6 ${s <= rating ? 'fill-[#dfb15b]' : 'opacity-30'}`}
                />
              ))}
            </div>

            <p className="text-xs sm:text-sm text-[#e7dece]/80 mb-8">
              Your feedback has been recorded.
            </p>

            {/* Photo Sharing Prompt */}
            {!showPhotoSection ? (
              <div className="p-6 rounded-2xl bg-[#140306] border border-[#dfb15b]/25 max-w-lg mx-auto">
                <p className="text-sm font-semibold text-[#fcf9f2] mb-1">
                  Would you like to share a memory?
                </p>
                <p className="text-xs text-[#e7dece]/70 mb-4">
                  Upload your favorite HNDE Labuduwa or alumni event photographs to feature in our community gallery.
                </p>
                <button
                  type="button"
                  onClick={() => setShowPhotoSection(true)}
                  className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wider text-[#1a080d] bg-[#dfb15b] hover:bg-[#fce5a3] transition-colors flex items-center justify-center gap-2 mx-auto active:scale-95 shadow-md"
                >
                  <Camera className="w-4 h-4" />
                  <span>UPLOAD EVENT PHOTO</span>
                </button>
              </div>
            ) : (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#140306] border border-[#dfb15b]/30 max-w-2xl mx-auto text-left">
                <div className="text-center mb-6">
                  <h4 className="font-serif-display text-xl font-bold text-[#fcf9f2]">
                    Share a Memory
                  </h4>
                  <p className="text-xs text-[#e7dece]/70 mt-1">
                    Upload your favorite HNDE Labuduwa or alumni event photographs and help us preserve our memories.
                  </p>
                </div>

                <PhotoUploader
                  onPhotosChange={setPhotos}
                  initialPhotos={photos}
                  maxFiles={5}
                  maxSizeMb={5}
                />

                <div className="mt-6 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={async () => {
                      if (photos.length === 0) {
                        alert("Please select at least one photo.");
                        return;
                      }
                      setIsSubmitting(true);
                      await submitFeedbackAndPhotos({
                        name: name || "Alumni",
                        batch: batch || "Alumni",
                        card: card || "PHOTO_CONTRIBUTION",
                        rating: rating || 5,
                        feedback: "Photo memory contribution",
                        improvements: "None",
                        photos: photos.map(p => ({
                          name: p.name,
                          mimeType: p.mimeType,
                          base64: p.base64
                        }))
                      });
                      setIsSubmitting(false);
                      onFeedbackSubmitted();
                      setShowPhotoSection(false);
                    }}
                    disabled={isSubmitting || photos.length === 0}
                    className="px-7 py-3 rounded-xl text-xs sm:text-sm font-bold text-[#1a080d] bg-[#dfb15b] hover:bg-[#fce5a3] disabled:opacity-50 transition-colors flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Uploading photos...</span>
                      </>
                    ) : (
                      <>
                        <Camera className="w-4 h-4" />
                        <span>UPLOAD PHOTOS</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-white/5">
              <button
                type="button"
                onClick={handleResetForNew}
                className="text-xs text-[#dfb15b] hover:underline tracking-wider uppercase font-semibold"
              >
                Submit another review
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
