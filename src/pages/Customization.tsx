import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Palette, Shirt, PenTool, Package, ArrowRight, Sparkles, CheckCircle2, Users, Percent, Send, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Customization = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    productType: "",
    quantity: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Demande de devis envoyée !", {
      description: "On te répond dans les 24-48h. Reste chill ! 😎",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      productType: "",
      quantity: "",
      description: "",
    });
    setIsSubmitting(false);
  };

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
      description: "Notre partenaire principal pour l'impression à la demande. Qualité professionnelle, personnalisation avancée et large choix de produits.",
      logo: "🖨️",
    },
    {
      name: "Printful",
      description: "Fournisseur premium avec entrepôts en Europe et USA. Idéal pour des livraisons rapides et une qualité exceptionnelle.",
      logo: "👕",
    },
    {
      name: "Gelato",
      description: "Production locale dans 30+ pays. Réduction de l'empreinte carbone et livraisons express partout dans le monde.",
      logo: "🌍",
    },
    {
      name: "Shopify",
      description: "Plateforme e-commerce sécurisée pour gérer tes commandes personnalisées et paiements.",
      logo: "🛒",
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

  const bulkDiscounts = [
    { quantity: "50-99 articles", discount: "10%", color: "bg-primary/10 text-primary" },
    { quantity: "100-249 articles", discount: "15%", color: "bg-primary/20 text-primary" },
    { quantity: "250-499 articles", discount: "20%", color: "bg-primary/30 text-primary" },
    { quantity: "500+ articles", discount: "25%", color: "bg-primary text-primary-foreground" },
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
                <a href="#devis">
                  <Button size="lg" className="group">
                    <Palette className="h-5 w-5 mr-2" />
                    Demander un devis
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a href="#bulk">
                  <Button size="lg" variant="outline" className="group">
                    <Users className="h-5 w-5 mr-2" />
                    Commandes en gros
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Bulk Orders Section */}
        <section id="bulk" className="py-16 bg-gradient-to-br from-accent/10 via-background to-primary/5">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
                <Users className="h-3 w-3 mr-1" />
                Commandes en gros
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Réductions pour les <span className="text-primary">grandes quantités</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tu commandes pour ton équipe, ton association ou ton entreprise ? Plus tu commandes, plus tu économises !
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {bulkDiscounts.map((tier, index) => (
                <Card key={index} className={`text-center border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${index === 3 ? 'border-primary' : ''}`}>
                  <CardHeader className="pb-2">
                    <div className={`inline-flex items-center justify-center px-4 py-2 rounded-full ${tier.color} font-bold text-lg mx-auto mb-2`}>
                      <Percent className="h-4 w-4 mr-1" />
                      -{tier.discount}
                    </div>
                    <CardTitle className="text-lg">{tier.quantity}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {index === 3 ? "Meilleur rapport qualité-prix !" : "Sur le prix unitaire"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                À partir de <span className="font-bold text-primary">50 articles</span>, tu bénéficies automatiquement d'une réduction !
              </p>
              <a href="#devis">
                <Button size="lg" className="group">
                  Demander un devis personnalisé
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
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

        {/* Quote Form Section */}
        <section id="devis" className="py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                  <Send className="h-3 w-3 mr-1" />
                  Devis gratuit
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Demande ton devis
                </h2>
                <p className="text-muted-foreground">
                  Remplis le formulaire et on te répond sous 24-48h avec un devis personnalisé. C'est gratuit et sans engagement !
                </p>
              </div>

              <Card className="border-2">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input
                          id="name"
                          placeholder="Jean Dupont"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="jean@exemple.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+33 6 12 34 56 78"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantité estimée *</Label>
                        <Select
                          value={formData.quantity}
                          onValueChange={(value) => setFormData({ ...formData, quantity: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionne une quantité" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 articles</SelectItem>
                            <SelectItem value="11-49">11-49 articles</SelectItem>
                            <SelectItem value="50-99">50-99 articles (-10%)</SelectItem>
                            <SelectItem value="100-249">100-249 articles (-15%)</SelectItem>
                            <SelectItem value="250-499">250-499 articles (-20%)</SelectItem>
                            <SelectItem value="500+">500+ articles (-25%)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="productType">Type de produit *</Label>
                      <Select
                        value={formData.productType}
                        onValueChange={(value) => setFormData({ ...formData, productType: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionne un type de produit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tshirt">T-shirts</SelectItem>
                          <SelectItem value="hoodie">Hoodies / Pulls</SelectItem>
                          <SelectItem value="bonnet">Bonnets / Casquettes</SelectItem>
                          <SelectItem value="accessoires">Autres accessoires</SelectItem>
                          <SelectItem value="mix">Mix de produits</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Décris ton projet *</Label>
                      <Textarea
                        id="description"
                        placeholder="Décris ton projet : couleurs souhaitées, design (tu peux nous envoyer une image par email), tailles nécessaires, deadline, etc."
                        className="min-h-[120px]"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      />
                    </div>

                    <div className="bg-secondary/30 rounded-lg p-4 flex items-start gap-3">
                      <Upload className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">Tu as déjà un design ?</p>
                        <p>Envoie-le par email à <a href="mailto:contact@chillaxprints.com" className="text-primary hover:underline">contact@chillaxprints.com</a> en mentionnant ton nom.</p>
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full group" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Envoi en cours..."
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Envoyer ma demande de devis
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-secondary/20">
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
        <section className="py-16">
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
                <a href="#devis">
                  <Button size="lg" variant="secondary" className="group">
                    Demander un devis
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
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
