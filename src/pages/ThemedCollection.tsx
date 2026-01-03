import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingBag, Coffee, Moon, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { searchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

// Themed collection configurations with Pinterest-optimized content
const THEMED_CONFIGS: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: typeof Coffee;
  color: string;
  keywords: string[];
  searchQuery: string;
  metaDescription: string;
}> = {
  "coffee-lovers": {
    title: "Coffee Hoodies",
    subtitle: "Pour les accros à la caféine",
    description: "Hoodies et sweats pour amateurs de café. Designs humoristiques parfaits pour les matins difficiles.",
    longDescription: "Découvrez notre collection de hoodies et sweats inspirés par l'amour du café. Chaque design célèbre la culture café avec humour et style. Parfaits pour les matins difficiles, les pauses café bien méritées et les journées où seule la caféine vous maintient éveillé. Streetwear cozy et confortable pour les vrais cafeinomanes.",
    icon: Coffee,
    color: "from-amber-500/20 to-orange-500/20",
    keywords: ["hoodie café", "sweat coffee lover", "vêtement caféine", "streetwear café", "pull amateur café"],
    searchQuery: "coffee OR café",
    metaDescription: "Hoodies et sweats pour amateurs de café. Designs humoristiques pour les accros à la caféine. Streetwear cozy et confortable. Livraison internationale.",
  },
  "lazy-lifestyle": {
    title: "Lazy T-Shirts",
    subtitle: "L'art de ne rien faire, avec style",
    description: "T-shirts pour les maîtres de la procrastination. Designs sarcastiques pour les flemmes légendaires.",
    longDescription: "La collection ultime pour ceux qui ont élevé la procrastination au rang d'art. Nos t-shirts lazy célèbrent le confort et l'humour avec des designs sarcastiques et des phrases cultes. Parfaits pour les journées canapé, le télétravail décontracté ou simplement pour afficher votre philosophie de vie détendue.",
    icon: Moon,
    color: "from-blue-500/20 to-indigo-500/20",
    keywords: ["t-shirt lazy", "tee-shirt humour", "vêtement flemme", "mode détente", "t-shirt procrastination"],
    searchQuery: "title:*lazy*",
    metaDescription: "T-shirts pour procrastinateurs stylés. Designs sarcastiques et humoristiques. Confort premium pour journées détente. Collection lazy lifestyle.",
  },
  "funny-streetwear": {
    title: "Funny Sweatshirts",
    subtitle: "L'humour se porte bien",
    description: "Sweatshirts avec messages drôles et designs décalés. Mode streetwear humoristique.",
    longDescription: "Exprimez votre sens de l'humour avec notre collection de sweatshirts drôles et décalés. Chaque pièce porte un message qui fait sourire, parfait pour briser la glace et montrer votre personnalité. Du sarcasme subtil aux blagues assumées, trouvez le sweatshirt qui vous correspond.",
    icon: Zap,
    color: "from-purple-500/20 to-pink-500/20",
    keywords: ["sweatshirt drôle", "pull humour", "streetwear fun", "mode sarcastique", "sweat message"],
    searchQuery: "funny OR drôle OR humour",
    metaDescription: "Sweatshirts avec messages drôles et designs décalés. Streetwear humoristique pour esprits libres. Collection sarcasme et bonne humeur.",
  },
  "cozy-essentials": {
    title: "Cozy Essentials",
    subtitle: "Le confort avant tout",
    description: "Les essentiels du confort ultime. Hoodies oversize et accessoires cozy.",
    longDescription: "Notre sélection d'essentiels cozy pour un confort maximal au quotidien. Hoodies oversize ultra-doux, bonnets douillets et accessoires pensés pour les moments de détente. Qualité premium et coupes généreuses pour une sensation de bien-être absolue.",
    icon: Sparkles,
    color: "from-emerald-500/20 to-teal-500/20",
    keywords: ["vêtement cozy", "hoodie oversize", "mode confort", "accessoires détente", "bonnet cozy"],
    searchQuery: "cozy OR confort OR oversize",
    metaDescription: "Essentiels cozy pour un confort ultime. Hoodies oversize, bonnets douillets, accessoires détente. Qualité premium pour moments chill.",
  },
};

const ThemedCollection = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItemToCart = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  const config = themeId ? THEMED_CONFIGS[themeId] : null;

  useEffect(() => {
    const loadProducts = async () => {
      if (!config) return;
      
      setLoading(true);
      try {
        // Try to search for themed products, fallback to all products
        const data = await searchProducts(config.searchQuery, 12);
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [config]);

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

  if (!config) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Collection non trouvée</h1>
          <Button asChild>
            <Link to="/collections">Voir toutes les collections</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = config.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`${config.title} | ChillaxPrints`}
        description={config.metaDescription}
        keywords={config.keywords.join(", ")}
        canonicalUrl={`/collections/${themeId}`}
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className={`py-16 md:py-24 bg-gradient-to-br ${config.color}`}>
          <div className="container px-4 md:px-6">
            <Link 
              to="/collections" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Toutes les collections
            </Link>
            
            <div className="max-w-3xl space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-background/80 backdrop-blur flex items-center justify-center mb-4">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <Badge className="px-4 py-2">Collection Thématique</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                {config.title}
              </h1>
              <p className="text-xl md:text-2xl text-primary font-medium">
                {config.subtitle}
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {config.longDescription}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {config.keywords.map((keyword, i) => (
                  <Badge key={i} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
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
                <Link to="/boutique">Tous les produits</Link>
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
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Collection en préparation</h3>
                <p className="text-muted-foreground mb-6">
                  Nous préparons des produits incroyables pour cette collection !
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
                    className="group hover:shadow-xl transition-all duration-300 border-2 overflow-hidden"
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
                        <Button size="sm" onClick={() => handleAddToCart(product)}>
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

        {/* SEO Content */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl font-bold mb-4">{config.title} - ChillaxPrints</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {config.longDescription} Tous nos produits sont fabriqués avec des matériaux 
                de qualité premium pour un confort optimal. Livraison internationale disponible.
              </p>
            </div>
          </div>
        </section>

        {/* Other Collections CTA */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Découvrez nos autres collections</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {Object.entries(THEMED_CONFIGS)
                .filter(([id]) => id !== themeId)
                .map(([id, col]) => (
                  <Button key={id} variant="outline" asChild>
                    <Link to={`/collections/${id}`}>{col.title}</Link>
                  </Button>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ThemedCollection;
