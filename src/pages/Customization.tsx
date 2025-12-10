import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Shirt, PenTool, Package, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Customization = () => {
  const customizationOptions = [
    {
      icon: Shirt,
      title: "T-shirts & Hoodies",
      description: "Personnalise tes vêtements avec ton propre design, texte ou image. Impression haute qualité garantie.",
      features: ["Impression DTG", "Couleurs illimitées", "Toutes tailles disponibles"],
    },
    {
      icon: Package,
      title: "Accessoires",
      description: "Bonnets, casquettes, sacs... Ajoute ta touche personnelle à tous tes accessoires préférés.",
      features: ["Broderie premium", "Impression sublimation", "Finitions soignées"],
    },
    {
      icon: PenTool,
      title: "Design sur mesure",
      description: "Tu n'as pas de design ? Pas de souci ! On peut créer ensemble quelque chose d'unique.",
      features: ["Assistance design", "Révisions incluses", "Fichiers HD fournis"],
    },
  ];

  const partners = [
    {
      name: "Printify",
      description: "Notre partenaire principal pour l'impression à la demande. Qualité professionnelle et large choix de produits.",
      logo: "🖨️",
    },
    {
      name: "Shopify",
      description: "Plateforme e-commerce sécurisée pour gérer tes commandes personnalisées.",
      logo: "🛒",
    },
    {
      name: "Fournisseurs Premium",
      description: "Réseau de fournisseurs certifiés pour des finitions et matériaux de qualité supérieure.",
      logo: "⭐",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Choisis ton produit",
      description: "Sélectionne le vêtement ou accessoire que tu veux personnaliser.",
    },
    {
      step: "2",
      title: "Envoie ton design",
      description: "Upload ton image, logo ou texte. On accepte PNG, JPG, SVG.",
    },
    {
      step: "3",
      title: "Validation & Production",
      description: "On vérifie la qualité et on lance la production chez nos partenaires.",
    },
    {
      step: "4",
      title: "Livraison",
      description: "Tu reçois ta création unique directement chez toi !",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Personnalisation | ChillaxPrints"
        description="Personnalise tes vêtements et accessoires avec ChillaxPrints. T-shirts, hoodies, bonnets sur mesure avec impression haute qualité via Printify."
        canonicalUrl="/personnalisation"
      />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <div className="container relative z-10 px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                <Sparkles className="h-3 w-3 mr-1" />
                Service de personnalisation
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Crée ton style <span className="text-primary">unique</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Des vêtements et accessoires à ton image. Personnalise tout ce que tu veux avec nos partenaires de confiance comme Printify.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="group">
                    <Palette className="h-5 w-5 mr-2" />
                    Demander un devis
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/boutique">
                  <Button size="lg" variant="outline">
                    Voir nos produits
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Customization Options */}
        <section className="py-16 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Qu'est-ce que tu veux personnaliser ?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Que ce soit pour toi, ton équipe ou un événement spécial, on a ce qu'il te faut.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {customizationOptions.map((option, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <option.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {option.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comment ça marche ?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Un processus simple en 4 étapes pour obtenir ta création personnalisée.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nos partenaires de confiance
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                On travaille avec les meilleurs pour te garantir une qualité irréprochable.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {partners.map((partner, index) => (
                <Card key={index} className="text-center border-2">
                  <CardHeader>
                    <div className="text-5xl mb-4">{partner.logo}</div>
                    <CardTitle>{partner.name}</CardTitle>
                    <CardDescription>{partner.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-primary/80 p-8 md:p-12 text-center">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Prêt à créer quelque chose d'unique ?
                </h2>
                <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                  Contacte-nous avec ton idée et on s'occupe du reste. Devis gratuit et sans engagement ! 😎
                </p>
                <Link to="/contact">
                  <Button size="lg" variant="secondary" className="group">
                    Contacte-nous
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Customization;
