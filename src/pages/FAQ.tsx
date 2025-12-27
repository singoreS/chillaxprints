import { SEO } from "@/components/SEO";
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
      id: "commandes",
      title: "Commandes",
      icon: ShoppingBag,
      questions: [
        {
          question: "Comment passer une commande ?",
          answer: "C'est super simple ! Parcourez notre boutique, sélectionnez vos articles préférés, choisissez la taille et la couleur, puis ajoutez-les au panier. Une fois prêt, passez à la caisse et suivez les étapes pour finaliser votre achat. Vous recevrez un email de confirmation dès que votre commande sera validée."
        },
        {
          question: "Puis-je modifier ou annuler ma commande ?",
          answer: "Comme nos produits sont fabriqués à la demande, nous lançons la production dès réception de votre commande. Vous disposez d'un délai de 2 heures après votre achat pour demander une modification ou une annulation. Passé ce délai, nous ne pourrons malheureusement plus intervenir. Contactez-nous rapidement via notre page Contact si besoin."
        },
        {
          question: "Comment savoir si ma commande a bien été enregistrée ?",
          answer: "Dès que votre paiement est confirmé, vous recevez un email de confirmation à l'adresse indiquée lors de votre achat. Si vous ne le voyez pas, vérifiez vos spams. Vous pouvez également suivre votre commande depuis votre espace client ou via le lien de suivi que nous vous envoyons."
        },
        {
          question: "Puis-je commander plusieurs articles différents ?",
          answer: "Absolument ! Vous pouvez ajouter autant d'articles que vous le souhaitez à votre panier. Notez cependant que chaque article étant fabriqué individuellement, ils peuvent être expédiés séparément si produits par différents partenaires."
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
          answer: "Nous acceptons les principales cartes bancaires (Visa, Mastercard, American Express), PayPal, Apple Pay et Google Pay. Tous les paiements sont sécurisés et cryptés pour protéger vos informations."
        },
        {
          question: "Le paiement est-il sécurisé ?",
          answer: "Oui, totalement ! Nous utilisons Shopify Payments qui garantit un niveau de sécurité bancaire. Vos données de paiement sont cryptées et nous ne stockons jamais vos informations de carte bancaire."
        },
        {
          question: "Quand suis-je débité ?",
          answer: "Le montant de votre commande est débité immédiatement lors de la validation de votre achat. C'est ce qui déclenche la production de vos articles."
        },
        {
          question: "Les prix incluent-ils les taxes ?",
          answer: "Les prix affichés incluent la TVA pour les clients européens. Pour les clients hors UE, les taxes locales et droits de douane éventuels sont à la charge du destinataire et peuvent être appliqués à la livraison."
        }
      ]
    },
    {
      id: "livraison",
      title: "Livraison & Délais",
      icon: Truck,
      questions: [
        {
          question: "Quels sont les délais de livraison ?",
          answer: "Les délais comprennent la production (2-5 jours ouvrés) + l'expédition. Pour la France : 5-10 jours ouvrés au total. Pour l'Europe : 7-14 jours ouvrés. Pour l'international : 10-20 jours ouvrés. Ces délais peuvent varier selon la période (fêtes, soldes) et le type de produit."
        },
        {
          question: "Pourquoi les délais sont-ils plus longs que sur d'autres sites ?",
          answer: "Contrairement aux grandes enseignes qui stockent des milliers de produits en entrepôt, nous utilisons le print-on-demand. Chaque article est fabriqué spécialement pour vous après votre commande. C'est plus écologique (pas de surproduction) et garantit un produit frais et personnalisé !"
        },
        {
          question: "Livrez-vous à l'international ?",
          answer: "Oui ! Nous livrons dans le monde entier. Les frais de port et délais varient selon la destination. Nos partenaires de production sont répartis globalement, ce qui nous permet souvent d'expédier depuis un site proche de chez vous."
        },
        {
          question: "Comment suivre ma commande ?",
          answer: "Dès que votre commande est expédiée, vous recevez un email avec un numéro de suivi. Vous pouvez également suivre votre colis depuis notre page Suivi de commande ou votre espace client."
        },
        {
          question: "Que faire si ma commande n'arrive pas ?",
          answer: "Si votre colis n'est pas arrivé dans les délais estimés, vérifiez d'abord le suivi. En cas de problème, contactez-nous avec votre numéro de commande. Nous ferons le nécessaire avec notre partenaire logistique pour localiser votre colis ou vous proposer une solution."
        },
        {
          question: "Les frais de port sont-ils offerts ?",
          answer: "Les frais de port sont calculés en fonction du poids, de la taille de votre commande et de votre destination. Nous proposons régulièrement des offres de livraison gratuite, restez à l'affût de nos promotions !"
        }
      ]
    },
    {
      id: "retours",
      title: "Retours & Remboursements",
      icon: RotateCcw,
      questions: [
        {
          question: "Puis-je retourner un article ?",
          answer: "Comme nos produits sont fabriqués sur mesure pour vous, les retours pour simple changement d'avis ne sont pas acceptés. Cependant, si vous recevez un article défectueux, endommagé ou différent de votre commande, nous vous proposons un remplacement ou un remboursement."
        },
        {
          question: "Que faire si je reçois un article défectueux ?",
          answer: "Contactez-nous dans les 14 jours suivant la réception avec des photos claires du défaut et votre numéro de commande. Notre équipe examinera votre demande et vous proposera un remplacement gratuit ou un remboursement."
        },
        {
          question: "Et si la taille ne me convient pas ?",
          answer: "Nous vous encourageons vivement à consulter notre Guide des tailles avant de commander. Les mesures y sont détaillées pour chaque type de produit. En cas d'erreur de taille de notre part, nous procéderons bien sûr à un échange."
        },
        {
          question: "Combien de temps pour obtenir un remboursement ?",
          answer: "Une fois votre demande validée, le remboursement est effectué sous 5-10 jours ouvrés sur le moyen de paiement utilisé lors de l'achat. Vous recevrez un email de confirmation."
        },
        {
          question: "Qui paie les frais de retour ?",
          answer: "En cas de produit défectueux ou d'erreur de notre part, nous prenons en charge les frais de retour. Dans les rares cas où un retour est accepté pour une autre raison, les frais restent à la charge du client."
        }
      ]
    },
    {
      id: "printify",
      title: "Print-on-Demand & Printify",
      icon: Printer,
      questions: [
        {
          question: "Qu'est-ce que le print-on-demand ?",
          answer: "Le print-on-demand (impression à la demande) est un modèle de production où chaque article est fabriqué uniquement après votre commande. Pas de stock, pas de gaspillage ! Votre t-shirt ou hoodie est imprimé spécialement pour vous, garantissant fraîcheur et qualité."
        },
        {
          question: "Qui est Printify ?",
          answer: "Printify est notre partenaire de production, l'un des leaders mondiaux du print-on-demand. Ils disposent d'un réseau de plus de 100 imprimeurs partenaires à travers le monde, ce qui nous permet de vous offrir une production de qualité et une livraison optimisée."
        },
        {
          question: "Pourquoi avoir choisi ce modèle ?",
          answer: "Le print-on-demand nous permet de proposer des designs uniques sans surproduction ni gaspillage textile. C'est plus écologique, plus flexible et garantit que chaque pièce est fraîchement produite pour vous. Fini les vêtements qui traînent en entrepôt !"
        },
        {
          question: "Quelle est la qualité des impressions ?",
          answer: "Nos partenaires utilisent des techniques d'impression professionnelles : DTG (Direct-to-Garment) pour les textiles et sublimation pour certains accessoires. Les encres sont durables, résistantes aux lavages et respectueuses de l'environnement."
        },
        {
          question: "Les vêtements sont-ils de bonne qualité ?",
          answer: "Absolument ! Nous sélectionnons soigneusement les supports (t-shirts, hoodies, etc.) parmi les meilleures marques disponibles chez nos partenaires. Coton doux, coupes confortables, finitions soignées. Consultez les descriptions produits pour les détails de chaque article."
        },
        {
          question: "Pourquoi mes articles peuvent-ils arriver séparément ?",
          answer: "Notre réseau de production est mondial. Si vous commandez plusieurs articles, ils peuvent être fabriqués par différents partenaires Printify selon leur spécialité et leur localisation. Cela optimise les délais et la qualité, mais signifie parfois des envois séparés."
        }
      ]
    },
    {
      id: "tailles",
      title: "Tailles & Mesures",
      icon: Ruler,
      questions: [
        {
          question: "Comment choisir ma taille ?",
          answer: "Consultez notre Guide des tailles détaillé ! Vous y trouverez les mesures exactes pour chaque type de produit (t-shirts, hoodies, bonnets, chaussures). Prenez vos mesures et comparez-les avec nos tableaux pour un choix optimal."
        },
        {
          question: "Les tailles sont-elles standard ?",
          answer: "Nos produits suivent généralement les standards européens, mais nous recommandons toujours de consulter le guide des tailles. Certains articles peuvent avoir des coupes légèrement différentes (regular, fitted, oversized) - c'est indiqué dans la description."
        },
        {
          question: "Que faire si j'hésite entre deux tailles ?",
          answer: "Si vous êtes entre deux tailles, nous recommandons généralement de prendre la taille supérieure pour plus de confort, surtout pour les hoodies. Pour un look plus ajusté, optez pour la taille inférieure. N'hésitez pas à nous contacter si vous avez un doute !"
        },
        {
          question: "Les vêtements rétrécissent-ils au lavage ?",
          answer: "Nos textiles sont pré-rétrécis pour minimiser ce risque. Suivez les instructions d'entretien (lavage à 30°, pas de sèche-linge) pour préserver la taille et la qualité de vos vêtements."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="FAQ - Questions Fréquentes"
        description="Trouvez les réponses à toutes vos questions sur les commandes, livraisons, retours et notre processus de production print-on-demand avec Printify."
        keywords="FAQ, questions fréquentes, aide, commandes, livraison, retours, print-on-demand, Printify, ChillaxPrints"
        canonicalUrl="/faq"
      />
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
