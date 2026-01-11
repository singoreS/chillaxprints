import { SEO } from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  Printer, 
  CreditCard, 
  HelpCircle,
  Ruler,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const faqCategories = [
    {
      id: "livraison",
      title: "Livraison",
      icon: Truck,
      questions: [
        {
          question: "Quels sont les délais de livraison ?",
          answer: "🇫🇷 France : 5-10 jours ouvrés • 🇪🇺 Europe : 7-14 jours ouvrés • 🌍 International : 10-20 jours ouvrés. Ces délais incluent la production + l'expédition. Le délai exact est affiché au checkout."
        },
        {
          question: "Livrez-vous partout dans le monde ?",
          answer: "Oui ! Nous livrons dans le monde entier. Les frais et délais varient selon la destination. Nous sélectionnons automatiquement le centre de production le plus proche de chez vous pour réduire les délais et l'empreinte carbone."
        },
        {
          question: "Comment suivre ma commande ?",
          answer: "Dès l'expédition, vous recevez un email avec votre numéro de suivi. Vous pouvez aussi suivre votre colis depuis notre page \"Suivi de commande\" ou votre espace client."
        },
        {
          question: "Les frais de port sont-ils offerts ?",
          answer: "Les frais de port sont calculés selon le poids et la destination. Nous proposons régulièrement des offres de livraison gratuite - suivez-nous sur les réseaux pour ne rien rater !"
        },
        {
          question: "Ma commande n'arrive pas, que faire ?",
          answer: "Vérifiez d'abord le suivi de votre colis. Si le délai estimé est dépassé, contactez-nous avec votre numéro de commande. Nous ferons le nécessaire pour résoudre le problème rapidement."
        }
      ]
    },
    {
      id: "production",
      title: "Production & Délais",
      icon: Printer,
      questions: [
        {
          question: "Combien de temps pour fabriquer ma commande ?",
          answer: "La production prend 2-5 jours ouvrés. Chaque article est fabriqué spécialement pour vous après votre commande. Ce n'est pas du stock, c'est du sur-mesure !"
        },
        {
          question: "Qu'est-ce que le print-on-demand ?",
          answer: "C'est de la fabrication à la demande : votre article est créé uniquement après votre commande. Pas de stock, pas de gaspillage ! C'est plus écologique et garantit un produit frais."
        },
        {
          question: "Pourquoi ce modèle ?",
          answer: "Ce modèle nous permet de proposer des designs uniques sans surproduction ni gaspillage textile. Chaque pièce est fraîchement produite pour vous, avec des impressions de qualité professionnelle."
        },
        {
          question: "Quelle est la qualité des impressions ?",
          answer: "Nous utilisons l'impression DTG (Direct-to-Garment) pour les textiles : encres durables, résistantes aux lavages, et respectueuses de l'environnement. Les couleurs restent vives lavage après lavage."
        },
        {
          question: "Pourquoi mes articles arrivent-ils séparément ?",
          answer: "Nous travaillons avec plusieurs centres de production à travers le monde. Si vous commandez plusieurs articles, ils peuvent être fabriqués à différents endroits pour optimiser les délais. Donc parfois, plusieurs colis !"
        }
      ]
    },
    {
      id: "tailles",
      title: "Choisir sa taille",
      icon: Ruler,
      questions: [
        {
          question: "Comment choisir la bonne taille ?",
          answer: "Consultez notre Guide des tailles ! Prenez vos mesures (tour de poitrine, longueur) et comparez avec nos tableaux. C'est la méthode la plus fiable pour éviter les mauvaises surprises."
        },
        {
          question: "J'hésite entre deux tailles, laquelle choisir ?",
          answer: "En cas de doute : prenez la taille au-dessus pour un look décontracté (surtout pour les hoodies), ou la taille en-dessous pour un style plus ajusté. N'hésitez pas à nous contacter si vous doutez !"
        },
        {
          question: "Les tailles sont-elles standard ?",
          answer: "Nos produits suivent les standards européens. Cependant, chaque modèle peut avoir une coupe différente (regular, fitted, oversized) - c'est toujours indiqué dans la description du produit."
        },
        {
          question: "Les vêtements rétrécissent-ils au lavage ?",
          answer: "Nos textiles sont pré-rétrécis pour minimiser ce risque. Respectez les instructions : lavage à 30°C, pas de sèche-linge, et vos vêtements garderont leur forme !"
        },
        {
          question: "Où trouver le guide des tailles ?",
          answer: "Sur chaque page produit, cliquez sur \"Guide des tailles\". Vous pouvez aussi accéder à notre guide complet depuis le footer du site. On y détaille toutes les mesures !"
        }
      ]
    },
    {
      id: "commandes",
      title: "Modifier ma commande",
      icon: ShoppingBag,
      questions: [
        {
          question: "Puis-je modifier ma commande ?",
          answer: "⏰ Vous avez 2 heures après l'achat pour demander une modification (taille, couleur, adresse). Passé ce délai, la production est lancée et nous ne pouvons plus intervenir. Contactez-nous vite via la page Contact !"
        },
        {
          question: "Puis-je annuler ma commande ?",
          answer: "Comme pour les modifications : vous disposez de 2 heures après l'achat pour demander une annulation. Après ce délai, votre article est déjà en production. Contactez-nous rapidement si besoin !"
        },
        {
          question: "Je me suis trompé d'adresse, que faire ?",
          answer: "Contactez-nous immédiatement avec votre numéro de commande et la nouvelle adresse. Si la production n'est pas encore lancée, nous pourrons corriger. Sinon, le colis partira à l'adresse initiale."
        },
        {
          question: "Comment savoir si ma commande est bien passée ?",
          answer: "Vous recevez un email de confirmation dès que le paiement est validé. Pas d'email ? Vérifiez vos spams ou connectez-vous à votre espace client pour voir l'état de votre commande."
        }
      ]
    },
    {
      id: "retours",
      title: "Retours & Problèmes",
      icon: RotateCcw,
      questions: [
        {
          question: "Puis-je retourner un article ?",
          answer: "Nos produits étant fabriqués sur mesure, les retours pour changement d'avis ne sont pas acceptés. En revanche, si votre article est défectueux ou ne correspond pas à la commande, nous vous remplaçons ou remboursons."
        },
        {
          question: "J'ai reçu un article défectueux, que faire ?",
          answer: "Contactez-nous dans les 14 jours avec des photos du problème + votre numéro de commande. Nous vous envoyons un nouvel article ou vous remboursons, sans frais supplémentaires."
        },
        {
          question: "La taille ne me va pas, c'est possible d'échanger ?",
          answer: "Malheureusement non, car chaque article est fabriqué à la demande. C'est pourquoi nous insistons sur l'importance de consulter le guide des tailles avant de commander. En cas d'erreur de notre part, bien sûr, on échange !"
        },
        {
          question: "Combien de temps pour un remboursement ?",
          answer: "Une fois votre demande validée, le remboursement est effectué sous 5-10 jours ouvrés sur votre moyen de paiement d'origine. Vous recevez un email de confirmation."
        }
      ]
    },
    {
      id: "paiement",
      title: "Paiement",
      icon: CreditCard,
      questions: [
        {
          question: "Quels moyens de paiement acceptez-vous ?",
          answer: "Cartes bancaires (Visa, Mastercard, American Express), PayPal, Apple Pay et Google Pay. Tous les paiements sont sécurisés et cryptés."
        },
        {
          question: "Le paiement est-il sécurisé ?",
          answer: "100% sécurisé ! Nous utilisons Shopify Payments avec cryptage bancaire. Nous ne stockons jamais vos informations de carte."
        },
        {
          question: "Les prix incluent-ils les taxes ?",
          answer: "Les prix affichés incluent la TVA pour les clients européens. Pour les clients hors UE, des taxes locales peuvent s'appliquer à la réception du colis."
        }
      ]
    }
  ];

  // Flatten all FAQ items for structured data
  const allFaqItems = faqCategories.flatMap(category => 
    category.questions.map(q => ({
      question: q.question,
      answer: q.answer
    }))
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="FAQ - Questions Fréquentes"
        description="Trouvez les réponses à toutes vos questions sur les commandes, livraisons, retours et notre processus de fabrication à la demande."
        keywords="FAQ, questions fréquentes, aide, commandes, livraison, retours, print-on-demand, ChillaxPrints"
        canonicalUrl="/faq"
      />
      <StructuredData type="FAQPage" items={allFaqItems} />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Questions <span className="text-primary">Fréquentes</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur ChillaxPrints, nos produits et notre fonctionnement. 
              Si vous ne trouvez pas la réponse ici, contactez-nous !
            </p>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-8 bg-secondary/20 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {faqCategories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full border hover:border-primary hover:text-primary transition-colors"
                >
                  <category.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{category.title}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-12">
              {faqCategories.map((category) => (
                <Card key={category.id} id={category.id} className="scroll-mt-24">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Accordion type="single" collapsible className="space-y-2">
                      {category.questions.map((item, index) => (
                        <AccordionItem 
                          key={index} 
                          value={`${category.id}-${index}`}
                          className="border rounded-lg px-4 data-[state=open]:bg-secondary/30"
                        >
                          <AccordionTrigger className="text-left hover:no-underline py-4">
                            <span className="font-medium">{item.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Helpful Links */}
        <section className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Liens Utiles</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Link to="/guide-des-tailles" className="flex items-center gap-3 p-4 bg-background rounded-lg border hover:border-primary transition-colors">
                <Ruler className="h-5 w-5 text-primary" />
                <span className="font-medium">Guide des Tailles</span>
              </Link>
              <Link to="/livraison" className="flex items-center gap-3 p-4 bg-background rounded-lg border hover:border-primary transition-colors">
                <Truck className="h-5 w-5 text-primary" />
                <span className="font-medium">Infos Livraison</span>
              </Link>
              <Link to="/retours" className="flex items-center gap-3 p-4 bg-background rounded-lg border hover:border-primary transition-colors">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span className="font-medium">Politique de Retour</span>
              </Link>
              <Link to="/suivi-commande" className="flex items-center gap-3 p-4 bg-background rounded-lg border hover:border-primary transition-colors">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <span className="font-medium">Suivi de Commande</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">
                Vous n'avez pas trouvé votre réponse ?
              </h2>
              <p className="text-muted-foreground mb-6">
                Notre équipe est là pour vous aider ! Contactez-nous et nous vous répondrons dans les plus brefs délais.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/contact">
                  <Mail className="h-4 w-4 mr-2" />
                  Nous Contacter
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
