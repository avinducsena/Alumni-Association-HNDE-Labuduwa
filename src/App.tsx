/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { EventInfo } from './components/EventInfo';
import { BatchSection } from './components/BatchSection';
import { RatingForm } from './components/RatingForm';
import { ReviewSection } from './components/ReviewSection';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { AlumniReview, ReviewStats, ALL_BATCHES } from './types/alumni';
import { fetchReviews } from './lib/reviewsApi';

export default function App() {
  const [reviews, setReviews] = useState<AlumniReview[]>([]);
  const [stats, setStats] = useState<ReviewStats>({
    total: 0,
    average: 5.0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });
  const [selectedBatch, setSelectedBatch] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  // Load reviews on mount
  const loadData = async () => {
    try {
      const data = await fetchReviews();
      setReviews(data.reviews);
      setStats(data.stats);
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute review counts per batch
  const batchReviewCounts: Record<string, number> = {};
  ALL_BATCHES.forEach(b => {
    batchReviewCounts[b] = reviews.filter(r => r.batch === b).length;
  });

  const scrollToRate = () => {
    const el = document.getElementById('rate-us');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToReviews = () => {
    const el = document.getElementById('reviews');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBatchSelect = (batch: string) => {
    setSelectedBatch(batch);
    // Smooth scroll down to review section
    const el = document.getElementById('reviews');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0507] text-[#f4efe8] flex flex-col font-sans selection:bg-[#dfb15b] selection:text-[#1a080d]">
      {/* Fixed Navigation Header */}
      <Navbar />

      <main className="flex-grow">
        {/* 1. Hero Section with visual ticket branding */}
        <Hero
          onRateClick={scrollToRate}
          onReviewsClick={scrollToReviews}
        />

        {/* 2. About HNDE Labuduwa Section */}
        <AboutSection />

        {/* 3. Event 2026 Information Section */}
        <EventInfo />

        {/* 4. 11 Batches Alumni Community Section */}
        <BatchSection
          selectedBatch={selectedBatch}
          onSelectBatch={handleBatchSelect}
          batchReviewCounts={batchReviewCounts}
        />

        {/* 5. Star Rating Experience & Detailed Feedback Form Flow */}
        <RatingForm onFeedbackSubmitted={loadData} />

        {/* 6. What Our Alumni Say - Dynamic Reviews & Carousel */}
        <ReviewSection
          reviews={reviews}
          stats={stats}
          selectedBatch={selectedBatch}
          onSelectBatch={setSelectedBatch}
          onRateClick={scrollToRate}
        />

        {/* 7. Alumni Memories / Photo Gallery */}
        <Gallery
          reviews={reviews}
          onUploadClick={scrollToRate}
        />
      </main>

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}
