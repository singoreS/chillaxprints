import { useAutoNotifications } from "@/hooks/useAutoNotifications";

// Component that initializes auto notifications
export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize auto notifications hook
  useAutoNotifications();
  
  return <>{children}</>;
};
