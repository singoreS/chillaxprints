import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Separator } from "@/components/ui/separator";

const TermsOfSale = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Conditions Générales de Vente - CGV"
        description="Conditions générales de vente ChillaxPrints. Informations sur les commandes, paiements, livraisons et retours."
        keywords="CGV, conditions générales vente, mentions légales, commande"
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
                ChillaxPrints propose à la vente :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>T-shirts imprimés</li>
                <li>Hoodies et sweats</li>
                <li>Bonnets</li>
                <li>Chaussures</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Les produits sont décrits avec la plus grande exactitude possible. Les photographies 
                des produits ne sont pas contractuelles. En cas d'erreur manifeste entre les caractéristiques 
                du produit et sa représentation, ChillaxPrints ne saurait être engagé.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 3 - Prix</h2>
              <p className="text-muted-foreground leading-relaxed">
                Les prix sont indiqués en euros (€) toutes taxes comprises (TTC). Les frais de livraison 
                sont indiqués avant validation de la commande. ChillaxPrints se réserve le droit de modifier 
                ses prix à tout moment, les produits étant facturés au prix en vigueur lors de la commande.
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
                <li>Identification ou création de compte</li>
                <li>Choix du mode de livraison</li>
                <li>Paiement sécurisé</li>
                <li>Confirmation de commande par email</li>
              </ol>
              <p className="text-muted-foreground leading-relaxed mt-4">
                La commande est définitive après confirmation du paiement. Un email de confirmation 
                vous sera envoyé avec le récapitulatif de votre commande.
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
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Toutes les transactions sont sécurisées par Shopify Payments. Vos informations 
                de paiement sont chiffrées et ne sont jamais stockées sur nos serveurs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 6 - Livraison</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Les délais de livraison sont indicatifs :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>France métropolitaine :</strong> 3-5 jours ouvrés</li>
                <li><strong>Union Européenne :</strong> 5-10 jours ouvrés</li>
                <li><strong>International :</strong> 10-20 jours ouvrés</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                ChillaxPrints ne peut être tenu responsable des retards de livraison imputables 
                aux transporteurs ou en cas de force majeure. Pour plus de détails, consultez 
                notre page Livraison.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 7 - Droit de rétractation</h2>
              <p className="text-muted-foreground leading-relaxed">
                Conformément à l'article L221-18 du Code de la consommation, vous disposez d'un délai 
                de <strong>14 jours</strong> à compter de la réception de votre commande pour exercer 
                votre droit de rétractation, sans avoir à justifier de motifs.
              </p>
              <div className="mt-4 p-4 bg-secondary/20 rounded-lg">
                <p className="text-foreground font-medium mb-2">Pour exercer ce droit :</p>
                <ol className="list-decimal pl-6 space-y-1 text-muted-foreground">
                  <li>Contactez-nous à contact@chillaxprints.com</li>
                  <li>Retournez le produit dans son état d'origine, non porté, avec étiquettes</li>
                  <li>Les frais de retour sont à votre charge</li>
                  <li>Le remboursement sera effectué sous 14 jours après réception du retour</li>
                </ol>
              </div>
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
                Nous procéderons à un échange ou remboursement après vérification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 9 - Propriété intellectuelle</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tous les éléments du site (textes, images, logos, designs) sont protégés par le droit 
                de la propriété intellectuelle. Toute reproduction ou utilisation sans autorisation 
                préalable est strictement interdite.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 10 - Responsabilité</h2>
              <p className="text-muted-foreground leading-relaxed">
                ChillaxPrints ne saurait être tenu responsable des dommages indirects résultant 
                de l'utilisation des produits. Notre responsabilité est limitée au montant 
                de la commande concernée.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 11 - Données personnelles</h2>
              <p className="text-muted-foreground leading-relaxed">
                Le traitement de vos données personnelles est décrit dans notre Politique de Confidentialité. 
                En passant commande, vous acceptez que vos données soient traitées conformément à cette politique.
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
