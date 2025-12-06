import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Package, RotateCcw, Clock, CheckCircle, AlertCircle, Printer } from "lucide-react";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Politique de Retour & Remboursement"
        description="Politique de retour ChillaxPrints. Échanges et remboursements pour produits défectueux. Print-on-demand avec satisfaction garantie."
        keywords="retour, remboursement, échange, politique retour, print on demand"
        canonicalUrl="/retours"
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Politique de Retour & Remboursement
          </h1>
          <p className="text-muted-foreground mb-8">
            On veut que tu sois 100% satisfait de ton achat 😎
          </p>
          
          <Separator className="mb-8" />

          {/* Print on Demand Notice */}
          <Card className="mb-8 border-amber-500/30 bg-amber-50/50 dark:bg-amber-900/10">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
                  <Printer className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">📦 Important : Produits fabriqués sur commande</h3>
                  <p className="text-muted-foreground">
                    Tous nos articles sont <strong>imprimés spécialement pour toi</strong> après ta commande. 
                    C'est pour ça que nous ne pouvons pas accepter les retours pour simple changement d'avis. 
                    Cependant, nous garantissons un <strong>remplacement ou remboursement</strong> pour tout 
                    produit défectueux ou non conforme !
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center">
                <Clock className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">30 jours</h3>
                <p className="text-sm text-muted-foreground">Pour signaler un problème</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center">
                <RotateCcw className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Remplacement gratuit</h3>
                <p className="text-sm text-muted-foreground">Pour les produits défectueux</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center">
                <Package className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Remboursement</h3>
                <p className="text-sm text-muted-foreground">Si remplacement impossible</p>
              </CardContent>
            </Card>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                ✅ Quand puis-je demander un retour/remboursement ?
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-900/30">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Produit défectueux</strong>
                    <p className="text-muted-foreground text-sm">Défaut d'impression, trou, couture défaillante, etc.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-900/30">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Mauvais article reçu</strong>
                    <p className="text-muted-foreground text-sm">Taille, couleur ou design différent de ta commande</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-900/30">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Article endommagé à la livraison</strong>
                    <p className="text-muted-foreground text-sm">Colis abîmé pendant le transport</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-900/30">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Colis perdu</strong>
                    <p className="text-muted-foreground text-sm">Commande jamais reçue après les délais annoncés</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                ❌ Cas non éligibles au retour
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-900/30">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Changement d'avis</strong>
                    <p className="text-muted-foreground text-sm">Nos produits sont fabriqués sur commande et ne peuvent être revendus</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-900/30">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Erreur de taille de ta part</strong>
                    <p className="text-muted-foreground text-sm">Consulte notre guide des tailles avant de commander</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-900/30">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Article porté ou lavé</strong>
                    <p className="text-muted-foreground text-sm">Les réclamations doivent être faites avant utilisation</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-900/30">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Délai dépassé</strong>
                    <p className="text-muted-foreground text-sm">Réclamation après 30 jours suivant la réception</p>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                🔄 Comment faire une réclamation ?
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</span>
                  <div>
                    <h4 className="font-medium text-foreground">Contactez-nous rapidement</h4>
                    <p className="text-muted-foreground">
                      Envoyez un email à <strong>contact@chillaxprints.com</strong> dans les 30 jours 
                      suivant la réception avec votre numéro de commande.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</span>
                  <div>
                    <h4 className="font-medium text-foreground">Joignez des photos</h4>
                    <p className="text-muted-foreground">
                      Envoyez-nous des photos claires du problème (défaut, dommage, mauvais article). 
                      Cela nous aide à traiter votre demande plus rapidement.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</span>
                  <div>
                    <h4 className="font-medium text-foreground">Nous examinons votre demande</h4>
                    <p className="text-muted-foreground">
                      Notre équipe examine votre réclamation sous 48h ouvrées et vous propose 
                      une solution (remplacement ou remboursement).
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</span>
                  <div>
                    <h4 className="font-medium text-foreground">Résolution</h4>
                    <p className="text-muted-foreground">
                      En cas de remplacement, nous réimprimons et réexpédions gratuitement. 
                      En cas de remboursement, il sera effectué sous 5-10 jours ouvrés sur votre 
                      moyen de paiement original.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                💡 Conseils pour éviter les problèmes
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium text-foreground mb-2">📏 Vérifiez le guide des tailles</h4>
                    <p className="text-muted-foreground text-sm">
                      Chaque produit a un guide des tailles spécifique. Prenez vos mesures 
                      avant de commander pour éviter les erreurs.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium text-foreground mb-2">📍 Vérifiez votre adresse</h4>
                    <p className="text-muted-foreground text-sm">
                      Une adresse incorrecte peut entraîner la perte du colis. 
                      Vérifiez bien avant de valider votre commande.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium text-foreground mb-2">📸 Inspectez à la réception</h4>
                    <p className="text-muted-foreground text-sm">
                      Vérifiez votre commande dès réception. Signalez tout problème 
                      rapidement pour faciliter le traitement.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium text-foreground mb-2">🎨 Les couleurs peuvent varier</h4>
                    <p className="text-muted-foreground text-sm">
                      Les couleurs affichées peuvent légèrement varier selon votre écran. 
                      Ce n'est pas considéré comme un défaut.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="text-center py-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Des questions sur votre commande ?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/contact">Nous contacter</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/suivi-commande">Suivre ma commande</Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReturnPolicy;
