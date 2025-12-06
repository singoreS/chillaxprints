import { useCallback } from "react";
import { useNotificationStore } from "@/stores/notificationStore";

interface NotificationEvent {
  type: 'promo' | 'product' | 'order' | 'info';
  title: string;
  message: string;
  link?: string;
  image?: string;
}

// Storage keys for tracking shown notifications
const SHOWN_NOTIFICATIONS_KEY = "chillax-shown-notifications";

// Check if notification was already shown (by unique ID)
const wasNotificationShown = (notificationId: string): boolean => {
  try {
    const shown = localStorage.getItem(SHOWN_NOTIFICATIONS_KEY);
    const shownList: string[] = shown ? JSON.parse(shown) : [];
    return shownList.includes(notificationId);
  } catch {
    return false;
  }
};

// Mark notification as shown
const markNotificationAsShown = (notificationId: string): void => {
  try {
    const shown = localStorage.getItem(SHOWN_NOTIFICATIONS_KEY);
    const shownList: string[] = shown ? JSON.parse(shown) : [];
    if (!shownList.includes(notificationId)) {
      shownList.push(notificationId);
      // Keep only last 50 shown notifications
      const trimmedList = shownList.slice(-50);
      localStorage.setItem(SHOWN_NOTIFICATIONS_KEY, JSON.stringify(trimmedList));
    }
  } catch {
    // Ignore storage errors
  }
};

export const useAutoNotifications = () => {
  const { addNotification, pushEnabled } = useNotificationStore();

  // Show browser push notification if enabled
  const showPushNotification = useCallback((event: NotificationEvent) => {
    if (pushEnabled && "Notification" in window && Notification.permission === "granted") {
      new Notification(`ChillaxPrints - ${event.title}`, {
        body: event.message,
        icon: "/favicon.ico",
        tag: event.title,
      });
    }
  }, [pushEnabled]);

  // Trigger a promo code notification - call this when a new promo is added
  const triggerPromoNotification = useCallback((promoCode: string, discount: string, description?: string) => {
    const notificationId = `promo-${promoCode}`;
    
    if (!wasNotificationShown(notificationId)) {
      const event: NotificationEvent = {
        type: "promo",
        title: `🎁 Code Promo: ${promoCode}`,
        message: description || `Profite de ${discount} de réduction avec le code ${promoCode} !`,
        link: "/boutique",
      };
      
      addNotification(event);
      markNotificationAsShown(notificationId);
      showPushNotification(event);
    }
  }, [addNotification, showPushNotification]);

  // Trigger a new product notification
  const triggerNewProductNotification = useCallback((productName: string, productLink?: string) => {
    const notificationId = `product-${productName}-${Date.now()}`;
    
    const event: NotificationEvent = {
      type: "product",
      title: "🆕 Nouveau Produit",
      message: `Découvre notre nouveau produit : ${productName} !`,
      link: productLink || "/boutique",
    };
    
    addNotification(event);
    markNotificationAsShown(notificationId);
    showPushNotification(event);
  }, [addNotification, showPushNotification]);

  // Trigger cart abandonment reminder
  const triggerCartReminder = useCallback(() => {
    const notificationId = `cart-reminder-${new Date().toDateString()}`;
    
    if (!wasNotificationShown(notificationId)) {
      const event: NotificationEvent = {
        type: "info",
        title: "🛒 Tu as oublié quelque chose ?",
        message: "Des articles t'attendent dans ton panier. Finalise ta commande !",
        link: "/panier",
      };
      addNotification(event);
      markNotificationAsShown(notificationId);
      showPushNotification(event);
    }
  }, [addNotification, showPushNotification]);

  // Trigger order notification
  const triggerOrderNotification = useCallback((orderNumber: string, status: string) => {
    const statusMessages: Record<string, string> = {
      confirmed: "Ta commande a été confirmée et est en cours de préparation !",
      shipped: "Ta commande est en route ! Tu peux suivre son avancement.",
      delivered: "Ta commande a été livrée. Profite bien de tes nouveaux articles !",
    };

    const event: NotificationEvent = {
      type: "order",
      title: `📦 Commande ${orderNumber}`,
      message: statusMessages[status] || `Mise à jour de ta commande : ${status}`,
      link: "/suivi-commande",
    };
    addNotification(event);
    showPushNotification(event);
  }, [addNotification, showPushNotification]);

  // Trigger a custom notification
  const triggerCustomNotification = useCallback((notification: NotificationEvent, uniqueId?: string) => {
    const notificationId = uniqueId || `custom-${notification.title}-${Date.now()}`;
    
    if (!wasNotificationShown(notificationId)) {
      addNotification(notification);
      markNotificationAsShown(notificationId);
      showPushNotification(notification);
    }
  }, [addNotification, showPushNotification]);

  return {
    triggerPromoNotification,
    triggerNewProductNotification,
    triggerCartReminder,
    triggerOrderNotification,
    triggerCustomNotification,
  };
};
