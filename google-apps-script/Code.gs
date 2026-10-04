/**
 * HNDE LABUDUWA ALUMNI ASSOCIATION
 * Event Feedback & Google Drive Photo Storage Backend
 * 
 * Google Apps Script Web App
 * Target Drive Folder ID: 1yQX_ibiOROfgiW10fDdYNguvHLD_x6Q5
 * 
 * Architecture:
 * - GET: Retrieves approved reviews for the public website (Omits private 'Card' numbers)
 * - POST: Handles rating, feedback, improvement suggestions, and photo uploads to Google Drive
 */

const DRIVE_FOLDER_ID = "1yQX_ibiOROfgiW10fDdYNguvHLD_x6Q5";
const SHEET_NAME = "Reviews";

// Allowed MIME types
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Handle HTTP GET Requests
 * Returns approved reviews for the website
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Auto-create sheet with header if missing
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      initSheetHeader(sheet);
      return createJsonResponse({
        success: true,
        reviews: [],
        stats: { total: 0, average: 5.0, distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } }
      });
    }

    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return createJsonResponse({
        success: true,
        reviews: [],
        stats: { total: 0, average: 5.0, distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } }
      });
    }

    const reviews = [];
    let sumRating = 0;
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    // Columns:
    // 0: Timestamp
    // 1: Rating
    // 2: Name
    // 3: Batch
    // 4: Card (PRIVATE - NEVER EXPOSE)
    // 5: Feedback
    // 6: How Can We Improve
    // 7: Photo URLs
    // 8: Approved
    // 9: User Agent

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const isApproved = String(row[8]).trim().toUpperCase() === "TRUE" || row[8] === true;
      
      if (isApproved) {
        const rating = Number(row[1]) || 5;
        sumRating += rating;
        if (distribution[rating] !== undefined) {
          distribution[rating]++;
        }

        let photoList = [];
        if (row[7]) {
          try {
            photoList = typeof row[7] === 'string' && row[7].startsWith('[')
              ? JSON.parse(row[7])
              : String(row[7]).split(',').map(s => s.trim()).filter(Boolean);
          } catch (err) {
            photoList = String(row[7]).split(',').map(s => s.trim()).filter(Boolean);
          }
        }

        reviews.push({
          id: i,
          timestamp: row[0],
          rating: rating,
          name: sanitizeOutput(String(row[2] || "")),
          batch: String(row[3] || "Alumni"),
          feedback: sanitizeOutput(String(row[5] || "")),
          improvements: sanitizeOutput(String(row[6] || "")),
          photos: photoList
        });
      }
    }

    // Sort newest first
    reviews.reverse();

    const total = reviews.length;
    const average = total > 0 ? Number((sumRating / total).toFixed(1)) : 5.0;

    return createJsonResponse({
      success: true,
      reviews: reviews,
      stats: {
        total: total,
        average: average,
        distribution: distribution
      }
    });

  } catch (error) {
    return createJsonResponse({
      success: false,
      message: "Failed to retrieve reviews: " + error.toString()
    });
  }
}

/**
 * Handle HTTP POST Requests
 * Processes feedback and uploads photos to Google Drive
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        success: false,
        message: "No payload received"
      });
    }

    let payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return createJsonResponse({
        success: false,
        message: "Invalid JSON payload"
      });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      initSheetHeader(sheet);
    }

    // Honeypot anti-spam check
    if (payload.websiteUrl || payload.hpField) {
      return createJsonResponse({
        success: false,
        message: "Spam detected."
      });
    }

    // Validation
    const name = String(payload.name || "").trim();
    const batch = String(payload.batch || "").trim();
    const card = String(payload.card || "").trim();
    const feedback = String(payload.feedback || "").trim();
    const improvements = String(payload.improvements || "").trim();
    const rating = Math.min(5, Math.max(1, parseInt(payload.rating, 10) || 5));
    const userAgent = String(payload.userAgent || "Web Client").slice(0, 200);

    if (!name || !batch || !card || !feedback || !improvements) {
      return createJsonResponse({
        success: false,
        message: "All fields (Name, Batch, Card, Feedback, Improvement Suggestions) are required."
      });
    }

    // Handle optional photo uploads to Google Drive
    const uploadedPhotoUrls = [];
    if (payload.photos && Array.isArray(payload.photos) && payload.photos.length > 0) {
      const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
      const photoLimit = Math.min(payload.photos.length, 5);

      for (let p = 0; p < photoLimit; p++) {
        const item = payload.photos[p];
        if (!item || !item.base64) continue;

        const mimeType = (item.mimeType || "image/jpeg").toLowerCase();
        if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
          continue; // skip invalid mime
        }

        // Clean base64 string
        let cleanBase64 = item.base64;
        if (cleanBase64.indexOf(',') > -1) {
          cleanBase64 = cleanBase64.split(',')[1];
        }

        const decodedBytes = Utilities.base64Decode(cleanBase64);
        if (decodedBytes.length > MAX_FILE_SIZE_BYTES) {
          continue; // skip oversized file
        }

        const ext = mimeType.replace('image/', '').replace('jpeg', 'jpg');
        const fileName = "HNDE_Alumni_" + sanitizeFileName(batch) + "_" + sanitizeFileName(name) + "_" + Utilities.formatDate(new Date(), "GMT+5:30", "yyyyMMdd_HHmmss") + "_" + (p + 1) + "." + ext;
        
        const blob = Utilities.newBlob(decodedBytes, mimeType, fileName);
        const file = folder.createFile(blob);
        
        // Make publicly readable via link for alumni gallery
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        
        // Generate high-speed CDN direct URL via Google Drive ID
        const fileId = file.getId();
        const directUrl = "https://lh3.googleusercontent.com/d/" + fileId;
        uploadedPhotoUrls.push(directUrl);
      }
    }

    // Append to sheet
    // Columns: Timestamp, Rating, Name, Batch, Card, Feedback, Improvements, Photo URLs, Approved, User Agent
    const timestamp = Utilities.formatDate(new Date(), "Asia/Colombo", "yyyy-MM-dd HH:mm:ss");
    sheet.appendRow([
      timestamp,
      rating,
      name,
      batch,
      card, // Stored safely in sheet; NEVER returned in public GET
      feedback,
      improvements,
      JSON.stringify(uploadedPhotoUrls),
      "TRUE", // Approved by default; Admin can toggle to FALSE
      userAgent
    ]);

    return createJsonResponse({
      success: true,
      message: "Feedback submitted successfully! Thank you for supporting the HNDE Labuduwa Alumni community.",
      photoCount: uploadedPhotoUrls.length,
      photoUrls: uploadedPhotoUrls
    });

  } catch (error) {
    return createJsonResponse({
      success: false,
      message: "Submission failed: " + error.toString()
    });
  }
}

/**
 * Initialize Header Row for new sheet
 */
function initSheetHeader(sheet) {
  const headers = [
    "Timestamp",
    "Rating",
    "Name",
    "Batch",
    "Card (Private)",
    "Feedback",
    "How Can We Improve",
    "Photo URLs",
    "Approved",
    "User Agent"
  ];
  sheet.appendRow(headers);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#350910").setFontColor("#f6d58c");
}

/**
 * Sanitize filename
 */
function sanitizeFileName(str) {
  return str.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30);
}

/**
 * Output sanitizer to prevent HTML/XSS injection
 */
function sanitizeOutput(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Standard CORS JSON Response
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
