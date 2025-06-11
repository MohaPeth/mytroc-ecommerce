
import { supabase } from '@/integrations/supabase/client';

export interface UploadResult {
  url?: string;
  error?: string;
}

export class StorageService {
  private static readonly BUCKET_NAME = 'product-images';

  static async uploadProductImage(
    file: File,
    userId: string,
    productId?: string
  ): Promise<UploadResult> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${productId || Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        return { error: error.message };
      }

      const { data: { publicUrl } } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(data.path);

      return { url: publicUrl };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  static async deleteProductImage(filePath: string): Promise<{ error?: string }> {
    try {
      const { error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .remove([filePath]);

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error: any) {
      return { error: error.message };
    }
  }

  static async uploadMultipleImages(
    files: File[],
    userId: string,
    productId?: string
  ): Promise<{ urls: string[]; errors: string[] }> {
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
}
