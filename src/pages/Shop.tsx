import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ShoppingCart, Loader2 } from "lucide-react";

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const shopifyProducts = await getProducts(20);
        setProducts(shopifyProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
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
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Notre Boutique</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Pas besoin de courir, mais cette collection ne dure pas éternellement 😴
            </p>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              🎉 -15% sur votre première commande avec le code: CHILL15
            </Badge>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12">
          <div className="container">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-4">
                  Aucun produit disponible pour le moment
                </p>
                <p className="text-muted-foreground">
                  Créez vos premiers produits pour commencer à vendre !
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card key={product.node.id} className="overflow-hidden group hover:shadow-lg transition-all">
                    <Link to={`/produit/${product.node.handle}`}>
                      <div className="relative aspect-square overflow-hidden">
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
                          Panier
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
