import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Separator } from "@/components/ui/separator";

const TermsOfSale = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Conditions Générales de Vente - CGV"
        description="Conditions générales de vente ChillaxPrints. Informations sur les commandes, paiements, livraisons et retours. Print-on-demand."
        keywords="CGV, conditions générales vente, mentions légales, commande, print on demand"
        canonicalUrl="/cgv"
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Conditions Générales de Vente
          </h1>
          <p className="text-muted-foreground mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <Separator className="mb-8" />
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 1 - Objet</h2>
              <p className="text-muted-foreground leading-relaxed">
                Les présentes Conditions Générales de Vente (CGV) régissent les ventes de produits effectuées 
                sur le site www.chillaxprints.com, exploité par ChillaxPrints. En passant commande, 
                vous acceptez sans réserve les présentes conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 2 - Produits</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                ChillaxPrints propose à la vente des vêtements et accessoires personnalisés fabriqués 
                selon le modèle du <strong>print-on-demand</strong> (impression à la demande) :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>T-shirts imprimés</li>
                <li>Hoodies et sweats</li>
                <li>Bonnets</li>
                <li>Chaussures</li>
                <li>Autres accessoires vestimentaires</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong>Spécificité du print-on-demand :</strong> Chaque produit est fabriqué spécialement 
                après réception de la commande. Il n'existe pas de stock préexistant. Cette méthode permet 
                de réduire le gaspillage et de proposer des designs uniques.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Les produits sont décrits avec la plus grande exactitude possible. Les photographies 
                des produits ne sont pas contractuelles. Les couleurs peuvent légèrement varier selon 
                les paramètres d'affichage de votre écran.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 3 - Prix</h2>
              <p className="text-muted-foreground leading-relaxed">
                Les prix sont indiqués en euros (€) toutes taxes comprises (TTC). Les frais de livraison 
                sont indiqués avant validation de la commande et varient selon la destination. 
                ChillaxPrints se réserve le droit de modifier ses prix à tout moment, les produits 
                étant facturés au prix en vigueur lors de la commande.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 4 - Commande</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Le processus de commande comprend les étapes suivantes :
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>Sélection des produits et ajout au panier</li>
                <li>Vérification du panier et des quantités</li>
                <li>Identification ou création de compte (optionnel)</li>
                <li>Saisie de l'adresse de livraison</li>
                <li>Choix du mode de livraison</li>
                <li>Paiement sécurisé</li>
                <li>Confirmation de commande par email</li>
              </ol>
              <p className="text-muted-foreground leading-relaxed mt-4">
                La commande est définitive après confirmation du paiement. <strong>Important :</strong> une fois 
                la commande passée en production (généralement sous 24h), elle ne peut plus être annulée 
                ou modifiée car votre article est déjà en cours de fabrication.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 5 - Paiement</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Le paiement s'effectue en ligne par :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Carte bancaire (Visa, Mastercard, American Express)</li>
                <li>PayPal</li>
                <li>Apple Pay / Google Pay</li>
                <li>Shop Pay</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Toutes les transactions sont sécurisées par Shopify Payments. Vos informations 
                de paiement sont chiffrées et ne sont jamais stockées sur nos serveurs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 6 - Fabrication et Livraison</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Délai de production :</strong> 2-5 jours ouvrés après réception de la commande.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Délais de livraison indicatifs (production incluse) :</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>France métropolitaine :</strong> 5-12 jours ouvrés</li>
                <li><strong>Union Européenne :</strong> 7-14 jours ouvrés</li>
                <li><strong>États-Unis & Canada :</strong> 8-15 jours ouvrés</li>
                <li><strong>International :</strong> 10-25 jours ouvrés</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong>Centres de production :</strong> Pour optimiser les délais et réduire l'empreinte 
                carbone, vos produits sont fabriqués dans le centre de production le plus proche de 
                votre adresse de livraison (Europe, États-Unis, ou autres régions).
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                ChillaxPrints ne peut être tenu responsable des retards de livraison imputables 
                aux transporteurs ou en cas de force majeure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 7 - Droit de rétractation et Retours</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Particularité des produits personnalisés :</strong> Conformément à l'article L221-28 
                du Code de la consommation, le droit de rétractation ne s'applique pas aux biens 
                confectionnés selon les spécifications du consommateur ou nettement personnalisés.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Nos produits étant fabriqués à la demande selon votre commande spécifique, ils ne peuvent 
                faire l'objet d'un retour pour simple changement d'avis.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong>Cependant, nous garantissons :</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                <li>Le remplacement ou remboursement des produits défectueux</li>
                <li>Le remplacement ou remboursement si l'article reçu ne correspond pas à la commande</li>
                <li>Le remboursement en cas de colis perdu ou non livré</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Toute réclamation doit être effectuée dans les <strong>30 jours</strong> suivant la réception, 
                avec photos à l'appui, à l'adresse : contact@chillaxprints.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 8 - Garantie et réclamations</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tous nos produits bénéficient de la garantie légale de conformité (articles L217-4 et suivants 
                du Code de la consommation) et de la garantie contre les vices cachés (articles 1641 et suivants 
                du Code civil).
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                En cas de produit défectueux ou non conforme, contactez-nous dans les 30 jours suivant la réception.
                Nous procéderons à un remplacement ou remboursement après vérification du défaut.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 9 - Propriété intellectuelle</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tous les éléments du site (textes, images, logos, designs) sont protégés par le droit 
                de la propriété intellectuelle. Toute reproduction ou utilisation sans autorisation 
                préalable est strictement interdite.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Les designs proposés sur nos produits sont des créations originales de ChillaxPrints 
                ou sont utilisés avec les autorisations nécessaires.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 10 - Responsabilité</h2>
              <p className="text-muted-foreground leading-relaxed">
                ChillaxPrints ne saurait être tenu responsable des dommages indirects résultant 
                de l'utilisation des produits. Notre responsabilité est limitée au montant 
                de la commande concernée.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Les produits sont fabriqués par nos partenaires de production selon des standards 
                de qualité stricts. ChillaxPrints agit en tant que donneur d'ordre et reste 
                votre interlocuteur unique pour toute question ou réclamation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 11 - Données personnelles</h2>
              <p className="text-muted-foreground leading-relaxed">
                Le traitement de vos données personnelles est décrit dans notre Politique de Confidentialité. 
                En passant commande, vous acceptez que vos données soient traitées conformément à cette politique 
                et partagées avec nos partenaires de production et de livraison dans le seul but de traiter 
                votre commande.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 12 - Litiges</h2>
              <p className="text-muted-foreground leading-relaxed">
                Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable 
                sera recherchée. À défaut, les tribunaux français seront compétents.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Conformément à l'article L612-1 du Code de la consommation, vous pouvez recourir 
                à un médiateur de la consommation en cas de litige.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 13 - Contact</h2>
              <div className="p-4 bg-secondary/20 rounded-lg">
                <p className="text-foreground font-medium">ChillaxPrints</p>
                <p className="text-muted-foreground">Email : contact@chillaxprints.com</p>
                <p className="text-muted-foreground">Site : www.chillaxprints.com</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfSale;
