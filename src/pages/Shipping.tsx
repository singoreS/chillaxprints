import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Package, Globe, Clock, MapPin, CheckCircle } from "lucide-react";

const Shipping = () => {
  const shippingZones = [
    {
      zone: "France métropolitaine",
      icon: <MapPin className="h-5 w-5" />,
      options: [
        { name: "Colissimo", delay: "3-5 jours ouvrés", price: "4,90 €", free: "Gratuit dès 50€" },
        { name: "Point Relais", delay: "3-5 jours ouvrés", price: "3,90 €", free: "Gratuit dès 40€" },
        { name: "Chronopost Express", delay: "24-48h", price: "9,90 €", free: null },
      ]
    },
    {
      zone: "Union Européenne",
      icon: <Globe className="h-5 w-5" />,
      options: [
        { name: "Colissimo International", delay: "5-10 jours ouvrés", price: "9,90 €", free: "Gratuit dès 80€" },
        { name: "DHL Express", delay: "3-5 jours ouvrés", price: "14,90 €", free: null },
      ]
    },
    {
      zone: "International (hors UE)",
      icon: <Truck className="h-5 w-5" />,
      options: [
        { name: "Colissimo International", delay: "10-20 jours ouvrés", price: "14,90 €", free: null },
        { name: "DHL Express", delay: "5-10 jours ouvrés", price: "24,90 €", free: null },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Livraison - Tarifs et Délais"
        description="Informations livraison ChillaxPrints. Livraison France et internationale. Suivi en temps réel, livraison gratuite dès 50€."
        keywords="livraison, expédition, délai livraison, frais port, colissimo"
        canonicalUrl="/livraison"
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Livraison
          </h1>
          <p className="text-muted-foreground mb-8">
            On livre partout dans le monde 🌍 - Même si t'es chill, ton colis arrive vite !
          </p>
          
          <Separator className="mb-8" />

          {/* Key Benefits */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4 text-center">
                <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Livraison offerte</p>
                <p className="text-xs text-muted-foreground">dès 50€ en France</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4 text-center">
                <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Suivi en temps réel</p>
                <p className="text-xs text-muted-foreground">sur toutes les commandes</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4 text-center">
                <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Livraison mondiale</p>
                <p className="text-xs text-muted-foreground">dans +100 pays</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Expédition rapide</p>
                <p className="text-xs text-muted-foreground">sous 24-48h</p>
              </CardContent>
            </Card>
          </div>

          {/* Shipping Zones */}
          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-semibold text-foreground">Zones de livraison & Tarifs</h2>
            
            {shippingZones.map((zone) => (
              <Card key={zone.zone}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {zone.icon}
                    {zone.zone}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {zone.options.map((option, idx) => (
                      <div 
                        key={idx} 
                        className="flex flex-wrap items-center justify-between gap-2 p-3 bg-secondary/20 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-foreground">{option.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {option.delay}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{option.price}</span>
                          {option.free && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              {option.free}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator className="mb-8" />

          {/* Process */}
          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-semibold text-foreground">Comment ça marche ?</h2>
            
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
                  1
                </div>
                <h4 className="font-medium text-foreground mb-1">Commande</h4>
                <p className="text-sm text-muted-foreground">
                  Tu passes commande et on reçoit une notification 📦
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
                  2
                </div>
                <h4 className="font-medium text-foreground mb-1">Préparation</h4>
                <p className="text-sm text-muted-foreground">
                  On prépare ta commande avec soin sous 24-48h ✨
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
                  3
                </div>
                <h4 className="font-medium text-foreground mb-1">Expédition</h4>
                <p className="text-sm text-muted-foreground">
                  Tu reçois un email avec ton numéro de suivi 📧
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
                  4
                </div>
                <h4 className="font-medium text-foreground mb-1">Livraison</h4>
                <p className="text-sm text-muted-foreground">
                  Ton colis arrive chez toi ou en point relais 🎉
                </p>
              </div>
            </div>
          </div>

          <Separator className="mb-8" />

          {/* FAQ */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Questions fréquentes</h2>
            
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-2">
                    📍 Puis-je changer mon adresse de livraison après la commande ?
                  </h4>
                  <p className="text-muted-foreground">
                    Oui, si ta commande n'a pas encore été expédiée ! Contacte-nous rapidement 
                    à contact@chillaxprints.com avec ton numéro de commande.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-2">
                    📦 Ma commande est marquée "livrée" mais je ne l'ai pas reçue ?
                  </h4>
                  <p className="text-muted-foreground">
                    Vérifie auprès de tes voisins ou ton gardien. Si toujours rien, contacte-nous 
                    et on enquête avec le transporteur.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-2">
                    🌍 Livrez-vous dans mon pays ?
                  </h4>
                  <p className="text-muted-foreground">
                    On livre dans plus de 100 pays ! Si ton pays n'apparaît pas au checkout, 
                    contacte-nous et on trouvera une solution.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-2">
                    💰 Y a-t-il des frais de douane pour les livraisons hors UE ?
                  </h4>
                  <p className="text-muted-foreground">
                    Des frais de douane et taxes locales peuvent s'appliquer pour les livraisons 
                    hors UE. Ces frais sont à la charge du destinataire et varient selon le pays.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tracking CTA */}
          <div className="mt-12 text-center p-8 bg-primary/5 rounded-2xl">
            <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Suivre ma commande
            </h3>
            <p className="text-muted-foreground mb-4">
              Tu as reçu ton email de confirmation ? Suis ta commande en temps réel !
            </p>
            <a 
              href="/suivi-commande" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Suivre ma commande
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shipping;
