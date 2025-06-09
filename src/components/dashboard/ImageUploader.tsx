
import React, { useRef } from 'react';
import { FileUp, Trash2, Image as ImageIcon, Upload, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useImageUpload } from '@/hooks/useImageUpload';

interface ImageUploaderProps {
  onImagesChange: (images: File[]) => void;
  onUrlsChange?: (urls: string[]) => void;
  userId?: string;
  maxImages?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImagesChange, 
  onUrlsChange,
  userId,
  maxImages = 6 
}) => {
  const { images, isUploading, addImages, uploadImages, removeImage } = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    addImages(files);
    onImagesChange(Array.from(files));
  };

  const handleUpload = async () => {
    if (!userId) return;
    const urls = await uploadImages(userId);
    onUrlsChange?.(urls);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = (index: number) => {
    removeImage(index);
    onImagesChange(images.filter((_, i) => i !== index).map(img => img.file));
  };

  return (
    <div className="space-y-4">
      <div 
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          isDragging ? 'border-mytroc-primary bg-mytroc-primary/5' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FileUp className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm font-medium">Glissez et déposez des images</p>
        <p className="text-xs text-muted-foreground mb-4">
          PNG, JPG ou WEBP jusqu'à 5 MB (redimensionnement automatique)
        </p>
        <div className="flex gap-2 justify-center">
          <Button variant="outline" size="sm" onClick={handleBrowseClick}>
            Parcourir les fichiers
          </Button>
          {images.length > 0 && userId && (
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleUpload}
              disabled={isUploading}
              className="gap-2"
            >
              {isUploading ? (
                <>
                  <Upload className="h-4 w-4 animate-pulse" />
                  Upload...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Uploader
                </>
              )}
            </Button>
          )}
        </div>
        <input 
          type="file" 
          multiple 
          accept=".jpg,.jpeg,.png,.webp" 
          className="hidden" 
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e.target.files)}
        />
      </div>
      
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative rounded-md overflow-hidden bg-gray-100 aspect-square flex items-center justify-center">
              <img 
                src={image.preview} 
                alt={`Preview ${index + 1}`} 
                className="h-full w-full object-cover"
              />
              
              {/* Status indicator */}
              {image.uploaded && (
                <div className="absolute top-1 left-1 bg-green-500 text-white rounded-full p-1">
                  <Check className="h-3 w-3" />
                </div>
              )}
              
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute top-1 right-1 h-6 w-6 rounded-full"
                onClick={() => handleDeleteImage(index)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
          
          {images.length < maxImages && (
            <div 
              className="border-2 border-dashed rounded-md flex items-center justify-center aspect-square cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={handleBrowseClick}
            >
              <Button variant="ghost" size="icon">
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
