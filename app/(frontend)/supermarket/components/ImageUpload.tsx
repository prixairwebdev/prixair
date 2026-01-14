"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (imageData: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Product Image' }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(value);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');
  const [urlInput, setUrlInput] = useState<string>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = () => {
    if (urlInput.trim()) {
      setPreviewUrl(urlInput);
      onChange(urlInput);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl('');
    onChange('');
    setUrlInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-black font-medium mb-2">{label}</label>

      {/* Upload Method Toggle */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setUploadMethod('file')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            uploadMethod === 'file'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setUploadMethod('url')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            uploadMethod === 'url'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          Use URL
        </button>
      </div>

      {/* File Upload */}
      {uploadMethod === 'file' && (
        <div className="mb-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
          />
          <p className="text-xs text-gray-500 mt-1">Max file size: 5MB. Supported: JPG, PNG, GIF, WebP</p>
        </div>
      )}

      {/* URL Input */}
      {uploadMethod === 'url' && (
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-black"
          />
          <button
            type="button"
            onClick={handleUrlChange}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Set URL
          </button>
        </div>
      )}

      {/* Image Preview */}
      {previewUrl && (
        <div className="relative w-full max-w-xs h-48">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-cover rounded-lg border-2 border-gray-200"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
