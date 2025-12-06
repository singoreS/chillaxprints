import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'promo' | 'product' | 'order' | 'info';
  read: boolean;
  createdAt: string;
  link?: string;
  image?: string;
}

interface NotificationStore {
  notifications: Notification[];
  pushEnabled: boolean;
  pushSubscription: PushSubscription | null;
  
  // Actions
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  setPushEnabled: (enabled: boolean) => void;
  setPushSubscription: (subscription: PushSubscription | null) => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      pushEnabled: false,
      pushSubscription: null,

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: crypto.randomUUID(),
          read: false,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 50), // Keep max 50
        }));
      },

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      clearAll: () => {
        set({ notifications: [] });
      },

      setPushEnabled: (enabled) => {
        set({ pushEnabled: enabled });
      },

      setPushSubscription: (subscription) => {
        set({ pushSubscription: subscription });
      },

      unreadCount: () => {
        return get().notifications.filter((n) => !n.read).length;
      },
    }),
    {
      name: 'chillax-notifications',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        notifications: state.notifications,
        pushEnabled: state.pushEnabled,
      }),
    }
  )
);
