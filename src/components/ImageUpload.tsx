import React, { useRef, useState } from 'react';
import { Image, X, Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage?: File;
  onRemoveImage: () => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageSelect, 
  selectedImage, 
  onRemoveImage 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
        className="hidden"
      />

      {selectedImage ? (
        <div className="relative group">
          <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-blue-500/30 dark:border-purple-500/30">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Image sélectionnée"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={onRemoveImage}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white
                       flex items-center justify-center hover:bg-red-600 transition-colors duration-200
                       opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`
            w-12 h-12 rounded-lg border-2 border-dashed cursor-pointer
            flex items-center justify-center transition-all duration-300
            hover:scale-110 active:scale-95
            ${isDragOver 
              ? 'border-blue-500 bg-blue-500/10 dark:border-purple-500 dark:bg-purple-500/10' 
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-purple-400'
            }
          `}
        >
          {isDragOver ? (
            <Upload className="w-5 h-5 text-blue-500 dark:text-purple-500" />
          ) : (
            <Image className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          )}
        </div>
      )}
    </div>
  );
};