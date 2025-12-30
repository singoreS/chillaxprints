import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Politique de Confidentialité - RGPD"
        description="Politique de confidentialité ChillaxPrints. Découvrez comment nous protégeons vos données personnelles conformément au RGPD."
        keywords="politique confidentialité, RGPD, protection données, vie privée"
        canonicalUrl="/politique-confidentialite"
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Politique de Confidentialité
          </h1>
          <p className="text-muted-foreground mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <Separator className="mb-8" />
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Chez ChillaxPrints, nous prenons la protection de vos données personnelles très au sérieux. 
                Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons 
                vos informations lorsque vous utilisez notre site web www.chillaxprints.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Données collectées</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nous collectons les types de données suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Données d'identification :</strong> nom, prénom, adresse email, numéro de téléphone</li>
                <li><strong>Données de livraison :</strong> adresse postale complète</li>
                <li><strong>Données de commande :</strong> historique des achats, préférences produits</li>
                <li><strong>Données de navigation :</strong> cookies, adresse IP, pages visitées</li>
                <li><strong>Données de paiement :</strong> traitées directement par Shopify Payments (nous ne stockons pas vos informations de carte)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Utilisation des données</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Traiter et expédier vos commandes</li>
                <li>Vous envoyer des confirmations de commande et mises à jour de livraison</li>
                <li>Répondre à vos demandes de service client</li>
                <li>Vous envoyer notre newsletter (avec votre consentement)</li>
                <li>Améliorer notre site et notre offre de produits</li>
                <li>Prévenir la fraude et assurer la sécurité de notre plateforme</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Base légale du traitement</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous traitons vos données sur les bases légales suivantes conformément au RGPD :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                <li><strong>Exécution du contrat :</strong> pour traiter vos commandes</li>
                <li><strong>Consentement :</strong> pour l'envoi de communications marketing</li>
                <li><strong>Intérêt légitime :</strong> pour améliorer nos services et prévenir la fraude</li>
                <li><strong>Obligation légale :</strong> pour la conservation des factures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Partage des données</h2>
              <p className="text-muted-foreground leading-relaxed">
                Pour assurer la production et la livraison de vos commandes, nous partageons certaines données avec nos prestataires :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                <li><strong>Shopify :</strong> notre plateforme e-commerce pour le traitement des commandes et paiements</li>
                <li><strong>Fournisseurs de production :</strong> nos produits sont fabriqués à la demande par des fournisseurs qui reçoivent uniquement les données nécessaires à la fabrication et l'expédition</li>
                <li><strong>Transporteurs :</strong> pour la livraison de vos colis</li>
                <li><strong>Prestataires de paiement :</strong> Shopify Payments, PayPal pour le traitement sécurisé des paiements</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong>Important :</strong> Nos prestataires sont contractuellement tenus de protéger vos données et de les utiliser uniquement pour la production et l'expédition de vos commandes. Nous ne vendons jamais vos données personnelles à des tiers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Conservation des données</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous conservons vos données pendant les durées suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                <li><strong>Données clients :</strong> 3 ans après votre dernier achat</li>
                <li><strong>Données de facturation :</strong> 10 ans (obligation légale)</li>
                <li><strong>Données de navigation :</strong> 13 mois maximum</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Vos droits RGPD</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                <li><strong>Droit de limitation :</strong> limiter le traitement de vos données</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Pour exercer ces droits, contactez-nous à : contact@chillaxprints.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous utilisons des cookies pour améliorer votre expérience. Pour plus d'informations, 
                consultez notre bannière de gestion des cookies lors de votre première visite.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site</li>
                <li><strong>Cookies analytiques :</strong> pour comprendre l'utilisation du site</li>
                <li><strong>Cookies marketing :</strong> pour personnaliser les publicités (avec consentement)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Sécurité</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données :
                connexions sécurisées HTTPS, chiffrement des données sensibles, accès restreint aux données personnelles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Pour toute question concernant cette politique ou vos données personnelles :
              </p>
              <div className="mt-4 p-4 bg-secondary/20 rounded-lg">
                <p className="text-foreground font-medium">ChillaxPrints</p>
                <p className="text-muted-foreground">Email : contact@chillaxprints.com</p>
                <p className="text-muted-foreground">Site : www.chillaxprints.com</p>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Vous pouvez également déposer une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés).
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
