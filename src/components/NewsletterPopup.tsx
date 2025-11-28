import { useState, useEffect } from "react";
import { X, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Adresse email invalide" })
    .max(255, { message: "L'email est trop long" }),
});

const STORAGE_KEY = "newsletter-popup-dismissed";
const POPUP_DELAY = 5000; // 5 seconds

export const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the popup
    const dismissed = localStorage.getItem(STORAGE_KEY);
    
    if (!dismissed) {
      // Show popup after delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, POPUP_DELAY);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Remember that user dismissed the popup (expires after 7 days)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    localStorage.setItem(STORAGE_KEY, expiryDate.toISOString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const validation = emailSchema.safeParse({ email });
    
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("newsletter_subscriptions")
        .insert([
          {
            email: validation.data.email,
            source: "popup",
          },
        ]);

      if (error) {
        // Check if email already exists
        if (error.code === "23505") {
          toast.error("Cet email est déjà inscrit à la newsletter");
        } else {
          throw error;
        }
      } else {
        toast.success("Merci ! Tu es maintenant inscrit à notre newsletter 🎉", {
          description: "Tu vas recevoir nos meilleures offres et nouveautés",
        });
        setEmail("");
        handleClose();
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("Une erreur est survenue. Réessaye plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-2">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-2 bg-background/80 backdrop-blur-sm hover:bg-background transition-all hover:scale-110 z-10"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5" />
          <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

          {/* Content */}
          <div className="relative p-10 space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center animate-scale-in">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
            </div>

            {/* Text */}
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold">
                Rejoins la <span className="text-primary">Team Chill</span> ! 🚀
              </h2>
              <p className="text-muted-foreground text-lg">
                Reçois nos meilleures offres, nouveautés et codes promos exclusifs. 
                Promis, on spam pas ! 😎
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="ton-email@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 text-base border-2"
                  required
                  disabled={isLoading}
                  maxLength={255}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Inscription..." : "Rejoindre la Newsletter"}
              </Button>
            </form>

            {/* Benefits */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>10% de réduction sur ta première commande</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Accès en avant-première aux nouveautés</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Codes promos exclusifs</span>
              </div>
            </div>

            {/* Footer */}
            <p className="text-xs text-center text-muted-foreground pt-2">
              Tu peux te désinscrire à tout moment. On respecte ta vie privée. 🔒
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
