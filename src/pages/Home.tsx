import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Quote, ShoppingBag, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { toast } from "sonner";

const Home = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItemToCart = useCartStore(state => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

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
        selectedOptions: variant.selectedOptions
      });
      toast.success("Produit ajouté au panier !", {
        position: "top-center",
      });
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
        <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(24_100%_50%/0.05),transparent_50%)]" />
          <div className="container text-center space-y-8 z-10 py-20">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Lazy but <span className="text-primary">Legendary</span>
            </h1>
            <p className="text-xl md:text-3xl text-muted-foreground max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              Des vêtements confortables et humoristiques pour célébrer votre côté chill 🎯
            </p>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Link to="/boutique">
                <Button size="lg" className="text-lg px-10 py-7 shadow-[var(--shadow-hover)] hover:scale-105 transition-all">
                  Découvrir la boutique
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-24 bg-background">
          <div className="container">
            <div className="text-center mb-16 animate-in fade-in duration-1000">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Nos <span className="text-primary">Best Sellers</span>
              </h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                Les produits préférés de notre communauté chill
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-muted h-80 rounded-2xl mb-4"></div>
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <Card
                    key={product.node.id}
                    className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-[var(--shadow-hover)] animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
                      <Link to={`/produit/${product.node.handle}`}>
                        {product.node.images.edges[0] ? (
                          <img
                            src={product.node.images.edges[0].node.url}
                            alt={product.node.title}
                            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-80 flex items-center justify-center bg-muted/20">
                            <span className="text-muted-foreground">No image</span>
                          </div>
                        )}
                      </Link>
                      <button
                        onClick={() => handleToggleWishlist(product)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-300 hover:scale-110 shadow-lg"
                      >
                        <Heart
                          className={`h-5 w-5 transition-colors ${
                            isInWishlist(product.node.id)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground hover:text-primary"
                          }`}
                        />
                      </button>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <Link to={`/produit/${product.node.handle}`}>
                        <h3 className="font-bold text-xl group-hover:text-primary transition-colors line-clamp-1">
                          {product.node.title}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                        {product.node.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-2xl font-bold text-primary">
                          {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)} €
                        </span>
                        <Button
                          onClick={() => handleAddToCart(product)}
                          size="lg"
                          className="shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:scale-105"
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Ajouter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="text-center mt-12 animate-in fade-in duration-1000 delay-500">
              <Link to="/boutique">
                <Button size="lg" variant="outline" className="px-10 py-6 text-lg">
                  Voir tous les produits
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Univers de la marque */}
        <section className="py-24 bg-gradient-to-b from-background to-muted/30">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6 animate-in fade-in slide-in-from-left duration-1000">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  L'art de ne rien faire, <span className="text-primary">avec style</span>
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p className="text-xl">
                    ChillaxPrints est né de l'amour du confort, de l'humour et d'un brin de sarcasme. 
                    Notre mission ? Vous aider à célébrer votre côté chill, un vêtement à la fois.
                  </p>
                  <p>
                    Parce que la vie est trop courte pour être sérieux tout le temps, nous créons des 
                    pièces qui reflètent votre personnalité décontractée et votre sens de l'humour unique.
                  </p>
                  <p className="font-semibold text-foreground text-xl">
                    Pas besoin de te presser… mais ton hoodie préféré t'attend 😎
                  </p>
                </div>
                <Link to="/a-propos" className="inline-block mt-8">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                    En savoir plus
                  </Button>
                </Link>
              </div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-[var(--shadow-hover)] animate-in fade-in slide-in-from-right duration-1000">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop"
                  alt="Notre univers"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16 animate-in fade-in duration-1000">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ce que disent nos clients</h2>
              <p className="text-muted-foreground text-xl">
                Rejoignez notre communauté chill
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card 
                  key={index} 
                  className="p-8 hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-1 bg-[var(--gradient-card)] border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-1000"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-0">
                    <Quote className="h-10 w-10 text-primary mb-6 opacity-50" />
                    <p className="text-muted-foreground mb-6 text-lg leading-relaxed italic">{testimonial.text}</p>
                    <p className="font-semibold text-lg text-primary">— {testimonial.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24">
          <div className="container">
            <div className="relative bg-[var(--gradient-card)] rounded-3xl p-16 text-center overflow-hidden shadow-[var(--shadow-hover)] border border-border/50 animate-in fade-in zoom-in-95 duration-1000">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(24_100%_50%/0.1),transparent_60%)]" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Prêt à rejoindre la team chill ? 🚀
                </h2>
                <p className="text-muted-foreground text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                  Découvrez notre collection et trouvez le vêtement qui vous ressemble
                </p>
                <Link to="/boutique">
                  <Button size="lg" className="text-xl px-12 py-8 shadow-[var(--shadow-hover)] hover:scale-105 transition-all">
                    Explorer la boutique
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

export default Home;
