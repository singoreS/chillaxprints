import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Truck, Heart, Shield, Instagram, ShoppingBag, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { getProducts, getAllCollections, ShopifyProduct, ShopifyCollection } from "@/lib/shopify";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { LoyaltyInfoCompact } from "@/components/LoyaltyCard";
import { useAffiliateTracking } from "@/hooks/useAffiliateTracking";
import CustomerReviews from "@/components/CustomerReviews";
import heroBanner from "@/assets/hero-banner.png";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import lifestyle3 from "@/assets/lifestyle-3.jpg";

const Home = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [collectionsLoading, setCollectionsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const addItemToCart = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await getProducts(6);
        setProducts(productsData);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const collectionsData = await getAllCollections();
        setCollections(collectionsData);
      } catch (error) {
        console.error("Error loading collections:", error);
      } finally {
        setCollectionsLoading(false);
      }
    };
    loadCollections();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (variant) {
      addItemToCart({
        product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions,
      });
      toast.success("Produit ajouté au panier !", { position: "top-center" });
    }
  };

  const handleToggleWishlist = (product: ShopifyProduct) => {
    if (isInWishlist(product.node.id)) {
      removeFromWishlist(product.node.id);
      toast.success("Retiré des favoris");
    } else {
      addToWishlist(product);
      toast.success("Ajouté aux favoris");
    }
  };


  const reasons = [
    {
      icon: Sparkles,
      title: "Designs Uniques",
      description: "Des vibes sarcastiques et humoristiques que tu trouveras nulle part ailleurs",
    },
    {
      icon: Truck,
      title: "Livraison Internationale",
      description: "On livre ton confort partout dans le monde 🌍",
    },
    {
      icon: Shield,
      title: "Qualité Premium",
      description: "Doux, confortable, et fait pour durer... même si tu bouges pas du canapé",
    },
    {
      icon: Heart,
      title: "Satisfaction Garantie",
      description: "Pas satisfait ? On te rembourse. Pas de stress, que du chill.",
    },
  ];


  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Vêtements Humoristiques Confortables"
        description="ChillaxPrints - La boutique de vêtements pour ceux qui assument leur flemme avec style. T-shirts, hoodies, bonnets et chaussures avec des designs sarcastiques et humoristiques. Livraison internationale."
        keywords="vêtements confortables, t-shirts humoristiques, hoodies drôles, mode lazy lifestyle, ChillaxPrints, vêtements sarcastiques, streetwear décontracté"
        canonicalUrl="/"
      />
      <Header />
      <main className="flex-1">
      {/* Hero Section - Banner */}
      <section className="w-full">
        <Link to="/boutique" className="block w-full">
          <img 
            src={heroBanner} 
            alt="ChillaxPrints - Exclusive Custom-Designed Clothing" 
            className="w-full h-auto object-cover"
          />
        </Link>
      </section>


      {/* Why ChillaxPrints Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-2 md:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Pourquoi <span className="text-primary">ChillaxPrints</span>?
            </h2>
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Parce qu'on comprend que le confort et l'humour sont les vrais luxes de la vie
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {reasons.map((reason, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-2 animate-fade-in border-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-3 md:p-4 lg:p-6 text-center space-y-2 md:space-y-4">
                  <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <reason.icon className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-primary" />
                  </div>
                  <h3 className="text-sm md:text-lg lg:text-xl font-semibold">{reason.title}</h3>
                  <p className="text-xs md:text-sm lg:text-base text-muted-foreground hidden sm:block">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Carousel */}
      <section id="best-sellers" className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-2 md:space-y-4">
            <Badge className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm">🔥 Produits Populaires</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Best Sellers</h2>
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground">
              Les favoris de la communauté chill
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <Skeleton className="h-80 w-full" />
                  <CardContent className="p-6 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Carousel
              opts={{ align: "start", loop: true }}
              plugins={[Autoplay({ delay: 4000 })]}
              className="w-full"
            >
              <CarouselContent>
                {products.map((product) => (
                  <CarouselItem key={product.node.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="group hover:shadow-[var(--shadow-elegant)] transition-all duration-300 border-2 overflow-hidden">
                      <Link to={`/produit/${product.node.handle}`}>
                        <div className="relative overflow-hidden bg-muted aspect-square">
                          {product.node.images.edges[0] ? (
                            <img
                              src={product.node.images.edges[0].node.url}
                              alt={product.node.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-muted-foreground">No image</span>
                            </div>
                          )}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleToggleWishlist(product);
                            }}
                            className="absolute top-4 right-4 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-all hover:scale-110"
                          >
                            <Heart
                              className={`w-5 h-5 ${
                                isInWishlist(product.node.id)
                                  ? "fill-primary text-primary"
                                  : "text-foreground"
                              }`}
                            />
                          </button>
                        </div>
                      </Link>
                      <CardContent className="p-6">
                        <Link to={`/produit/${product.node.handle}`}>
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                            {product.node.title}
                          </h3>
                        </Link>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold text-primary">
                            {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}€
                          </p>
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            Ajouter
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          )}
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-2 md:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Explorer par Collection</h2>
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground">
              Découvre nos univers uniques
            </p>
          </div>

          {collectionsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="overflow-hidden border-2">
                  <Skeleton className="h-48 sm:h-56 md:h-64 lg:h-72 w-full" />
                </Card>
              ))}
            </div>
          ) : collections.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucune collection disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {collections.slice(0, 3).map((collection, index) => (
                <Link
                  key={collection.id}
                  to={`/collection/${collection.handle}`}
                  className="group block animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="overflow-hidden border-2 hover:border-primary hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
                    <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden bg-muted">
                      {collection.image ? (
                        <img
                          src={collection.image.url}
                          alt={collection.image.altText || collection.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1 md:mb-2">
                          {collection.title}
                        </h3>
                        {collection.description && (
                          <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
                            {collection.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Notre Univers - Bento Grid */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-accent/5">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-2 md:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Notre Univers</h2>
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Un style de vie où le confort rencontre l'humour, et où la flemme devient un art de vivre
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Large text card */}
            <Card className="md:col-span-2 md:row-span-2 border-2 bg-gradient-to-br from-primary/10 to-accent/10">
              <CardContent className="p-6 md:p-8 lg:p-12 h-full flex flex-col justify-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight">
                  "Pas besoin de te presser… mais ton hoodie préféré t'attend 😎"
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-4 md:mb-6">
                  Chez ChillaxPrints, on célèbre la philosophie du "prends ton temps". 
                  Nos designs humoristiques et sarcastiques sont faits pour ceux qui 
                  comprennent que la vie est trop courte pour être stressé.
                </p>
                <Button asChild size="default" className="w-fit text-sm md:text-base">
                  <Link to="/a-propos">
                    En savoir plus <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Image cards */}
            <Card className="overflow-hidden border-2 group hidden md:block">
              <div className="relative h-48 md:h-full min-h-[150px]">
                <img
                  src={lifestyle1}
                  alt="Lifestyle"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </Card>

            <Card className="overflow-hidden border-2 group hidden md:block">
              <div className="relative h-48 md:h-full min-h-[150px]">
                <img
                  src={lifestyle2}
                  alt="Coffee time"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </Card>

            <Card className="overflow-hidden border-2 group md:col-span-2 hidden md:block">
              <div className="relative h-48 md:h-64">
                <img
                  src={lifestyle3}
                  alt="Comfortable shoes"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>


      {/* Loyalty Program Section - Compact */}
      <section className="py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <LoyaltyInfoCompact />
        </div>
      </section>

      {/* Customer Reviews Section */}
      <CustomerReviews showTitle={true} maxReviews={4} />

      {/* Final CTA */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="CTA Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/80 backdrop-blur-sm" />
        </div>

        <div className="container relative z-10 text-center space-y-4 md:space-y-6 lg:space-y-8 px-4 md:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-background">
            Prêt à rejoindre le club des Chill?
          </h2>
          <p className="text-sm md:text-lg lg:text-xl text-background/90 max-w-2xl mx-auto">
            Découvre nos designs uniques et commence ta collection de vêtements confortables et humoristiques
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-2 md:pt-4">
            <Button asChild size="default" className="text-sm md:text-base lg:text-lg px-4 md:px-6 lg:px-8 bg-background text-foreground hover:bg-background/90">
              <Link to="/boutique">
                Explorer la Boutique <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </Button>
            <Button asChild size="default" variant="outline" className="text-sm md:text-base lg:text-lg px-4 md:px-6 lg:px-8 border-background text-background hover:bg-background/10">
              <Link to="/a-propos">
                Notre Histoire
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

export default Home;
