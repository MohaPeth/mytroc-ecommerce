
import { supabase } from '@/integrations/supabase/client';

export interface UploadResult {
  url?: string;
  error?: string;
}

export interface MultipleUploadResult {
  urls: string[];
  errors: string[];
}

export class StorageService {
  
  static async uploadProductImage(file: File, userId: string, productId?: string): Promise<UploadResult> {
    try {
      // Resize image if needed
      const resizedFile = await this.resizeImage(file);
      
      const fileExt = resizedFile.name.split('.').pop();
      const fileName = productId 
        ? `${userId}/${productId}/${Date.now()}.${fileExt}`
        : `${userId}/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, resizedFile);

      if (error) {
        console.error('Upload error:', error);
        return { error: error.message };
      }

      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(data.path);

      return { url: urlData.publicUrl };
    } catch (error: any) {
      console.error('Storage service error:', error);
      return { error: error.message };
    }
  }

  static async uploadMultipleImages(files: File[], userId: string, productId?: string): Promise<MultipleUploadResult> {
    const urls: string[] = [];
    const errors: string[] = [];

    for (const file of files) {
      const result = await this.uploadProductImage(file, userId, productId);
      if (result.url) {
        urls.push(result.url);
      } else if (result.error) {
        errors.push(result.error);
      }
    }

    return { urls, errors };
  }

  static async deleteProductImage(filePath: string): Promise<{ error?: string }> {
    try {
      const { error } = await supabase.storage
        .from('product-images')
        .remove([filePath]);

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error: any) {
      return { error: error.message };
    }
  }

  private static async resizeImage(file: File, maxWidth: number = 800, quality: number = 0.8): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const { width, height } = img;
        const ratio = Math.min(maxWidth / width, maxWidth / height);
        
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          } else {
            resolve(file);
          }
        }, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }
}
