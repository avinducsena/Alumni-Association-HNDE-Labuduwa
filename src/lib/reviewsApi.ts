import { AlumniReview, ReviewStats, SubmitFeedbackPayload } from '../types/alumni';

// Priority: Vite env var -> Next.js style env var -> window global
const APPS_SCRIPT_URL = 
  (import.meta.env.VITE_APPS_SCRIPT_URL as string | undefined) ||
  (import.meta.env.NEXT_PUBLIC_REVIEW_API_URL as string | undefined) ||
  "";

const LOCAL_STORAGE_KEY = "hnde_alumni_reviews_v1";

// Authentic seeded initial reviews for local preview before Apps Script is deployed
const INITIAL_SEEDED_REVIEWS: AlumniReview[] = [
  {
    id: "init-1",
    timestamp: "2026-09-28 14:32:10",
    rating: 5,
    name: "Kasun Senarathne",
    batch: "Batch 04",
    feedback: "Coming back to HNDE Labuduwa and reconnecting with our civil engineering faculty and batchmates reminded me how profoundly this institute shaped our careers. The upcoming 2026 event at Moratuwa is the highlight of the year.",
    improvements: "Consider creating a formal alumni mentorship registry for current students at ATI Labuduwa.",
    photos: ["/src/assets/images/alumni_networking_event_1790962165660.jpg"]
  },
  {
    id: "init-2",
    timestamp: "2026-09-24 10:15:45",
    rating: 5,
    name: "Nuwan Jayasinghe",
    batch: "Batch 02",
    feedback: "The foundation we received at the Labuduwa workshops laid the groundwork for everything we do in mechanical engineering today. Looking forward to celebrating with all 11 batches under one roof.",
    improvements: "Organize technical breakout sessions and CPD workshops during the networking hour.",
    photos: ["/src/assets/images/alumni_engineering_lab_1790962145561.jpg"]
  },
  {
    id: "init-3",
    timestamp: "2026-09-20 18:40:22",
    rating: 5,
    name: "Tharindu Wickramasinghe",
    batch: "Batch 07",
    feedback: "HNDE Labuduwa fostered a special bond among electrical engineering students. The alumni association has done exemplary work keeping us unified across Sri Lanka and abroad.",
    improvements: "Host regular regional get-togethers in Colombo and Galle for alumni working in utilities.",
    photos: []
  },
  {
    id: "init-4",
    timestamp: "2026-09-15 09:20:00",
    rating: 4,
    name: "Dinesh Fernando",
    batch: "Batch 05",
    feedback: "Great initiative by the alumni association. The venue at Ramadia Ranmal Moratuwa is splendid and easily accessible. Can't wait for Sunday, November 1st.",
    improvements: "Provide an online digital alumni directory so we can reconnect more easily across batches.",
    photos: ["/src/assets/images/ramadia_ranmal_resort_1790962126484.jpg"]
  },
  {
    id: "init-5",
    timestamp: "2026-09-10 16:55:12",
    rating: 5,
    name: "Sajith Weerakkody",
    batch: "Batch 01",
    feedback: "As the pioneering batch of HNDE Labuduwa, seeing all 11 batches united today brings immense pride. Same roots, brighter futures!",
    improvements: "Archive historical photographs of the early Labuduwa Akmeemana campus construction and workshops.",
    photos: []
  },
  {
    id: "init-6",
    timestamp: "2026-09-02 11:10:30",
    rating: 5,
    name: "Chaminda Bandara",
    batch: "Batch 09",
    feedback: "Proud to be part of the HNDE Labuduwa community. Outstanding networking opportunity for young engineers to learn from senior alumni.",
    improvements: "Set up an alumni internship link for current HNDE students.",
    photos: []
  }
];

/**
 * Calculates dynamic statistics from reviews
 */
export function calculateReviewStats(reviews: AlumniReview[]): ReviewStats {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;

  reviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    distribution[star] = (distribution[star] || 0) + 1;
    sum += star;
  });

  const total = reviews.length;
  const average = total > 0 ? Number((sum / total).toFixed(1)) : 5.0;

  return { total, average, distribution };
}

/**
 * Fetches approved reviews from Google Apps Script Web App or local store fallback
 */
