import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Quote } from "lucide-react";

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Hoodie 'Lazy Legend'",
      price: "49.99€",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
    },
    {
      id: 2,
      name: "T-shirt 'Sarcasm is my cardio'",
      price: "24.99€",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    },
    {
      id: 3,
      name: "Bonnet 'Chill Mode'",
      price: "19.99€",
      image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&h=500&fit=crop",
    },
  ];

  const testimonials = [
    {
      text: "J'adore mes nouveaux t-shirts ! Parfaits pour ne rien faire avec style 😎",
      author: "Sarah M.",
    },
    {
      text: "Le hoodie le plus confortable que j'ai jamais eu. Je ne le quitte plus !",
      author: "Thomas L.",
    },
    {
      text: "Des designs hilarants et une qualité au top. Je recommande à 100% !",
      author: "Julie B.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container text-center space-y-6 z-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Lazy but <span className="text-primary">Legendary</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Des vêtements confortables et humoristiques pour célébrer votre côté chill
            </p>
            <Link to="/boutique">
              <Button size="lg" className="text-lg px-8 py-6">
                Découvrir la boutique
              </Button>
            </Link>
          </div>
        </section>

        {/* Produits Populaires */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Produits Vedettes</h2>
              <p className="text-muted-foreground text-lg">
                Les favoris de notre communauté
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-2xl font-bold text-primary">{product.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link to="/boutique">
                <Button variant="outline" size="lg">
                  Voir tous les produits
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Univers de la marque */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  L'art de ne rien faire, <span className="text-primary">avec style</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  ChillaxPrints est né de l'amour du confort, de l'humour et d'un brin de sarcasme. 
                  Notre mission ? Vous aider à célébrer votre côté chill, un vêtement à la fois.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  Parce que la vie est trop courte pour être sérieux tout le temps, nous créons des 
                  pièces qui reflètent votre personnalité décontractée et votre sens de l'humour unique.
                </p>
                <Link to="/a-propos">
                  <Button variant="outline">En savoir plus</Button>
                </Link>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop"
                  alt="Notre univers"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que disent nos clients</h2>
              <p className="text-muted-foreground text-lg">
                Rejoignez notre communauté chill
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="relative">
                  <CardContent className="p-6">
                    <Quote className="h-8 w-8 text-primary/20 mb-4" />
                    <p className="text-lg mb-4 italic">{testimonial.text}</p>
                    <p className="font-semibold text-primary">— {testimonial.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à rejoindre la team chill ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Découvrez notre collection et trouvez le vêtement qui vous ressemble
            </p>
            <Link to="/boutique">
              <Button size="lg" className="text-lg px-8 py-6">
                Explorer la boutique
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
