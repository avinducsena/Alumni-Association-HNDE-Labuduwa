# HNDE Labuduwa Alumni Association — Backend & Google Drive Setup Guide

This guide walks you through connecting your free Google Sheets review database and Google Drive photo storage using Google Apps Script.

**100% Free**: No Firebase, no Supabase, no paid cloud storage, and no secret keys exposed in client JavaScript.

---

## 1. Create the Google Sheet

1. Go to [Google Sheets](https://sheets.new) and create a new blank spreadsheet.
2. Title it: `HNDE Labuduwa Alumni Reviews 2026`.
3. Rename the first sheet tab at the bottom to `Reviews`.

The script will automatically generate the header row if empty, or you can manually enter these columns in row 1:
- **Column A**: `Timestamp`
- **Column B**: `Rating`
- **Column C**: `Name`
- **Column D**: `Batch`
- **Column E**: `Card (Private)` *(Never shown in public reviews)*
- **Column F**: `Feedback`
- **Column G**: `How Can We Improve`
- **Column H**: `Photo URLs`
- **Column I**: `Approved` *(Defaults to `TRUE`; change to `FALSE` to hide any review)*
- **Column J**: `User Agent`

---

## 2. Deploy Google Apps Script

1. Inside your spreadsheet, click **Extensions** → **Apps Script**.
2. Erase any default code in `Code.gs`.
3. Open the file `google-apps-script/Code.gs` in this project, copy its entire contents, and paste it into the Apps Script editor.
4. Verify the Google Drive Folder ID on line 12:
   ```javascript
   const DRIVE_FOLDER_ID = "1yQX_ibiOROfgiW10fDdYNguvHLD_x6Q5";
   ```
   *(Ensure your Google account has editor access to this folder, or use your own Google Drive folder ID).*
5. Click the **Save** floppy-disk icon.

---

## 3. Deploy as a Public Web App

1. In the upper-right corner of the Apps Script editor, click **Deploy** → **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `HNDE Alumni Feedback & Photo Storage v1`
   - **Execute as**: `Me (your_email@gmail.com)`
   - **Who has access**: `Anyone` *(Crucial so that alumni can submit feedback without requiring Google sign-in)*
4. Click **Deploy**.
5. When prompted with **"Authorization required"**, click **Authorize access**, choose your Google account, click **Advanced**, and click **"Go to Untitled project (unsafe)"** (standard for personal Apps Scripts).
6. Copy the generated **Web App URL** (it ends in `/exec`).
   Example:
   `https://script.google.com/macros/s/AKfycbx.../exec`

---

## 4. Configure Your Environment Variables

### For Local Development or Vercel:
Create or edit your `.env` or set it in your Vercel Project Settings:

```env
# REQUIRED CONFIGURATION:
VITE_APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycbx.../exec"
```
*(If building in Next.js, also supports `NEXT_PUBLIC_REVIEW_API_URL`)*

> **Note on Fallback / Live Preview**: If no environment variable is provided, the website will seamlessly load authentic pre-seeded alumni reviews and simulate client-side storage so that you can test all UI flows, star ratings, and photo uploads immediately!

---

## 5. Test Your Integration

1. Open the website.
2. Rate 5 stars and click **Submit Rating**.
3. Fill in the 5 required fields:
   - Name
   - Batch (e.g., `Batch 04`)
   - Card
   - Feedback
   - How can we improve?
4. Optionally choose 1–5 event photos.
5. Click **Submit Feedback**.
6. Check your Google Sheet: A new row will be created immediately with `Approved = TRUE`.
7. Check the Google Drive folder (`1yQX_ibiOROfgiW10fDdYNguvHLD_x6Q5`): Uploaded images will appear with descriptive filenames.
8. The homepage review carousel and review grid will automatically reflect the newly submitted feedback and dynamic average rating calculations!