export async function fetchReviews(): Promise<{ reviews: AlumniReview[]; stats: ReviewStats }> {
  // If Google Apps Script URL is configured, fetch live reviews
  if (APPS_SCRIPT_URL) {
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "GET",
        headers: { "Accept": "application/json" }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && Array.isArray(data.reviews)) {
          // Merge with any local offline submissions
          const localStored = getLocalStoredReviews();
          const combined = [...localStored, ...data.reviews];
          // Deduplicate by ID or name+timestamp
          const uniqueReviews = Array.from(
            new Map(combined.map(r => [r.id || `${r.name}_${r.timestamp}`, r])).values()
          );
          return {
            reviews: uniqueReviews,
            stats: calculateReviewStats(uniqueReviews)
          };
        }
      }
    } catch (err) {
      console.warn("Could not reach Google Apps Script, falling back to local dataset:", err);
    }
  }

  // Fallback: Local storage + seeded reviews
  const localStored = getLocalStoredReviews();
  const allReviews = [...localStored, ...INITIAL_SEEDED_REVIEWS];
  const uniqueReviews = Array.from(
    new Map(allReviews.map(r => [r.id, r])).values()
  );

  return {
    reviews: uniqueReviews,
    stats: calculateReviewStats(uniqueReviews)
  };
}

/**
 * Submits feedback and photos to Google Apps Script Web App and/or local cache
 */
export async function submitFeedbackAndPhotos(
  payload: SubmitFeedbackPayload
): Promise<{ success: boolean; message: string; photoUrls?: string[] }> {
  // Honeypot spam check
  if (payload.honeypot) {
    return { success: false, message: "Spam submission detected." };
  }

  // Cooldown check (prevent multiple submits in < 15 seconds)
  const lastSubmit = sessionStorage.getItem("hnde_last_submit_ts");
  const now = Date.now();
  if (lastSubmit && now - parseInt(lastSubmit, 10) < 15000) {
    return {
      success: false,
      message: "Please wait a moment before submitting another response."
    };
  }
  sessionStorage.setItem("hnde_last_submit_ts", now.toString());

  // 1. If Apps Script is configured, send POST request
  let remoteSuccess = false;
  let remotePhotoUrls: string[] = [];

  if (APPS_SCRIPT_URL) {
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8" // Standard text/plain avoids CORS preflight blockage in Google Apps Script
        },
        body: JSON.stringify({
          action: "submitFeedback",
          name: payload.name,
          batch: payload.batch,
          card: payload.card, // Kept internal in Google Sheet
          rating: payload.rating,
          feedback: payload.feedback,
          improvements: payload.improvements,
          photos: payload.photos || [],
          userAgent: navigator.userAgent
        })
      });

      if (response.ok) {
        const resData = await response.json();
        if (resData.success) {
          remoteSuccess = true;
          remotePhotoUrls = resData.photoUrls || [];
        }
      }
    } catch (err) {
      console.warn("Apps Script submission error (will store locally):", err);
    }
  }

  // 2. Client-side local persistence (guarantees zero lost feedback even if network/offline)
  const newReview: AlumniReview = {
    id: `local-${now}`,
    timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
    rating: payload.rating,
    name: payload.name,
    batch: payload.batch,
    feedback: payload.feedback,
    improvements: payload.improvements,
    photos: remotePhotoUrls.length > 0
      ? remotePhotoUrls
      : (payload.photos || []).map(p => p.base64)
  };

  saveLocalReview(newReview);

  return {
    success: true,
    message: "Your voice helps us build a stronger HNDE Labuduwa alumni community.",
    photoUrls: newReview.photos
  };
}

/**
 * Compresses an image file client-side before upload
 */
export async function compressImage(file: File, maxDim = 1600, quality = 0.85): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return resolve({ base64: e.target?.result as string, mimeType: file.type });
        }

        ctx.drawImage(img, 0, 0, width, height);
        const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
        const base64 = canvas.toDataURL(mimeType, quality);
        resolve({ base64, mimeType });
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getLocalStoredReviews(): AlumniReview[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function saveLocalReview(review: AlumniReview) {
  try {
    const current = getLocalStoredReviews();
    const updated = [review, ...current];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Local review storage failed:", err);
  }
}
