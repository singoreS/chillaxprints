import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { toast } from "sonner";
import { ShoppingCart, Loader2, Heart } from "lucide-react";

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const addToCart = useCartStore(state => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  const categories = [
    { value: "all", label: "Tous les produits" },
    { value: "T-Shirts", label: "T-Shirts" },
    { value: "Hoodies", label: "Hoodies" },
    { value: "Bonnets", label: "Bonnets" },
    { value: "Chaussures", label: "Chaussures" },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const shopifyProducts = await getProducts(20);
        setProducts(shopifyProducts);
        setFilteredProducts(shopifyProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(product => product.node.productType === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  const handleAddToCart = (product: ShopifyProduct) => {
    const firstVariant = product.node.variants.edges[0]?.node;
    if (!firstVariant) {
      toast.error("Variante non disponible");
      return;
    }

    const cartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    };

    addToCart(cartItem);
    toast.success("Produit ajouté au panier");
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(24_100%_50%/0.08),transparent_60%)]" />
          <div className="container text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Notre <span className="text-primary">Boutique</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              Pas besoin de courir, mais cette collection ne dure pas éternellement 😴
            </p>
            <Badge variant="secondary" className="text-base py-3 px-6 shadow-[var(--shadow-soft)] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              🎉 -15% sur votre première commande avec le code: CHILL15
            </Badge>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/20">
          <div className="container">
            {/* Category Filters */}
            <div className="mb-12">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:w-auto shadow-[var(--shadow-soft)] p-1.5">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category.value} 
                      value={category.value}
                      className="data-[state=active]:shadow-[var(--shadow-soft)]"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">Aucun produit trouvé</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <Card 
                    key={product.node.id} 
                    className="group overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all duration-500 hover:-translate-y-2 bg-[var(--gradient-card)] border-border/50 animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${(index % 3) * 100}ms`, animationDuration: '700ms' }}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <Link to={`/produit/${product.node.handle}`}>
                          <div className="aspect-square bg-secondary/20 overflow-hidden relative">
                            {product.node.images?.edges?.[0]?.node && (
                              <img
                                src={product.node.images.edges[0].node.url}
                                alt={product.node.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 bg-background/90 hover:bg-background shadow-[var(--shadow-soft)] backdrop-blur-sm"
                          onClick={() => handleToggleWishlist(product)}
                        >
                          <Heart
                            className={`w-5 h-5 transition-all ${
                              isInWishlist(product.node.id)
                                ? "fill-accent text-accent scale-110"
                                : "text-foreground"
                            }`}
                          />
                        </Button>
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-xl mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {product.node.title}
                        </h3>
                        <p className="text-primary font-bold text-2xl mb-6">
                          {product.node.priceRange.minVariantPrice.currencyCode}{" "}
                          {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                        </p>
                        <Button 
                          onClick={() => handleAddToCart(product)} 
                          className="w-full py-6 text-base shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:scale-[1.02] transition-all"
                        >
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Ajouter au panier
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
