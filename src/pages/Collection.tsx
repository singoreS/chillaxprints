import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingBag, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

interface CollectionInfo {
  name: string;
  slug: string;
  description: string;
  tagline: string;
  emoji: string;
  keywords: string[];
}

const collections: Record<string, CollectionInfo> = {
  "no-rush-club": {
    name: "NO RUSH CLUB",
    slug: "no-rush-club",
    description: "Pour ceux qui prennent leur temps et qui l'assument. Pas de stress, pas de pression, juste du chill.",
    tagline: "Prends ton temps, le monde peut attendre 🐌",
    emoji: "🐌",
    keywords: ["no rush", "club", "slow", "chill", "relax"],
  },
  "tired-but-trying": {
    name: "TIRED BUT TRYING",
    slug: "tired-but-trying",
    description: "Fatigué mais toujours debout. Pour les warriors du quotidien qui font de leur mieux.",
    tagline: "Épuisé mais toujours là 💪",
    emoji: "😴",
    keywords: ["tired", "trying", "fatigue", "effort"],
  },
  "soft-chaos": {
    name: "SOFT CHAOS",
    slug: "soft-chaos",
    description: "Le chaos organisé, version confortable. Quand le désordre devient un art de vivre.",
    tagline: "Le chaos, mais en douceur ✨",
    emoji: "🌀",
    keywords: ["soft", "chaos", "messy", "creative"],
  },
};

const Collection = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItemToCart = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  const collection = slug ? collections[slug] : null;

  useEffect(() => {
    const loadProducts = async () => {
      if (!collection) return;
      
      setLoading(true);
      try {
        const allProducts = await getProducts(50);
        
        // Filter products that match collection keywords
        const filteredProducts = allProducts.filter((product) => {
          const title = product.node.title.toLowerCase();
          const description = product.node.description?.toLowerCase() || "";
          const productType = product.node.handle?.toLowerCase() || "";
          
          return collection.keywords.some(
            (keyword) =>
              title.includes(keyword.toLowerCase()) ||
              description.includes(keyword.toLowerCase()) ||
              productType.includes(keyword.toLowerCase())
          );
        });
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, [slug, collection]);

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

  if (!collection) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Collection non trouvée</h1>
          <p className="text-muted-foreground mb-8">Cette collection n'existe pas.</p>
          <Button asChild>
            <Link to="/boutique">Retour à la boutique</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`Collection ${collection.name}`}
        description={collection.description}
        keywords={`collection ${collection.name.toLowerCase()}, vêtements, ChillaxPrints, ${collection.keywords.join(", ")}`}
        canonicalUrl={`/collection/${slug}`}
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container px-4 md:px-6">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            
            <div className="max-w-3xl space-y-4">
              <div className="text-6xl md:text-7xl">{collection.emoji}</div>
              <Badge className="px-4 py-2">Collection</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                {collection.name}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                {collection.tagline}
              </p>
              <p className="text-muted-foreground max-w-2xl">
                {collection.description}
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                {loading ? "Chargement..." : `${products.length} produit${products.length !== 1 ? "s" : ""}`}
              </p>
              <Button variant="outline" asChild>
                <Link to="/boutique">
                  <Filter className="w-4 h-4 mr-2" />
                  Tous les produits
                </Link>
              </Button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <Card key={i}>
                    <Skeleton className="aspect-square w-full" />
                    <CardContent className="p-4 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">{collection.emoji}</div>
                <h3 className="text-xl font-semibold mb-2">Collection en préparation</h3>
                <p className="text-muted-foreground mb-6">
                  Les produits de cette collection arrivent bientôt !
                </p>
                <Button asChild>
                  <Link to="/boutique">Explorer la boutique</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card 
                    key={product.node.id} 
                    className="group hover:shadow-[var(--shadow-elegant)] transition-all duration-300 border-2 overflow-hidden"
                  >
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
                    <CardContent className="p-4 md:p-6">
                      <Link to={`/produit/${product.node.handle}`}>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {product.node.title}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <p className="text-xl md:text-2xl font-bold text-primary">
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
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Other Collections */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Autres Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(collections)
                .filter(([key]) => key !== slug)
                .map(([key, col]) => (
                  <Link 
                    key={key} 
                    to={`/collection/${key}`}
                    className="group"
                  >
                    <Card className="overflow-hidden border-2 hover:border-primary hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
                      <CardContent className="p-6 md:p-8 text-center space-y-4">
                        <div className="text-5xl">{col.emoji}</div>
                        <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                          {col.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {col.tagline}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Collection;
