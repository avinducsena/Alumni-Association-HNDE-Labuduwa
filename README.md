# HNDE Labuduwa Alumni Association — Event Feedback & Community Platform

A modern alumni event feedback and community web platform designed for the **HNDE Labuduwa Alumni Association** and their flagship event:

> **HNDE ALUMNI EVENT 2026**  
> *Alumni Get-Together & Professional Networking Event 2026*  
> **Date**: Sunday, 01 November 2026 | 10:00 AM – 4:00 PM  
> **Venue**: Ramadia Ranmal Holiday Resort, Moratuwa, Sri Lanka  
> **Taglines**:  
> *"Same Roots. Brighter Futures."*  
> *"Reconnect | Network | Build a Brighter Tomorrow"*  

---

## Key Features

1. **Ticket-Inspired Visual Identity**:
   - Deep burgundy red, warm antique gold, cream/ivory, and charcoal palette.
   - Perforated ticket badge styling with cutouts, tear lines, and barcode motifs.
   - Refined serif display typography (`Cinzel` & `Cormorant Garamond`) paired with modern sans-serif body type (`Plus Jakarta Sans`).

2. **Verified Academic & Institutional Legacy**:
   - Details Advanced Technological Institute (ATI) Labuduwa, Akmeemana, Galle under SLIATE.
   - Highlights the core engineering disciplines: Civil Engineering, Electrical Engineering, and Mechanical Engineering.

3. **11 Batches Visual Community**:
   - Interactive batch timeline (Batch 01 to Batch 11).
   - Real-time review count per batch with one-click filtering.

4. **Multi-Stage Feedback Flow**:
   - **Step 1: Star Rating Selection**: 5 large interactive stars with dynamic messaging per star.
   - **Step 2: Detailed Feedback Form**: Revealed with smooth animation only after rating submission. Requires Name, Batch, Card (kept strictly confidential), Feedback, and Improvement suggestions.
   - **Step 3: Success Screen & Photo Uploader**: Congratulatory screen prompting alumni to upload event photographs.

5. **Client-Side Image Compression & Upload**:
   - Supports JPG, PNG, and WEBP formats up to 5 MB per image (up to 5 images per submission).
   - Client-side `<canvas>` image compression for rapid transmission.

6. **100% Free Google Apps Script Backend**:
   - **Database**: Google Sheets (storing Timestamp, Rating, Name, Batch, Card, Feedback, Improvements, Photo URLs, Approved status).
   - **Photo Storage**: Google Drive folder (`1yQX_ibiOROfgiW10fDdYNguvHLD_x6Q5`).
   - Zero paid cloud services required (no Firebase, no Supabase, no OpenAI billing).

7. **Dynamic Review Platform & Rating Statistics**:
   - Dynamic overall average rating (e.g. 4.8 / 5.0) and total review counters.
   - Star rating distribution breakdown bars (5★ to 1★).
   - Touch-friendly review carousel with auto-rotation, pause-on-hover, and modal "Read More" view.
   - Batch filter tabs ("Explore Alumni Voices").

8. **Alumni Memories Gallery**:
   - Responsive masonry/grid layout.
   - Fullscreen Lightbox viewer with previous/next controls.

9. **Security, Privacy & Anti-Spam**:
   - "Card" numbers are stored internally in the private Google Sheet and **never** returned or displayed in public reviews.
   - Output sanitization preventing script/HTML injection.
   - Honeypot spam trap and submission cooldown throttle.

---

## Architecture

```text
  Alumni User (Browser)
          │
          ├── Review & Rating Submission
          ├── Compressed Photo Base64
          │
          ▼
  Google Apps Script Web App (Code.gs)
          ├── Saves row to Google Sheets ("Reviews")
          │     └── Timestamp, Rating, Name, Batch, [Card - Private], Feedback, Approved
          │
          └── Uploads photo to Google Drive Folder (1yQX_ibiOROfgiW10fDdYNguvHLD_x6Q5)
                └── Generates direct web viewable link
```

---

## Environment Variables

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_APPS_SCRIPT_URL` | Google Apps Script Web App URL (Vite) | `https://script.google.com/macros/s/AKfycb.../exec` |
| `NEXT_PUBLIC_REVIEW_API_URL` | Google Apps Script Web App URL (Next.js) | `https://script.google.com/macros/s/AKfycb.../exec` |

*(If no variable is specified, the application seamlessly runs in preview mode with pre-seeded authentic reviews and localStorage persistence).*

---

## Deployment to Vercel

1. Push this repository to GitHub or import directly into Vercel.
2. In the Vercel Project Settings under **Environment Variables**, add:
   - **Key**: `VITE_APPS_SCRIPT_URL`
   - **Value**: Your published Google Apps Script Web App URL.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Click **Deploy**.

For detailed Google Sheets and Google Drive setup instructions, see [`SETUP.md`](./SETUP.md).
