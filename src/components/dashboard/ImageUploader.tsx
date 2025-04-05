
import React, { useState, useRef } from 'react';
import { FileUp, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImagesChange: (images: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesChange }) => {
  const [previewImages, setPreviewImages] = useState<{ file: File; preview: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newFiles: File[] = Array.from(files);
    const validFiles = newFiles.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      
      if (!isValidType) {
        toast({
          title: "Format non pris en charge",
          description: "Veuillez utiliser des fichiers JPG, PNG ou WEBP.",
          variant: "destructive"
        });
      }
      
      if (!isValidSize) {
        toast({
          title: "Fichier trop volumineux",
          description: "La taille maximale autorisée est de 5 MB.",
          variant: "destructive"
        });
      }
      
      return isValidType && isValidSize;
    });
    
    if (validFiles.length === 0) return;
    
    // Create preview URLs for the new valid files
    const newImagePreviews = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    const updatedPreviews = [...previewImages, ...newImagePreviews];
    setPreviewImages(updatedPreviews);
    
    // Pass all files to parent component
    onImagesChange(updatedPreviews.map(img => img.file));
    
    // Show success toast
    toast({
      title: "Images ajoutées",
      description: `${validFiles.length} image(s) ajoutée(s) avec succès.`
    });
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
    // Create a copy of the preview images array
    const updatedPreviews = [...previewImages];
    
    // Release the object URL to free memory
    URL.revokeObjectURL(updatedPreviews[index].preview);
    
    // Remove the image at the specified index
    updatedPreviews.splice(index, 1);
    
    // Update state
    setPreviewImages(updatedPreviews);
    
    // Pass the updated files to parent component
    onImagesChange(updatedPreviews.map(img => img.file));
    
    toast({
      title: "Image supprimée",
      description: "L'image a été supprimée avec succès."
    });
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
        <p className="text-xs text-muted-foreground mb-4">PNG, JPG ou WEBP jusqu'à 5 MB</p>
        <Button variant="outline" size="sm" onClick={handleBrowseClick}>
          Parcourir les fichiers
        </Button>
        <input 
          type="file" 
          multiple 
          accept=".jpg,.jpeg,.png,.webp" 
          className="hidden" 
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e.target.files)}
        />
      </div>
      
      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {previewImages.map((image, index) => (
            <div key={index} className="relative rounded-md overflow-hidden bg-gray-100 aspect-square flex items-center justify-center">
              <img 
                src={image.preview} 
                alt={`Preview ${index + 1}`} 
                className="h-full w-full object-cover"
              />
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
          
          {previewImages.length < 6 && (
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
