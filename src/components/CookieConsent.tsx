import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Cookie, X, Settings, Shield } from "lucide-react";
import { Link } from "react-router-dom";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  socialMedia: {
    facebook: boolean;
    instagram: boolean;
    tiktok: boolean;
  };
  ecommercePartners: {
    printify: boolean;
    shopify: boolean;
    stripe: boolean;
  };
}

const COOKIE_CONSENT_KEY = "chillax-cookie-consent";
const COOKIE_PREFERENCES_KEY = "chillax-cookie-preferences";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    socialMedia: {
      facebook: false,
      instagram: false,
      tiktok: false,
    },
    ecommercePartners: {
      printify: false,
      shopify: false,
      stripe: false,
    },
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay to not show immediately on page load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      socialMedia: {
        facebook: true,
        instagram: true,
        tiktok: true,
      },
      ecommercePartners: {
        printify: true,
        shopify: true,
        stripe: true,
      },
    };
    saveConsent(allAccepted);
  };

  const handleRejectAll = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      socialMedia: {
        facebook: false,
        instagram: false,
        tiktok: false,
      },
      ecommercePartners: {
        printify: false,
        shopify: false,
        stripe: false,
      },
    };
    saveConsent(essentialOnly);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setIsVisible(false);
    
    // Here you would typically initialize analytics/marketing based on preferences
    if (prefs.analytics) {
      console.log("Analytics cookies enabled");
    }
    if (prefs.marketing) {
      console.log("Marketing cookies enabled");
    }
    if (prefs.socialMedia.facebook) {
      console.log("Facebook data sharing enabled");
    }
    if (prefs.socialMedia.instagram) {
      console.log("Instagram data sharing enabled");
    }
    if (prefs.socialMedia.tiktok) {
      console.log("TikTok data sharing enabled");
    }
    if (prefs.ecommercePartners.printify) {
      console.log("Printify data sharing enabled");
    }
    if (prefs.ecommercePartners.shopify) {
      console.log("Shopify data sharing enabled");
    }
    if (prefs.ecommercePartners.stripe) {
      console.log("Stripe data sharing enabled");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <Card className="max-w-4xl mx-auto shadow-2xl border-2">
        <CardContent className="p-4 md:p-6">
          {!showSettings ? (
            // Simple banner view
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="h-8 w-8 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    🍪 On utilise des cookies !
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Pour améliorer ton expérience sur ChillaxPrints, on utilise des cookies.
                    Tu peux tout accepter ou personnaliser tes préférences.{" "}
                    <Link 
                      to="/politique-confidentialite" 
                      className="text-primary hover:underline"
                    >
                      En savoir plus
                    </Link>
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  className="flex-1 md:flex-none"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Personnaliser
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleRejectAll}
                  className="flex-1 md:flex-none"
                >
                  Refuser
                </Button>
                <Button 
                  size="sm"
                  onClick={handleAcceptAll}
                  className="flex-1 md:flex-none"
                >
                  Tout accepter
                </Button>
              </div>
            </div>
          ) : (
            // Detailed settings view
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">
                    Paramètres des cookies
                  </h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowSettings(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {/* Essential Cookies */}
                <div className="flex items-start justify-between gap-4 p-3 bg-secondary/20 rounded-lg">
                  <div className="flex-1">
                    <Label className="font-medium text-foreground">
                      Cookies essentiels
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Nécessaires au fonctionnement du site (panier, connexion, sécurité). 
                      Ne peuvent pas être désactivés.
                    </p>
                  </div>
                  <Switch 
                    checked={true} 
                    disabled 
                  />
                </div>
                
                {/* Analytics Cookies */}
                <div className="flex items-start justify-between gap-4 p-3 bg-secondary/20 rounded-lg">
                  <div className="flex-1">
                    <Label className="font-medium text-foreground">
                      Cookies analytiques
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Nous aident à comprendre comment tu utilises le site pour l'améliorer.
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.analytics}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({ ...prev, analytics: checked }))
                    }
                  />
                </div>
                
                {/* Marketing Cookies */}
                <div className="flex items-start justify-between gap-4 p-3 bg-secondary/20 rounded-lg">
                  <div className="flex-1">
                    <Label className="font-medium text-foreground">
                      Cookies marketing
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Permettent d'afficher des publicités personnalisées sur d'autres sites.
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.marketing}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({ ...prev, marketing: checked }))
                    }
                  />
                </div>

                {/* Social Media Data Sharing */}
                <div className="space-y-3">
                  <Label className="font-medium text-foreground block">
                    Partage de données réseaux sociaux
                  </Label>
                  
                  {/* Facebook */}
                  <div className="flex items-start justify-between gap-4 p-3 bg-secondary/20 rounded-lg ml-2">
                    <div className="flex-1">
                      <Label className="font-medium text-foreground text-sm">
                        Facebook
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Partage des données avec Facebook pour des publicités ciblées.
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.socialMedia.facebook}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ 
                          ...prev, 
                          socialMedia: { ...prev.socialMedia, facebook: checked }
                        }))
                      }
                    />
                  </div>

                  {/* Instagram */}
                  <div className="flex items-start justify-between gap-4 p-3 bg-secondary/20 rounded-lg ml-2">
                    <div className="flex-1">
                      <Label className="font-medium text-foreground text-sm">
                        Instagram
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Partage des données avec Instagram pour des publicités ciblées.
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.socialMedia.instagram}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ 
                          ...prev, 
                          socialMedia: { ...prev.socialMedia, instagram: checked }
                        }))
                      }
                    />
                  </div>

                  {/* TikTok */}
                  <div className="flex items-start justify-between gap-4 p-3 bg-secondary/20 rounded-lg ml-2">
                    <div className="flex-1">
                      <Label className="font-medium text-foreground text-sm">
                        TikTok
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Partage des données avec TikTok pour des publicités ciblées.
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.socialMedia.tiktok}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ 
                          ...prev, 
                          socialMedia: { ...prev.socialMedia, tiktok: checked }
                        }))
                      }
                    />
                  </div>
                </div>

                {/* E-commerce Partners Data Sharing */}
                <div className="space-y-3">
                  <Label className="font-medium text-foreground block">
                    Partenaires e-commerce
                  </Label>
                  
                  {/* Printify */}
                  <div className="flex items-start justify-between gap-4 p-3 bg-secondary/20 rounded-lg ml-2">
                    <div className="flex-1">
                      <Label className="font-medium text-foreground text-sm">
                        Printify
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Partage des données pour la production et livraison de tes commandes.
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.ecommercePartners.printify}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ 
                          ...prev, 
                          ecommercePartners: { ...prev.ecommercePartners, printify: checked }
                        }))
                      }
                    />
                  </div>

                  {/* Shopify */}
                  <div className="flex items-start justify-between gap-4 p-3 bg-secondary/20 rounded-lg ml-2">
                    <div className="flex-1">
                      <Label className="font-medium text-foreground text-sm">
                        Shopify
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Partage des données pour la gestion de ta commande et du paiement.
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.ecommercePartners.shopify}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ 
                          ...prev, 
                          ecommercePartners: { ...prev.ecommercePartners, shopify: checked }
                        }))
                      }
                    />
                  </div>

                  {/* Stripe */}
                  <div className="flex items-start justify-between gap-4 p-3 bg-secondary/20 rounded-lg ml-2">
                    <div className="flex-1">
                      <Label className="font-medium text-foreground text-sm">
                        Stripe
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Partage des données pour le traitement sécurisé des paiements.
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.ecommercePartners.stripe}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ 
                          ...prev, 
                          ecommercePartners: { ...prev.ecommercePartners, stripe: checked }
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-end pt-2">
                <Button 
                  variant="outline"
                  onClick={handleRejectAll}
                >
                  Refuser tout
                </Button>
                <Button onClick={handleSavePreferences}>
                  Enregistrer mes préférences
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
