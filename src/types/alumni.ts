export interface AlumniReview {
  id: string | number;
  timestamp: string;
  rating: number; // 1-5
  name: string;
  batch: string; // e.g., "Batch 04"
  feedback: string;
  improvements?: string;
  photos?: string[];
  // Note: 'card' is strictly internal and never exposed to the public
}

export interface ReviewStats {
  total: number;
  average: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface PhotoUploadItem {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  previewUrl: string;
  base64: string;
  file: File;
}

export interface SubmitFeedbackPayload {
  name: string;
  batch: string;
  card: string;
  rating: number;
  feedback: string;
  improvements: string;
  photos?: Array<{
    name: string;
    mimeType: string;
    base64: string;
  }>;
  honeypot?: string;
}

export const ALL_BATCHES = [
  "Batch 01",
  "Batch 02",
  "Batch 03",
  "Batch 04",
  "Batch 05",
  "Batch 06",
  "Batch 07",
  "Batch 08",
  "Batch 09",
  "Batch 10",
  "Batch 11",
] as const;

export type BatchNumber = (typeof ALL_BATCHES)[number];
