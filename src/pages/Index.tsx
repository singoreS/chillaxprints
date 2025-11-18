import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ShoppingCart, ArrowRight } from "lucide-react";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        // Load first 4 products as featured
        const products = await getProducts(4);
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadFeaturedProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const firstVariant = product.node.variants.edges[0]?.node;
    if (!firstVariant) return;

    const cartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Ajouté au panier !", {
      description: product.node.title,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/20 via-background to-accent/20 py-20 md:py-32">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Lazy but Legendary
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Pas besoin de te presser… mais ton hoodie préféré t'attend 😎
              </p>
              <p className="text-lg text-muted-foreground">
                Sarcasm is my cardio. Découvre notre collection de vêtements pour ceux qui prennent la vie du bon côté.
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button asChild size="lg">
                  <Link to="/boutique">
                    Découvrir la boutique
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Produits Vedettes</h2>
              <p className="text-lg text-muted-foreground">
                Nos pièces les plus populaires – parce que même les légendes ont besoin de style
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-square bg-muted animate-pulse" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                      <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <Card key={product.node.id} className="overflow-hidden group hover:shadow-lg transition-all">
                    <Link to={`/produit/${product.node.handle}`}>
                      <div className="relative aspect-square overflow-hidden bg-secondary/20">
                        {product.node.images?.edges?.[0]?.node && (
                          <img
                            src={product.node.images.edges[0].node.url}
                            alt={product.node.images.edges[0].node.altText || product.node.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <Link to={`/produit/${product.node.handle}`}>
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                          {product.node.title}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-primary">
                          {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)} {product.node.priceRange.minVariantPrice.currencyCode}
                        </p>
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
                          }}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Ajouter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Aucun produit disponible pour le moment
                </p>
              </div>
            )}

            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link to="/boutique">
                  Voir tous les produits
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Brand Universe */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Notre Univers</h2>
                <p className="text-lg text-muted-foreground">
                  ChillaxPrints, c'est l'art de vivre décontracté avec style. On célèbre la paresse comme une forme de sagesse, 
                  le sarcasme comme un sport, et le confort comme une priorité absolue.
                </p>
                <p className="text-lg text-muted-foreground">
                  Nos vêtements sont conçus pour ceux qui savent que prendre son temps n'est pas de la paresse, 
                  c'est de l'intelligence. Parce qu'être chill, c'est aussi être légendaire.
                </p>
                <Button asChild size="lg">
                  <Link to="/a-propos">
                    En savoir plus
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-6xl font-bold text-primary/20">ChillaxPrints</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Prêt à rejoindre la team chill ? 😴
              </h2>
              <p className="text-lg text-muted-foreground">
                Pas besoin de courir, mais cette collection ne dure pas éternellement
              </p>
              <Button asChild size="lg">
                <Link to="/boutique">
                  Découvrir la collection
                  <ArrowRight className="ml-2 h-5 w-5" />
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

export default Index;
