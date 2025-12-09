import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Clock, Linkedin, Instagram, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis").max(100, "Le nom ne peut pas dépasser 100 caractères"),
  email: z.string().trim().email("Email invalide").max(255, "L'email ne peut pas dépasser 255 caractères"),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères").max(2000, "Le message ne peut pas dépasser 2000 caractères"),
});

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate with Zod
    try {
      contactSchema.parse(formData);
      
      toast({
        title: "Message envoyé ! 📨",
        description: "On répond vite… sauf si on fait la sieste 😴",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erreur de validation",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  const faqs = [
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Livraison sous 3-5 jours ouvrés en France métropolitaine",
    },
    {
      question: "Comment puis-je retourner un produit ?",
      answer: "Retours gratuits sous 30 jours, sans question posée",
    },
    {
      question: "Les vêtements sont-ils de bonne qualité ?",
      answer: "100% ! Matériaux premium et confort garanti",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Contactez-Nous - Service Client"
        description="Besoin d'aide ? Contactez l'équipe ChillaxPrints par email. Réponse rapide garantie. FAQ, horaires et informations de contact."
        keywords="contact ChillaxPrints, service client, aide commande, question livraison, support client"
        canonicalUrl="/contact"
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-10 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-6">Contactez-nous</h1>
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              On répond vite… sauf si on fait la sieste 😴
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-10 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
              {/* Form */}
              <Card>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl lg:text-2xl">Envoyez-nous un message</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2">
                        Nom complet
                      </label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Votre nom"
                        required
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="votre@email.com"
                        required
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Votre message..."
                        rows={4}
                        required
                        className="text-sm"
                      />
                    </div>
                    <Button type="submit" className="w-full text-sm md:text-base" size="default">
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-4 md:space-y-6">
                <Card>
                  <CardContent className="p-4 md:p-6 flex items-start space-x-3 md:space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm md:text-lg mb-1 md:mb-2">Email</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">contact@chillaxprints.com</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 md:p-6 flex items-start space-x-3 md:space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm md:text-lg mb-1 md:mb-2">Horaires</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Lundi - Vendredi : 9h - 18h
                        <br />
                        (Sauf pendant la sieste)
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 md:p-6 flex items-start space-x-3 md:space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm md:text-lg mb-1 md:mb-2">Réseaux Sociaux</h3>
                      <div className="flex space-x-3 md:space-x-4 mt-2 md:mt-3">
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
                        </a>
                        <a
                          href="https://instagram.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Instagram className="h-5 w-5 md:h-6 md:w-6" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-10 md:py-16 lg:py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary/20 rounded-full mb-4 md:mb-6">
                <HelpCircle className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Avant de nous contacter...</h2>
              <p className="text-sm md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 md:mb-6">
                Consultez notre FAQ ! Vous y trouverez peut-être la réponse à votre question.
              </p>
              <Button asChild size="default" className="bg-primary hover:bg-primary/90 text-sm md:text-base">
                <Link to="/faq">
                  <HelpCircle className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Consulter la FAQ complète
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
              <p className="text-center text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">Aperçu des questions fréquentes :</p>
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-4 md:p-6">
                    <h3 className="font-semibold text-sm md:text-lg mb-1 md:mb-2">{faq.question}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
              <div className="text-center pt-3 md:pt-4">
                <Link to="/faq" className="text-primary hover:underline inline-flex items-center gap-1 text-sm md:text-base">
                  Voir toutes les questions
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
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

export default Contact;
