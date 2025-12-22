import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, Users } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Créativité",
      description: "Des designs uniques qui reflètent votre personnalité décontractée",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Authenticité",
      description: "Nous restons fidèles à notre philosophie : être soi-même, sans prise de tête",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Communauté",
      description: "Une famille de passionnés qui célèbrent ensemble l'art de la détente",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="À Propos - Notre Histoire et Nos Valeurs"
        description="Découvrez l'histoire de ChillaxPrints, la marque qui célèbre le confort, l'humour et l'authenticité. Nos valeurs : créativité, qualité premium et communauté chill."
        keywords="à propos ChillaxPrints, histoire marque vêtements, valeurs entreprise, mode confortable, philosophie lazy lifestyle"
        canonicalUrl="/a-propos"
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              L'art de ne rien faire, <span className="text-primary">avec style</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez l'histoire de ChillaxPrints et notre mission de célébrer 
              le confort, l'humour et l'authenticité
            </p>
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre Histoire</h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    ChillaxPrints est né d'une simple observation : pourquoi prendre la vie 
                    trop au sérieux quand on peut la vivre avec humour et décontraction ?
                  </p>
                  <p>
                    Tout a commencé avec une passion pour les vêtements confortables et 
                    des phrases qui font sourire. Nous avons voulu créer une marque qui 
                    célèbre ceux qui préfèrent un bon canapé à une salle de sport, et qui 
                    considèrent le sarcasme comme un art de vivre.
                  </p>
                  <p>
                    Aujourd'hui, ChillaxPrints est devenu bien plus qu'une simple boutique : 
                    c'est une communauté de personnes qui assument leur côté paresseux avec 
                    fierté et style.
                  </p>
                </div>
              </div>
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=800&fit=crop"
                  alt="Notre histoire"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Valeurs</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ce qui nous guide au quotidien
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Notre Mission */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre Mission</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Aider les gens à célébrer leur côté chill, un vêtement à la fois.
              </p>
              <p className="text-lg text-muted-foreground">
                Nous croyons que tout le monde mérite de se sentir bien dans ses baskets 
                (même si ces baskets ne servent qu'à aller du canapé au frigo). Notre objectif 
                est de créer des pièces qui vous font sourire, vous mettent à l'aise, et qui 
                reflètent votre personnalité unique.
              </p>
            </div>
          </div>
        </section>

        {/* Comment ça marche - Print on Demand */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça marche ?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Notre modèle Print-on-Demand : créé pour vous, imprimé à la demande
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                  <h3 className="font-bold mb-2">Vous commandez</h3>
                  <p className="text-sm text-muted-foreground">Choisissez vos designs préférés sur notre boutique</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                  <h3 className="font-bold mb-2">Production</h3>
                  <p className="text-sm text-muted-foreground">Votre article est imprimé sur demande avec soin</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                  <h3 className="font-bold mb-2">Contrôle qualité</h3>
                  <p className="text-sm text-muted-foreground">Chaque produit est vérifié avant expédition</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                  <h3 className="font-bold mb-2">Livraison</h3>
                  <p className="text-sm text-muted-foreground">Expédié directement chez vous, partout dans le monde</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 p-6 bg-background rounded-lg border">
              <h3 className="text-xl font-bold mb-4 text-center">Pourquoi le Print-on-Demand ?</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="font-semibold text-primary mb-2">🌱 Éco-responsable</p>
                  <p className="text-sm text-muted-foreground">Pas de surproduction, chaque article est fabriqué à la demande. Moins de gaspillage !</p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-2">🎨 Designs uniques</p>
                  <p className="text-sm text-muted-foreground">Nos créations exclusives, impossibles à trouver ailleurs</p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-2">🌍 Production locale</p>
                  <p className="text-sm text-muted-foreground">Imprimé au plus proche de chez vous pour réduire l'empreinte carbone</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quality & Commitment */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=800&fit=crop"
                  alt="Qualité"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Notre Engagement Qualité
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    Nous travaillons avec des centres de production certifiés répartis dans le monde entier 
                    pour garantir une qualité exceptionnelle sur chaque pièce.
                  </p>
                  <p>
                    Nos centres de production sont sélectionnés pour leur expertise, 
                    leurs équipements de pointe et leur engagement qualité. Que ce soit aux États-Unis, 
                    en Europe ou ailleurs, chaque impression répond à nos standards exigeants.
                  </p>
                  <p>
                    <strong>Techniques d'impression :</strong> DTG (Direct-to-Garment) pour des couleurs vives et durables, 
                    broderie pour un rendu premium, et sublimation pour des designs all-over.
                  </p>
                  <p>
                    Être paresseux ne signifie pas faire des compromis sur la qualité. 
                    Chaque pièce est conçue pour durer, parce que vous n'avez pas envie de faire 
                    du shopping tous les quatre matins 😎
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
