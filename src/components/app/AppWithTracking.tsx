
import { usePageTracking } from "@/hooks/usePageTracking";
import { AppRoutes } from "@/config/routes";
import NotificationToast from "@/components/notifications/NotificationToast";
import { Toaster } from "@/components/ui/toaster";

export const AppWithTracking = () => {
  usePageTracking(); // Track automatiquement les changements de page
  
  return (
    <>
      <AppRoutes />
      <NotificationToast />
      <Toaster />
    </>
  );
};
