import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Coffee, Shirt, Sparkles, Moon, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllCollections, ShopifyCollection } from "@/lib/shopify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

// Themed collections with Pinterest-optimized descriptions
const THEMED_COLLECTIONS = [
  {
    id: "coffee-lovers",
    title: "Coffee Hoodies",
    subtitle: "Pour les accros à la caféine",
    description: "Hoodies et sweats pour amateurs de café. Designs humoristiques parfaits pour les matins difficiles et les pauses café bien méritées. Streetwear cozy pour cafeinomanes assumés.",
    icon: Coffee,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    keywords: ["hoodie café", "sweat coffee lover", "vêtement caféine", "streetwear café"],
    searchQuery: "coffee OR café OR caféine",
  },
  {
    id: "lazy-lifestyle",
    title: "Lazy T-Shirts",
    subtitle: "L'art de ne rien faire, avec style",
    description: "T-shirts pour les maîtres de la procrastination. Designs sarcastiques et phrases cultes pour ceux qui assument leur flemme légendaire. Confort premium pour journées canapé.",
    icon: Moon,
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/30",
    keywords: ["t-shirt lazy", "tee-shirt humour", "vêtement flemme", "mode détente"],
    searchQuery: "lazy OR flemme OR chill",
  },
  {
    id: "funny-streetwear",
    title: "Funny Sweatshirts",
    subtitle: "L'humour se porte bien",
    description: "Sweatshirts avec messages drôles et designs décalés. Mode streetwear humoristique pour les esprits libres qui aiment faire sourire. Collection sarcasme et bonne humeur garantis.",
    icon: Zap,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    keywords: ["sweatshirt drôle", "pull humour", "streetwear fun", "mode sarcastique"],
    searchQuery: "funny OR drôle OR humour OR sarcasme",
  },
  {
    id: "cozy-essentials",
    title: "Cozy Essentials",
    subtitle: "Le confort avant tout",
    description: "Les essentiels du confort ultime. Hoodies oversize, bonnets douillets et accessoires cozy pour les amateurs de détente. Qualité premium pour moments chill.",
    icon: Sparkles,
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    keywords: ["vêtement cozy", "hoodie oversize", "mode confort", "accessoires détente"],
    searchQuery: "cozy OR confort OR oversize",
  },
];

const Collections = () => {
  const [shopifyCollections, setShopifyCollections] = useState<ShopifyCollection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const data = await getAllCollections();
        setShopifyCollections(data);
      } catch (error) {
        console.error("Error loading collections:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCollections();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Collections | Streetwear Humoristique & Cozy"
        description="Découvrez nos collections thématiques : Coffee Hoodies pour les accros à la caféine, Lazy T-Shirts pour les procrastinateurs stylés, Funny Sweatshirts pour les esprits libres. Streetwear humoristique et confortable."
        keywords="collection streetwear, hoodies café, t-shirts humour, sweatshirts drôles, mode lazy lifestyle, vêtements cozy, ChillaxPrints collections"
        canonicalUrl="/collections"
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section - Pinterest Optimized */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge className="px-4 py-2">Collections Thématiques</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Streetwear pour{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  esprits libres
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                ChillaxPrints – streetwear humoristique pour amateurs de détente, café et style lazy. 
                Hoodies, t-shirts, accessoires. Créé pour les procrastinateurs stylés.
              </p>
            </div>
          </div>
        </section>

        {/* Themed Collections Grid */}
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {THEMED_COLLECTIONS.map((collection) => {
                const Icon = collection.icon;
                return (
                  <Link 
                    key={collection.id}
                    to={`/collections/${collection.id}`}
                    className="group"
                  >
                    <Card className={`h-full border-2 ${collection.borderColor} hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                      <div className={`bg-gradient-to-br ${collection.color} p-8 md:p-10`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 rounded-2xl bg-background/80 backdrop-blur flex items-center justify-center">
                            <Icon className="w-7 h-7 text-primary" />
                          </div>
                          <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {collection.title}
                        </h2>
                        <p className="text-primary font-medium mb-3">
                          {collection.subtitle}
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {collection.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {collection.keywords.slice(0, 3).map((keyword, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Shopify Collections */}
        {shopifyCollections.length > 0 && (
          <section className="py-12 md:py-16 bg-muted/30">
            <div className="container px-4 md:px-6">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Nos Collections Shopify</h2>
                <p className="text-muted-foreground">Découvrez toutes nos collections disponibles</p>
              </div>
              
              {loading ? (
                <div className="grid md:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-64 rounded-xl" />
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shopifyCollections.map((col) => (
                    <Link 
                      key={col.id}
                      to={`/collection/${col.handle}`}
                      className="group"
                    >
                      <Card className="overflow-hidden border-2 hover:border-primary hover:shadow-lg transition-all duration-300">
                        {col.image && (
                          <div className="aspect-video overflow-hidden">
                            <img 
                              src={col.image.url}
                              alt={col.image.altText || col.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {col.title}
                          </h3>
                          {col.description && (
                            <p className="text-muted-foreground text-sm line-clamp-2">
                              {col.description}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* SEO Content Block */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto prose prose-sm dark:prose-invert">
              <h2 className="text-xl font-bold mb-4">Pourquoi choisir ChillaxPrints ?</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                ChillaxPrints propose une collection unique de streetwear humoristique conçue pour ceux qui 
                valorisent le confort sans sacrifier le style. Nos hoodies café, t-shirts lazy et sweatshirts 
                drôles sont parfaits pour les amateurs de détente, les fans de café et les procrastinateurs assumés.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Chaque pièce est fabriquée avec des matériaux premium pour un confort optimal. Que vous cherchiez 
                un cadeau original ou que vous vouliez simplement exprimer votre personnalité décontractée, 
                nos collections thématiques ont ce qu'il vous faut.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Prêt à adopter le style chill ?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Rejoins la communauté des lazy legends et découvre des vêtements qui te ressemblent.
            </p>
            <Button asChild size="lg">
              <Link to="/boutique">
                Explorer la boutique <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
