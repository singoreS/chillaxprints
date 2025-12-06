import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Package, RotateCcw, Clock, CheckCircle, AlertCircle } from "lucide-react";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Politique de Retour & Remboursement
          </h1>
          <p className="text-muted-foreground mb-8">
            Satisfait ou remboursé - On veut que tu sois 100% chill avec ton achat 😎
          </p>
          
          <Separator className="mb-8" />

          {/* Key Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center">
                <Clock className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">14 jours</h3>
                <p className="text-sm text-muted-foreground">Pour changer d'avis</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center">
                <RotateCcw className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Échange gratuit</h3>
                <p className="text-sm text-muted-foreground">Pour les erreurs de taille</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center">
                <Package className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Remboursement rapide</h3>
                <p className="text-sm text-muted-foreground">Sous 14 jours</p>
              </CardContent>
            </Card>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                🔄 Comment retourner un article ?
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</span>
                  <div>
                    <h4 className="font-medium text-foreground">Contactez-nous</h4>
                    <p className="text-muted-foreground">
                      Envoyez un email à contact@chillaxprints.com avec votre numéro de commande 
                      et le motif du retour.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</span>
                  <div>
                    <h4 className="font-medium text-foreground">Préparez votre colis</h4>
                    <p className="text-muted-foreground">
                      Emballez soigneusement l'article dans son état d'origine, non porté, 
                      avec toutes les étiquettes attachées.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</span>
                  <div>
                    <h4 className="font-medium text-foreground">Expédiez le retour</h4>
                    <p className="text-muted-foreground">
                      Nous vous enverrons une étiquette de retour par email. 
                      Déposez le colis dans un point relais ou à La Poste.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</span>
                  <div>
                    <h4 className="font-medium text-foreground">Recevez votre remboursement</h4>
                    <p className="text-muted-foreground">
                      Le remboursement sera effectué sous 14 jours après réception et 
                      vérification du retour, sur le même moyen de paiement utilisé.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                ✅ Conditions de retour
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Retours acceptés
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Article non porté et non lavé</li>
                    <li>• Étiquettes d'origine attachées</li>
                    <li>• Emballage d'origine de préférence</li>
                    <li>• Retour dans les 14 jours suivant la réception</li>
                    <li>• Produit en parfait état de revente</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    Retours refusés
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Article porté ou lavé</li>
                    <li>• Étiquettes retirées ou endommagées</li>
                    <li>• Article endommagé par le client</li>
                    <li>• Retour après 14 jours</li>
                    <li>• Articles soldés ou promotionnels (sauf défaut)</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                👕 Échange de taille
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Mauvaise taille ? Pas de stress ! On propose des échanges gratuits pour les erreurs de taille 
                (sous réserve de disponibilité).
              </p>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2">Procédure d'échange :</h4>
                  <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                    <li>Contactez-nous avec votre numéro de commande et la taille souhaitée</li>
                    <li>On vérifie la disponibilité et on vous envoie une étiquette retour prépayée</li>
                    <li>Dès réception de votre retour, on vous expédie la nouvelle taille</li>
                  </ol>
                </CardContent>
              </Card>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                💸 Frais de retour
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-secondary/20 rounded-lg">
                  <span className="text-foreground">Échange de taille</span>
                  <span className="font-semibold text-green-600">Gratuit</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary/20 rounded-lg">
                  <span className="text-foreground">Produit défectueux ou erreur de notre part</span>
                  <span className="font-semibold text-green-600">Gratuit</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary/20 rounded-lg">
                  <span className="text-foreground">Rétractation (changement d'avis)</span>
                  <span className="font-semibold text-muted-foreground">À votre charge (~6€)</span>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                🛡️ Produit défectueux
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Si vous recevez un produit défectueux ou endommagé, contactez-nous immédiatement 
                avec des photos du problème. Nous organiserons un retour gratuit et vous enverrons 
                un remplacement ou un remboursement complet, selon votre préférence.
              </p>
            </section>

            <section className="text-center py-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Des questions sur votre retour ?
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
