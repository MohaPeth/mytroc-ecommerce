
import { supabase } from '@/integrations/supabase/client';
import { AnalyticsService } from './analytics.service';

export interface AuthError {
  message: string;
  code?: string;
}

export interface SignUpData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export class AuthService {
  static async signUp({ email, password, firstName, lastName }: SignUpData) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (error) {
        return { error: { message: error.message, code: error.message } };
      }

      // Track sign up event
      if (data.user) {
        AnalyticsService.trackEvent({
          event_type: 'user_signup',
          user_id: data.user.id,
          properties: { email }
        });
      }

      return { data };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  }

  static async signIn({ email, password }: SignInData) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: { message: error.message, code: error.message } };
      }

      // Track sign in event
      if (data.user) {
        AnalyticsService.trackEvent({
          event_type: 'user_signin',
          user_id: data.user.id,
          properties: { email }
        });
      }

      return { data };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  }

  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { error: { message: error.message } };
      }
      return {};
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  }

  static async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        return { error: { message: error.message } };
      }

      return {};
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  }

  static async updatePassword(newPassword: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        return { error: { message: error.message } };
      }

      return {};
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  }

  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        return { error: { message: error.message } };
      }

      return { user };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  }

  static async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        return { error: { message: error.message } };
      }

      return { session };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  }
}
