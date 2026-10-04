import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { PhotoUploadItem } from '../types/alumni';
import { compressImage } from '../lib/reviewsApi';

interface PhotoUploaderProps {
  onPhotosChange: (photos: PhotoUploadItem[]) => void;
  maxFiles?: number;
  maxSizeMb?: number;
  initialPhotos?: PhotoUploadItem[];
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  onPhotosChange,
  maxFiles = 5,
  maxSizeMb = 5,
  initialPhotos = []
}) => {
  const [photos, setPhotos] = useState<PhotoUploadItem[]>(initialPhotos);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setErrorMessage(null);

    if (photos.length + files.length > maxFiles) {
      setErrorMessage(`You can upload a maximum of ${maxFiles} images.`);
      return;
    }

    setIsProcessing(true);
    const newItems: PhotoUploadItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate MIME type
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        setErrorMessage(`"${file.name}" has an unsupported format. Only JPG, PNG, and WEBP are allowed.`);
        continue;
      }

      // Validate size
      if (file.size > maxSizeMb * 1024 * 1024) {
        setErrorMessage(`"${file.name}" exceeds the ${maxSizeMb} MB limit.`);
        continue;
      }

      try {
        // Compress client-side
        const { base64, mimeType } = await compressImage(file, 1600, 0.85);
        const item: PhotoUploadItem = {
          id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          name: file.name,
          size: file.size,
          mimeType: mimeType,
          previewUrl: base64,
          base64: base64,
          file: file
        };
        newItems.push(item);
      } catch (err) {
        console.error("Failed to process image:", err);
        setErrorMessage(`Could not process "${file.name}".`);
      }
    }

    const updated = [...photos, ...newItems].slice(0, maxFiles);
    setPhotos(updated);
    onPhotosChange(updated);
    setIsProcessing(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (id: string) => {
    const updated = photos.filter(p => p.id !== id);
    setPhotos(updated);
    onPhotosChange(updated);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="space-y-4">
      
      {/* Drag & Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-[#dfb15b] bg-[#350910]/60 scale-[1.01]'
            : 'border-[#dfb15b]/30 bg-[#160205] hover:border-[#dfb15b]/70 hover:bg-[#20040a]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#350910] border border-[#dfb15b]/30 flex items-center justify-center text-[#dfb15b] mb-1">
            {isProcessing ? (
              <Loader2 className="w-6 h-6 animate-spin text-[#dfb15b]" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>
          
          <p className="text-sm font-semibold text-[#fcf9f2]">
            Drag & drop your alumni event photos here, or <span className="text-[#dfb15b] underline underline-offset-2">browse files</span>
          </p>

          <p className="text-xs text-[#e7dece]/60">
            JPG, PNG, or WEBP up to {maxSizeMb} MB each · Maximum {maxFiles} images
          </p>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Previews List */}
      {photos.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[#dfb15b] font-medium">
            <span>Selected Photos ({photos.length}/{maxFiles})</span>
            <button
              type="button"
              onClick={() => {
                setPhotos([]);
                onPhotosChange([]);
              }}
              className="text-white/60 hover:text-white underline text-[11px]"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {photos.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#20040a] border border-[#dfb15b]/20 relative group"
              >
                <img
                  src={item.previewUrl}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover border border-white/10 shrink-0"
                />

                <div className="flex-1 min-w-0 pr-6">
                  <p className="text-xs font-medium text-[#fcf9f2] truncate">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-[#e7dece]/60 mt-0.5">
                    {formatFileSize(item.size)}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-[#dfb15b] mt-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Ready for upload</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item.id);
                  }}
                  className="absolute right-2 top-2 p-1.5 rounded-lg bg-black/40 hover:bg-red-900/60 text-white/70 hover:text-white transition-colors"
                  aria-label="Remove photo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
