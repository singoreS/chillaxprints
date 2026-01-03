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
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Politique de Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez notre site. 
                Nous utilisons différents types de cookies pour améliorer votre expérience.
              </p>
              
              <h3 className="text-xl font-medium text-foreground mt-6 mb-3">8.1 Types de cookies utilisés</h3>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                <li>
                  <strong>Cookies strictement nécessaires :</strong> Indispensables au fonctionnement du site 
                  (panier d'achat, connexion à votre compte, sécurité). Ces cookies ne nécessitent pas votre 
                  consentement car le site ne peut pas fonctionner sans eux.
                </li>
                <li>
                  <strong>Cookies analytiques :</strong> Nous aident à comprendre comment les visiteurs 
                  interagissent avec notre site (pages visitées, temps passé, taux de rebond). 
                  Ces données sont anonymisées.
                </li>
                <li>
                  <strong>Cookies marketing :</strong> Utilisés pour vous proposer des publicités pertinentes 
                  sur d'autres sites. Ils permettent également de mesurer l'efficacité de nos campagnes.
                </li>
                <li>
                  <strong>Cookies de réseaux sociaux :</strong> Permettent le partage sur les réseaux sociaux 
                  (Instagram, TikTok, Pinterest) et peuvent être utilisés à des fins de publicité ciblée par ces plateformes.
                </li>
              </ul>
              
              <h3 className="text-xl font-medium text-foreground mt-6 mb-3">8.2 Gestion de vos préférences cookies</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Lors de votre première visite, une bannière de consentement vous permet de choisir quels cookies vous acceptez. 
                Vous pouvez à tout moment modifier vos préférences en cliquant sur le lien "Gérer les cookies" 
                présent dans le footer de notre site ou via les paramètres de votre navigateur.
              </p>
              
              <h3 className="text-xl font-medium text-foreground mt-6 mb-3">8.3 Durée de conservation des cookies</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Cookies de session :</strong> Supprimés à la fermeture du navigateur</li>
                <li><strong>Cookies persistants :</strong> Maximum 13 mois conformément aux recommandations de la CNIL</li>
                <li><strong>Votre choix de consentement :</strong> Conservé 6 mois</li>
              </ul>
              
              <h3 className="text-xl font-medium text-foreground mt-6 mb-3">8.4 Comment désactiver les cookies ?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour vous alerter 
                lorsqu'un cookie est envoyé. Voici comment faire selon votre navigateur :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
                <li><strong>Firefox :</strong> Options → Vie privée et sécurité → Cookies</li>
                <li><strong>Safari :</strong> Préférences → Confidentialité → Cookies</li>
                <li><strong>Edge :</strong> Paramètres → Cookies et autorisations de site</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong>Note :</strong> La désactivation de certains cookies peut affecter votre expérience sur notre site 
                (impossibilité de conserver le panier, de se connecter, etc.).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Consentement RGPD</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la directive ePrivacy, 
                nous recueillons votre consentement avant de :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Déposer des cookies non essentiels sur votre appareil</li>
                <li>Vous envoyer des communications marketing (newsletter, promotions)</li>
                <li>Partager vos données avec des partenaires publicitaires</li>
                <li>Utiliser vos données à des fins de profilage publicitaire</li>
              </ul>
              
              <h3 className="text-xl font-medium text-foreground mt-6 mb-3">Retrait du consentement</h3>
              <p className="text-muted-foreground leading-relaxed">
                Vous pouvez retirer votre consentement à tout moment, sans justification. Ce retrait ne remet 
                pas en cause la légalité du traitement effectué avant le retrait. Pour retirer votre consentement :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                <li><strong>Pour les cookies :</strong> Utilisez le gestionnaire de cookies accessible depuis le footer</li>
                <li><strong>Pour la newsletter :</strong> Cliquez sur le lien de désinscription présent dans chaque email</li>
                <li><strong>Pour toute autre demande :</strong> Contactez-nous à contact@chillaxprints.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Sécurité</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données :
                connexions sécurisées HTTPS, chiffrement des données sensibles, accès restreint aux données personnelles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact</h2>
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
