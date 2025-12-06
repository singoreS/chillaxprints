import { useState, useEffect } from "react";
import { X, Copy, Clock, Tag, Sparkles, Truck, Gift } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "promo-banner-dismissed";
const PROMO_CODE = "CHILL10";
const PROMO_END_DATE = new Date("2025-12-31T23:59:59");

const promoMessages = [
  { icon: Tag, text: "🎉 -10% sur ta 1ère commande avec le code" },
  { icon: Truck, text: "🚚 Livraison OFFERTE dès 50€ d'achat" },
  { icon: Gift, text: "🎁 Un cadeau surprise dans chaque commande" },
];

export const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    const dismissedDate = dismissed ? new Date(dismissed) : null;
    const shouldShow = !dismissedDate || new Date().getTime() - dismissedDate.getTime() > 24 * 60 * 60 * 1000;
    
    if (shouldShow) {
      setIsVisible(true);
    }

    const updateCountdown = () => {
      const now = new Date();
      const diff = PROMO_END_DATE.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setIsVisible(false);
      }
    };

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  // Rotate messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % promoMessages.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(messageInterval);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(PROMO_CODE);
    toast.success("Code copié !", {
      description: "Colle-le à la validation de ton panier 🎉",
      position: "top-center",
    });
  };

  if (!isVisible) return null;

  const CurrentIcon = promoMessages[currentMessageIndex].icon;

  return (
    <div className="relative bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground overflow-hidden">
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"
          style={{
            animation: "shimmer 3s infinite",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute w-3 h-3 text-white/30 animate-pulse"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 py-2.5">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Rotating message */}
          <div className="flex-1 flex items-center justify-center gap-3 min-w-0">
            <div 
              className={`flex items-center gap-2 transition-all duration-300 ${
                isAnimating ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              <CurrentIcon className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium text-sm md:text-base whitespace-nowrap">
                {promoMessages[currentMessageIndex].text}
              </span>
            </div>

            {/* Code button - only show for first message */}
            {currentMessageIndex === 0 && (
              <button
                onClick={handleCopyCode}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-background/20 hover:bg-background/30 rounded-md font-bold text-sm transition-all hover:scale-105 border border-background/30 ${
                  isAnimating ? "opacity-0" : "opacity-100"
                }`}
              >
                <span>{PROMO_CODE}</span>
                <Copy className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right: Countdown + Close */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Countdown */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-background/20 rounded-md border border-background/30">
              <Clock className="w-3.5 h-3.5" />
              <div className="flex items-center gap-1 text-sm font-semibold tabular-nums">
                {timeLeft.days > 0 && (
                  <span className="flex flex-col items-center">
                    <span className="text-base">{timeLeft.days}</span>
                    <span className="text-[10px] opacity-70">j</span>
                  </span>
                )}
                <span className="flex flex-col items-center">
                  <span className="text-base">{String(timeLeft.hours).padStart(2, "0")}</span>
                  <span className="text-[10px] opacity-70">h</span>
                </span>
                <span className="text-base">:</span>
                <span className="flex flex-col items-center">
                  <span className="text-base">{String(timeLeft.minutes).padStart(2, "0")}</span>
                  <span className="text-[10px] opacity-70">m</span>
                </span>
                <span className="text-base">:</span>
                <span className="flex flex-col items-center">
                  <span className="text-base">{String(timeLeft.seconds).padStart(2, "0")}</span>
                  <span className="text-[10px] opacity-70">s</span>
                </span>
              </div>
            </div>

            {/* Message indicators */}
            <div className="hidden sm:flex gap-1">
              {promoMessages.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === currentMessageIndex ? "bg-white w-4" : "bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="p-1 hover:bg-background/20 rounded-full transition-all hover:rotate-90"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};
