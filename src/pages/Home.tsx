import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Truck, Heart, Shield, Instagram, ShoppingBag, Star, Quote, Users, Package, ThumbsUp, Globe, Gift } from "lucide-react";
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
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { LoyaltyInfoCard } from "@/components/LoyaltyCard";
import heroImage from "@/assets/hero-chill.jpg";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import lifestyle3 from "@/assets/lifestyle-3.jpg";
import social1 from "@/assets/social-1.jpg";
import social2 from "@/assets/social-2.jpg";
import chillHoodie from "@/assets/products/chill-mode-hoodie.jpg";
import lazyTshirt from "@/assets/products/lazy-legendary-tshirt.jpg";
import lazyShoes from "@/assets/products/lazy-steps-shoes.jpg";
import pasPresse from "@/assets/products/pas-presse-hoodie.jpg";
import sarcasmTshirt from "@/assets/products/sarcasm-cardio-tshirt.jpg";
import winterBonnet from "@/assets/products/winter-chill-bonnet.jpg";

const Home = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
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

  const categories = [
    { name: "T-Shirts", image: lazyTshirt, link: "/boutique?category=tshirts", emoji: "👕" },
    { name: "Hoodies", image: chillHoodie, link: "/boutique?category=hoodies", emoji: "🧥" },
    { name: "Bonnets", image: winterBonnet, link: "/boutique?category=bonnets", emoji: "🧢" },
    { name: "Chaussures", image: lazyShoes, link: "/boutique?category=shoes", emoji: "👟" },
  ];

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

  const testimonials = [
    {
      text: "Meilleur hoodie ever. Je vis dedans maintenant. 10/10 pour la flemme stylée.",
      author: "Marc D.",
      location: "Paris, France",
      avatar: "🧔",
      rating: 5,
      product: "Chill Mode Hoodie",
    },
    {
      text: "J'ai acheté 3 t-shirts. Mon entourage dit que je suis sarcastique maintenant. Merci ChillaxPrints 😂",
      author: "Sophie L.",
      location: "Lyon, France",
      avatar: "👩",
      rating: 5,
      product: "Collection T-Shirts",
    },
    {
      text: "Confortable, drôle, et les compliments pleuvent. Que demander de plus?",
      author: "Thomas R.",
      location: "Bruxelles, Belgique",
      avatar: "🧑",
      rating: 5,
      product: "Lazy Legendary T-Shirt",
    },
    {
      text: "Le bonnet parfait pour l'hiver. Chaud, stylé, et il fait rire. Love it!",
      author: "Emma P.",
      location: "Genève, Suisse",
      avatar: "👱‍♀️",
      rating: 5,
      product: "Winter Chill Bonnet",
    },
    {
      text: "Qualité au top et livraison rapide. Le hoodie est devenu mon uniforme de télétravail!",
      author: "Lucas M.",
      location: "Bordeaux, France",
      avatar: "👨‍💻",
      rating: 5,
      product: "Pas Pressé Hoodie",
    },
    {
      text: "Les designs sont vraiment originaux. Je reçois des compliments à chaque fois que je porte mes chaussures!",
      author: "Clara V.",
      location: "Montréal, Canada",
      avatar: "👩‍🎨",
      rating: 5,
      product: "Lazy Steps Shoes",
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
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 opacity-20">
          <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent" />
        
        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
          {/* Left: Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Nouveauté : Collection Hiver 2025</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Lazy but{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Legendary
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              Le confort rencontre l'humour. Des vêtements pour ceux qui assument leur flemme avec style. 
              Parce que pourquoi se presser quand on peut rester chill? 😎
            </p>

            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                🌍 Livraison Internationale
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                ✨ Qualité Premium
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                😊 Satisfaction Garantie
              </Badge>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/boutique">
                  Découvrir la Boutique <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <a href="#best-sellers">Voir les Best Sellers</a>
              </Button>
            </div>
          </div>

          {/* Right: Floating Images */}
          <div className="relative hidden lg:block h-[600px] animate-scale-in">
            <div className="absolute top-0 right-0 w-80 h-96 rounded-2xl overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-500 hover:scale-105">
              <img src={heroImage} alt="Chill lifestyle" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 w-64 h-80 rounded-2xl overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-500 hover:scale-105 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <img src={lifestyle1} alt="Lifestyle" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-all duration-500 hover:scale-105 animate-fade-in border-4 border-background" style={{ animationDelay: "0.4s" }}>
              <img src={lifestyle2} alt="Coffee time" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-y border-border/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/20 rounded-full mb-3">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-foreground">
                <AnimatedCounter end={2500} suffix="+" />
              </div>
              <p className="text-muted-foreground font-medium">Clients Satisfaits</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/20 rounded-full mb-3">
                <Package className="w-7 h-7 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-foreground">
                <AnimatedCounter end={5000} suffix="+" />
              </div>
              <p className="text-muted-foreground font-medium">Produits Vendus</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/20 rounded-full mb-3">
                <ThumbsUp className="w-7 h-7 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-foreground">
                <AnimatedCounter end={98} suffix="%" />
              </div>
              <p className="text-muted-foreground font-medium">Taux de Satisfaction</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/20 rounded-full mb-3">
                <Globe className="w-7 h-7 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-foreground">
                <AnimatedCounter end={35} suffix="+" />
              </div>
              <p className="text-muted-foreground font-medium">Pays Livrés</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why ChillaxPrints Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Pourquoi <span className="text-primary">ChillaxPrints</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Parce qu'on comprend que le confort et l'humour sont les vrais luxes de la vie
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-2 animate-fade-in border-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <reason.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{reason.title}</h3>
                  <p className="text-muted-foreground">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Carousel */}
      <section id="best-sellers" className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <Badge className="px-4 py-2">🔥 Produits Populaires</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">Best Sellers</h2>
            <p className="text-xl text-muted-foreground">
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

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Explorer par Catégorie</h2>
            <p className="text-xl text-muted-foreground">
              Trouve ton style chill parfait
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group block animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="overflow-hidden border-2 hover:border-primary hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="text-4xl mb-2">{category.emoji}</div>
                      <h3 className="text-2xl font-bold text-foreground">{category.name}</h3>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Univers - Bento Grid */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/5">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Notre Univers</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un style de vie où le confort rencontre l'humour, et où la flemme devient un art de vivre
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Large text card */}
            <Card className="md:col-span-2 md:row-span-2 border-2 bg-gradient-to-br from-primary/10 to-accent/10">
              <CardContent className="p-12 h-full flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  "Pas besoin de te presser… mais ton hoodie préféré t'attend 😎"
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Chez ChillaxPrints, on célèbre la philosophie du "prends ton temps". 
                  Nos designs humoristiques et sarcastiques sont faits pour ceux qui 
                  comprennent que la vie est trop courte pour être stressé.
                </p>
                <Button asChild size="lg" className="w-fit">
                  <Link to="/a-propos">
                    En savoir plus <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Image cards */}
            <Card className="overflow-hidden border-2 group">
              <div className="relative h-64 md:h-full">
                <img
                  src={lifestyle1}
                  alt="Lifestyle"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </Card>

            <Card className="overflow-hidden border-2 group">
              <div className="relative h-64 md:h-full">
                <img
                  src={lifestyle2}
                  alt="Coffee time"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </Card>

            <Card className="overflow-hidden border-2 group md:col-span-2">
              <div className="relative h-64">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-primary">+500 clients satisfaits</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">Ce qu'ils disent</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              La communauté chill a la parole. Des vrais avis de vrais fans de la flemme stylée.
            </p>
          </div>

          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 5000 })]}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="border-2 h-full hover:border-primary/50 hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Quote icon */}
                      <Quote className="w-8 h-8 text-primary/30 mb-4" />
                      
                      {/* Rating */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                        ))}
                      </div>
                      
                      {/* Testimonial text */}
                      <p className="text-foreground/90 mb-6 flex-grow leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      
                      {/* Product badge */}
                      <Badge variant="secondary" className="mb-4 w-fit text-xs">
                        {testimonial.product}
                      </Badge>
                      
                      {/* Author info */}
                      <div className="flex items-center gap-3 pt-4 border-t">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
          </Carousel>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex -space-x-2">
                {["🧔", "👩", "🧑", "👱‍♀️"].map((emoji, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border-2 border-background text-sm">
                    {emoji}
                  </div>
                ))}
              </div>
              <span className="text-sm">+500 clients heureux</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.9/5 satisfaction</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm">Avis vérifiés</span>
            </div>
          </div>
        </div>
      </section>

      {/* Loyalty Program Section - Only for logged-in users or as teaser */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Gift className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Récompenses exclusives</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Gagne des points, <span className="text-primary">profite des avantages</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Chaque achat te rapproche de réductions exclusives et d'avantages VIP. Plus tu achètes, plus tu économises !
            </p>
          </div>

          {user ? (
            <div className="max-w-3xl mx-auto">
              <LoyaltyInfoCard />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <LoyaltyInfoCard />
              <div className="text-center mt-8">
                <Button asChild size="lg">
                  <Link to="/connexion">
                    Rejoindre le programme <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Instagram / Social Proof */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <Instagram className="w-12 h-12 mx-auto text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold">Rejoins la Communauté</h2>
            <p className="text-xl text-muted-foreground">
              Partage ton style chill avec #ChillaxPrints
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[social1, social2, lifestyle1, lifestyle2, lifestyle3, heroImage].map((img, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <img
                  src={img}
                  alt={`Community ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="w-12 h-12 text-background" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 w-5 h-5" />
                Suivre sur Instagram
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="CTA Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/80 backdrop-blur-sm" />
        </div>

        <div className="container relative z-10 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold text-background">
            Prêt à rejoindre le club des Chill?
          </h2>
          <p className="text-xl text-background/90 max-w-2xl mx-auto">
            Découvre nos designs uniques et commence ta collection de vêtements confortables et humoristiques
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button asChild size="lg" className="text-lg px-8 bg-background text-foreground hover:bg-background/90">
              <Link to="/boutique">
                Explorer la Boutique <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 border-background text-background hover:bg-background/10">
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
