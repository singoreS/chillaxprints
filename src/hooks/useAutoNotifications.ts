import { useEffect, useCallback } from "react";
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
const LAST_VISIT_KEY = "chillax-last-visit";

// Predefined promotional events
const PROMO_EVENTS: NotificationEvent[] = [
  {
    type: "promo",
    title: "🔥 Vente Flash !",
    message: "Jusqu'à -20% sur une sélection de hoodies. Offre limitée !",
    link: "/boutique?category=hoodies",
  },
  {
    type: "promo",
    title: "🎁 Livraison Offerte",
    message: "Profite de la livraison gratuite dès 50€ d'achat aujourd'hui !",
    link: "/boutique",
  },
  {
    type: "promo",
    title: "⚡ Dernières heures",
    message: "Plus que quelques heures pour profiter du code CHILL10 !",
    link: "/boutique",
  },
];

// New product events
const NEW_PRODUCT_EVENTS: NotificationEvent[] = [
  {
    type: "product",
    title: "🆕 Nouveau T-Shirt",
    message: "Découvre notre nouveau t-shirt 'Sarcasm is my cardio' !",
    link: "/boutique?category=tshirts",
  },
  {
    type: "product",
    title: "❄️ Collection Hiver",
    message: "Les nouveaux bonnets sont arrivés, parfaits pour rester au chaud !",
    link: "/boutique?category=bonnets",
  },
  {
    type: "product",
    title: "👟 Nouvelles Chaussures",
    message: "Les Lazy Steps sont de retour en stock ! Ne les rate pas.",
    link: "/boutique?category=shoes",
  },
];

// Seasonal/time-based events
const getSeasonalEvent = (): NotificationEvent | null => {
  const now = new Date();
  const month = now.getMonth();
  const hour = now.getHours();

  // Winter (Dec-Feb)
  if (month === 11 || month === 0 || month === 1) {
    return {
      type: "promo",
      title: "🎄 Offre Hivernale",
      message: "Reste au chaud avec nos hoodies douillets. -15% avec WINTER15 !",
      link: "/boutique?category=hoodies",
    };
  }

  // Summer (Jun-Aug)
  if (month >= 5 && month <= 7) {
    return {
      type: "promo",
      title: "☀️ Soldes d'été",
      message: "T-shirts légers et confortables pour l'été. Découvre la collection !",
      link: "/boutique?category=tshirts",
    };
  }

  // Evening promo (18h-22h)
  if (hour >= 18 && hour <= 22) {
    return {
      type: "promo",
      title: "🌙 Offre du Soir",
      message: "Détends-toi avec nos vêtements confort. Offre spéciale ce soir !",
      link: "/boutique",
    };
  }

  return null;
};

// Get a random event from an array
const getRandomEvent = (events: NotificationEvent[]): NotificationEvent => {
  return events[Math.floor(Math.random() * events.length)];
};

// Check if notification was already shown
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

// Check if this is a returning visitor
const isReturningVisitor = (): boolean => {
  try {
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());
    
    if (!lastVisit) return false;
    
    const lastVisitDate = new Date(lastVisit);
    const hoursSinceLastVisit = (Date.now() - lastVisitDate.getTime()) / (1000 * 60 * 60);
    
    // Consider returning if more than 1 hour since last visit
    return hoursSinceLastVisit > 1;
  } catch {
    return false;
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
        tag: event.title, // Prevents duplicate notifications
      });
    }
  }, [pushEnabled]);

  // Trigger a notification for an event
  const triggerNotification = useCallback((event: NotificationEvent, showPush = false) => {
    const notificationId = `${event.type}-${event.title}`;
    
    if (!wasNotificationShown(notificationId)) {
      addNotification(event);
      markNotificationAsShown(notificationId);
      
      if (showPush) {
        showPushNotification(event);
      }
    }
  }, [addNotification, showPushNotification]);

  // Trigger a random promo notification
  const triggerRandomPromo = useCallback(() => {
    const event = getRandomEvent(PROMO_EVENTS);
    triggerNotification(event, true);
  }, [triggerNotification]);

  // Trigger a random new product notification
  const triggerNewProduct = useCallback(() => {
    const event = getRandomEvent(NEW_PRODUCT_EVENTS);
    triggerNotification(event, true);
  }, [triggerNotification]);

  // Trigger seasonal notification
  const triggerSeasonalNotification = useCallback(() => {
    const event = getSeasonalEvent();
    if (event) {
      triggerNotification(event, false);
    }
  }, [triggerNotification]);

  // Trigger welcome back notification
  const triggerWelcomeBack = useCallback(() => {
    const event: NotificationEvent = {
      type: "info",
      title: "👋 Content de te revoir !",
      message: "Tu nous as manqué ! Découvre les nouveautés depuis ta dernière visite.",
      link: "/boutique",
    };
    triggerNotification(event, true);
  }, [triggerNotification]);

  // Trigger cart abandonment reminder (call after user has items in cart)
  const triggerCartReminder = useCallback(() => {
    const event: NotificationEvent = {
      type: "info",
      title: "🛒 Tu as oublié quelque chose ?",
      message: "Des articles t'attendent dans ton panier. Finalise ta commande !",
      link: "/panier",
    };
    addNotification(event);
    showPushNotification(event);
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

  // Auto-trigger notifications on mount
  useEffect(() => {
    // Check if returning visitor
    if (isReturningVisitor()) {
      // Show welcome back after a short delay
      const welcomeTimer = setTimeout(() => {
        triggerWelcomeBack();
      }, 2000);

      // Show a random promo after some time
      const promoTimer = setTimeout(() => {
        triggerRandomPromo();
      }, 30000); // 30 seconds after page load

      return () => {
        clearTimeout(welcomeTimer);
        clearTimeout(promoTimer);
      };
    } else {
      // First visit - show seasonal notification after delay
      const seasonalTimer = setTimeout(() => {
        triggerSeasonalNotification();
      }, 60000); // 1 minute after page load

      return () => clearTimeout(seasonalTimer);
    }
  }, [triggerWelcomeBack, triggerRandomPromo, triggerSeasonalNotification]);

  // Periodic new product notifications (every 5 minutes while on site)
  useEffect(() => {
    const productTimer = setInterval(() => {
      // 20% chance to show a new product notification
      if (Math.random() < 0.2) {
        triggerNewProduct();
      }
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(productTimer);
  }, [triggerNewProduct]);

  return {
    triggerNotification,
    triggerRandomPromo,
    triggerNewProduct,
    triggerSeasonalNotification,
    triggerWelcomeBack,
    triggerCartReminder,
    triggerOrderNotification,
  };
};
