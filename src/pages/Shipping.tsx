import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Package, Globe, Clock, MapPin, CheckCircle, Printer } from "lucide-react";

const Shipping = () => {
  const shippingZones = [
    {
      zone: "France métropolitaine",
      icon: <MapPin className="h-5 w-5" />,
      options: [
        { name: "Livraison Standard", delay: "5-12 jours ouvrés", price: "4,99 €", free: "Gratuit dès 60€" },
        { name: "Livraison Express", delay: "3-7 jours ouvrés", price: "9,99 €", free: null },
      ]
    },
    {
      zone: "Union Européenne",
      icon: <Globe className="h-5 w-5" />,
      options: [
        { name: "Livraison Standard", delay: "7-14 jours ouvrés", price: "7,99 €", free: "Gratuit dès 80€" },
        { name: "Livraison Express", delay: "5-10 jours ouvrés", price: "14,99 €", free: null },
      ]
    },
    {
      zone: "États-Unis & Canada",
      icon: <Globe className="h-5 w-5" />,
      options: [
        { name: "Livraison Standard", delay: "8-15 jours ouvrés", price: "9,99 €", free: "Gratuit dès 100€" },
        { name: "Livraison Express", delay: "5-10 jours ouvrés", price: "19,99 €", free: null },
      ]
    },
    {
      zone: "International (Reste du monde)",
      icon: <Truck className="h-5 w-5" />,
      options: [
        { name: "Livraison Standard", delay: "10-25 jours ouvrés", price: "14,99 €", free: null },
        { name: "Livraison Express", delay: "7-15 jours ouvrés", price: "24,99 €", free: null },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Livraison - Tarifs et Délais"
        description="Informations livraison ChillaxPrints. Livraison France et internationale. Suivi en temps réel, livraison gratuite dès 60€."
        keywords="livraison, expédition, délai livraison, frais port, print on demand"
        canonicalUrl="/livraison"
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Livraison
          </h1>
          <p className="text-muted-foreground mb-8">
            On livre partout dans le monde 🌍 - Chaque pièce est imprimée spécialement pour toi !
          </p>
          
          <Separator className="mb-8" />

          {/* Print on Demand Info */}
          <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Printer className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">🎨 Impression à la demande</h3>
                  <p className="text-muted-foreground">
                    Chaque article ChillaxPrints est <strong>imprimé spécialement pour toi</strong> après ta commande. 
                    Ce modèle nous permet de réduire le gaspillage et de proposer des designs uniques ! 
                    Les délais incluent le temps de production (2-5 jours) + la livraison.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4 text-center">
                <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Livraison offerte</p>
                <p className="text-xs text-muted-foreground">dès 60€ en France</p>
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
                <p className="text-xs text-muted-foreground">dans +190 pays</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Production rapide</p>
                <p className="text-xs text-muted-foreground">2-5 jours ouvrés</p>
              </CardContent>
            </Card>
          </div>

          {/* Shipping Zones */}
          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-semibold text-foreground">Zones de livraison & Tarifs</h2>
            <p className="text-muted-foreground">
              Les délais indiqués incluent le temps de production (2-5 jours) et l'expédition.
            </p>
            
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
            
            <div className="grid md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
                  1
                </div>
                <h4 className="font-medium text-foreground mb-1">Commande</h4>
                <p className="text-sm text-muted-foreground">
                  Tu passes ta commande 📦
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
                  2
                </div>
                <h4 className="font-medium text-foreground mb-1">Production</h4>
                <p className="text-sm text-muted-foreground">
                  Ton article est imprimé 🎨
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
                  3
                </div>
                <h4 className="font-medium text-foreground mb-1">Contrôle</h4>
                <p className="text-sm text-muted-foreground">
                  Qualité vérifiée ✅
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
                  4
                </div>
                <h4 className="font-medium text-foreground mb-1">Expédition</h4>
                <p className="text-sm text-muted-foreground">
                  Numéro de suivi envoyé 📧
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
                  5
                </div>
                <h4 className="font-medium text-foreground mb-1">Livraison</h4>
                <p className="text-sm text-muted-foreground">
                  Ton colis arrive 🎉
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
                    ⏱️ Pourquoi les délais sont plus longs que d'autres boutiques ?
                  </h4>
                  <p className="text-muted-foreground">
                    Chaque article est fabriqué spécialement pour toi après ta commande (print-on-demand). 
                    Cela nous permet de proposer des designs uniques tout en évitant le gaspillage. 
                    Le délai inclut 2-5 jours de production + le temps de livraison.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-2">
                    📍 Puis-je changer mon adresse de livraison après la commande ?
                  </h4>
                  <p className="text-muted-foreground">
                    Oui, si ta commande n'est pas encore en production ! Contacte-nous rapidement 
                    à contact@chillaxprints.com avec ton numéro de commande. Une fois en production, 
                    les modifications ne sont plus possibles.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-2">
                    📦 Ma commande est marquée "livrée" mais je ne l'ai pas reçue ?
                  </h4>
                  <p className="text-muted-foreground">
                    Vérifie auprès de tes voisins ou ton gardien. Si toujours rien après 48h, 
                    contacte-nous et on enquête avec le transporteur.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-2">
                    🌍 Livrez-vous dans mon pays ?
                  </h4>
                  <p className="text-muted-foreground">
                    Nous livrons dans plus de 190 pays ! Si ton pays n'apparaît pas au checkout, 
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
                    Pour minimiser ces frais, nous expédions depuis des centres de production locaux 
                    quand c'est possible.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-2">
                    🏭 D'où sont expédiés les produits ?
                  </h4>
                  <p className="text-muted-foreground">
                    Nos centres de production sont situés en Europe, aux États-Unis et dans 
                    d'autres régions. Nous sélectionnons automatiquement le centre de production 
                    le plus proche de ton adresse pour réduire les délais et l'empreinte carbone.
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
