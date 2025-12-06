// NotificationProvider - No auto notifications on mount
// Notifications are triggered manually via useAutoNotifications hook
export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
