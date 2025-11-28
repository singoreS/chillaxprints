import { useState, useEffect } from "react";
import { X, Copy, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const STORAGE_KEY = "promo-banner-dismissed";
const PROMO_CODE = "CHILL10";
const PROMO_MESSAGE = "Première commande ? Profite de 10% de réduction avec le code";
const PROMO_END_DATE = new Date("2025-12-31T23:59:59"); // Date de fin de la promo

export const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    // Check if user has already dismissed the banner
    const dismissed = localStorage.getItem(STORAGE_KEY);
    const dismissedDate = dismissed ? new Date(dismissed) : null;
    
    // Show banner if not dismissed or if dismissal has expired (after 24 hours)
    const shouldShow = !dismissedDate || new Date().getTime() - dismissedDate.getTime() > 24 * 60 * 60 * 1000;
    
    if (shouldShow) {
      setIsVisible(true);
    }

    // Update countdown every minute
    const updateCountdown = () => {
      const now = new Date();
      const diff = PROMO_END_DATE.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft({ days, hours, minutes });
      } else {
        setIsVisible(false);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(PROMO_CODE);
    toast.success("Code copié !", {
      description: "Colle-le à la validation de ton panier 🎉",
    });
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground overflow-hidden animate-fade-in">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-background rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-background rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container relative z-10 py-3">
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm md:text-base">
          {/* Icon */}
          <Tag className="w-5 h-5 animate-pulse" />

          {/* Message */}
          <span className="font-medium">
            {PROMO_MESSAGE}
          </span>

          {/* Code with copy button */}
          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-background/20 hover:bg-background/30 rounded-lg font-bold transition-all hover:scale-105 border border-background/30"
          >
            <span className="text-lg">{PROMO_CODE}</span>
            <Copy className="w-4 h-4" />
          </button>

          {/* Countdown */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-background/20 rounded-lg border border-background/30">
            <Clock className="w-4 h-4" />
            <span className="font-semibold tabular-nums">
              {timeLeft.days > 0 && `${timeLeft.days}j `}
              {timeLeft.hours}h {timeLeft.minutes}min
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="ml-auto p-1.5 hover:bg-background/20 rounded-full transition-all hover:scale-110"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
