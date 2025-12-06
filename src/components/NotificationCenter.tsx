import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, X, Check, CheckCheck, Trash2, Tag, Package, ShoppingBag, Info, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useNotificationStore, type Notification as AppNotification } from "@/stores/notificationStore";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

const typeIcons = {
  promo: Tag,
  product: Package,
  order: ShoppingBag,
  info: Info,
};

const typeColors = {
  promo: "text-primary bg-primary/10",
  product: "text-accent bg-accent/10",
  order: "text-green-500 bg-green-500/10",
  info: "text-blue-500 bg-blue-500/10",
};

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const {
    notifications,
    pushEnabled,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    setPushEnabled,
    addNotification,
  } = useNotificationStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Request push notification permission
  const requestPushPermission = async () => {
    if (!("Notification" in window)) {
      toast.error("Les notifications ne sont pas supportées par votre navigateur");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setPushEnabled(true);
        toast.success("Notifications push activées !");
        
        // Show a test notification
        new Notification("ChillaxPrints 🎉", {
          body: "Tu recevras maintenant nos meilleures offres !",
          icon: "/favicon.ico",
        });
      } else {
        setPushEnabled(false);
        toast.error("Permission refusée pour les notifications");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      toast.error("Erreur lors de l'activation des notifications");
    }
  };

  const handleTogglePush = async (enabled: boolean) => {
    if (enabled) {
      await requestPushPermission();
    } else {
      setPushEnabled(false);
      toast.success("Notifications push désactivées");
    }
  };

  // Add demo notifications on first visit
  useEffect(() => {
    if (notifications.length === 0) {
      const demoNotifications = [
        {
          title: "🎉 Bienvenue chez ChillaxPrints !",
          message: "Profite de -10% sur ta première commande avec le code CHILL10",
          type: "promo" as const,
          link: "/boutique",
        },
        {
          title: "🆕 Nouvelle collection",
          message: "Découvre nos nouveaux hoodies d'hiver, parfaits pour rester au chaud et stylé",
          type: "product" as const,
          link: "/boutique?category=hoodies",
        },
        {
          title: "🚚 Livraison gratuite",
          message: "Livraison offerte dès 50€ d'achat, partout en France !",
          type: "info" as const,
        },
      ];

      demoNotifications.forEach((notif, index) => {
        setTimeout(() => addNotification(notif), index * 100);
      });
    }
  }, []);

  const NotificationItem = ({ notification }: { notification: AppNotification }) => {
    const Icon = typeIcons[notification.type];
    const colorClass = typeColors[notification.type];

    const content = (
      <div
        className={`p-3 rounded-lg transition-all hover:bg-muted/50 ${
          !notification.read ? "bg-primary/5 border-l-2 border-primary" : ""
        }`}
      >
        <div className="flex gap-3">
          <div className={`p-2 rounded-full flex-shrink-0 ${colorClass}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h4 className={`text-sm font-medium ${!notification.read ? "font-semibold" : ""}`}>
                {notification.title}
              </h4>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeNotification(notification.id);
                }}
                className="p-1 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {notification.message}
            </p>
            <span className="text-[10px] text-muted-foreground mt-1 block">
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
                locale: fr,
              })}
            </span>
          </div>
        </div>
      </div>
    );

    if (notification.link) {
      return (
        <Link
          to={notification.link}
          onClick={() => {
            markAsRead(notification.id);
            setIsOpen(false);
          }}
        >
          {content}
        </Link>
      );
    }

    return (
      <div onClick={() => markAsRead(notification.id)} className="cursor-pointer">
        {content}
      </div>
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        {/* Header */}
        <div className="p-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount} nouvelles
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            {notifications.length > 0 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={markAllAsRead}
                  title="Tout marquer comme lu"
                >
                  <CheckCheck className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setShowSettings(!showSettings)}
                  title="Paramètres"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="p-3 bg-muted/30 border-b">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Notifications push</p>
                <p className="text-xs text-muted-foreground">
                  Recevoir les alertes même hors du site
                </p>
              </div>
              <Switch
                checked={pushEnabled}
                onCheckedChange={handleTogglePush}
              />
            </div>
          </div>
        )}

        {/* Notifications List */}
        <ScrollArea className="max-h-80">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Aucune notification</p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs text-muted-foreground hover:text-destructive"
              onClick={clearAll}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Effacer tout
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
