import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductFilters, FilterState } from "@/components/ProductFilters";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { toast } from "sonner";
import { ShoppingCart, Loader2, Heart, ArrowUpDown } from "lucide-react";

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 200],
    colors: [],
    sizes: [],
  });
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
    let result = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(product => product.node.productType === selectedCategory);
    }

    // Filter by price
    result = result.filter(product => {
      const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Filter by colors (if colors are in product tags or options)
    if (filters.colors.length > 0) {
      result = result.filter(product => {
        const productColors = product.node.options
          ?.find(opt => opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "couleur")
          ?.values.map(v => v.toLowerCase()) || [];
        return filters.colors.some(color => productColors.includes(color));
      });
    }

    // Filter by sizes (if sizes are in product options)
    if (filters.sizes.length > 0) {
      result = result.filter(product => {
        const productSizes = product.node.options
          ?.find(opt => opt.name.toLowerCase() === "size" || opt.name.toLowerCase() === "taille")
          ?.values || [];
        return filters.sizes.some(size => productSizes.includes(size));
      });
    }

    // Sort products
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => 
          parseFloat(a.node.priceRange.minVariantPrice.amount) - 
          parseFloat(b.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "price-desc":
        result.sort((a, b) => 
          parseFloat(b.node.priceRange.minVariantPrice.amount) - 
          parseFloat(a.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "name-asc":
        result.sort((a, b) => a.node.title.localeCompare(b.node.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.node.title.localeCompare(a.node.title));
        break;
      default:
        // Keep default order
        break;
    }

    setFilteredProducts(result);
  }, [selectedCategory, products, filters, sortBy]);

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

  const activeFiltersCount = 
    (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 200 ? 1 : 0) +
    filters.colors.length +
    filters.sizes.length;

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Boutique - T-Shirts, Hoodies, Bonnets & Chaussures"
        description="Découvrez notre collection de vêtements humoristiques et confortables. T-shirts sarcastiques, hoodies lazy lifestyle, bonnets et chaussures. Livraison gratuite dès 50€."
        keywords="acheter t-shirt humoristique, hoodie confortable, bonnet original, chaussures streetwear, boutique vêtements drôles, mode lazy"
        canonicalUrl="/boutique"
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(24_100%_50%/0.08),transparent_60%)]" />
          <div className="container px-4 md:px-6 text-center relative z-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Notre <span className="text-primary">Boutique</span>
            </h1>
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground mb-4 md:mb-6 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              Pas besoin de courir, mais cette collection ne dure pas éternellement 😴
            </p>
            <Badge variant="secondary" className="text-xs md:text-sm py-1.5 md:py-2 px-3 md:px-4 shadow-[var(--shadow-soft)] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              🎉 -15% sur votre première commande avec le code: CHILL15
            </Badge>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-6 md:py-8 lg:py-12 bg-gradient-to-b from-background to-muted/20">
          <div className="container px-4 md:px-6">
            {/* Category Filters and Sort */}
            <div className="flex flex-col gap-4 md:gap-6 mb-6 md:mb-8">
              {/* Categories Tabs */}
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 gap-1 shadow-[var(--shadow-soft)] p-1 h-auto">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category.value} 
                      value={category.value}
                      className="data-[state=active]:shadow-[var(--shadow-soft)] text-xs md:text-sm py-2 md:py-2.5 px-1 md:px-3"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Filters and Sort Row */}
              <div className="flex flex-row items-center justify-between gap-3">
                <ProductFilters 
                  onFilterChange={setFilters}
                  activeFiltersCount={activeFiltersCount}
                />
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-auto min-w-[140px] md:min-w-[180px] text-xs md:text-sm">
                    <ArrowUpDown className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="default">Par défaut</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="name-asc">Nom A-Z</SelectItem>
                    <SelectItem value="name-desc">Nom Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-16 md:py-20">
                <Loader2 className="h-6 w-6 md:h-8 md:w-8 animate-spin text-primary" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 md:py-20">
                <p className="text-base md:text-xl text-muted-foreground">Aucun produit trouvé</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                {filteredProducts.map((product, index) => (
                  <Card 
                    key={product.node.id} 
                    className="group overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all duration-500 hover:-translate-y-1 bg-card border-border/50 animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${(index % 4) * 100}ms`, animationDuration: '700ms' }}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <Link to={`/produit/${product.node.handle}`}>
                          <div className="aspect-[3/4] bg-secondary/20 overflow-hidden relative">
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
                          className="absolute top-1.5 right-1.5 md:top-2 md:right-2 h-7 w-7 md:h-8 md:w-8 bg-background/90 hover:bg-background shadow-[var(--shadow-soft)] backdrop-blur-sm"
                          onClick={() => handleToggleWishlist(product)}
                        >
                          <Heart
                            className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-all ${
                              isInWishlist(product.node.id)
                                ? "fill-accent text-accent scale-110"
                                : "text-foreground"
                            }`}
                          />
                        </Button>
                      </div>
                      <div className="p-2 md:p-3">
                        <Link to={`/produit/${product.node.handle}`}>
                          <h3 className="font-semibold text-xs md:text-sm mb-1.5 md:mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[2rem] md:min-h-[2.5rem]">
                            {product.node.title}
                          </h3>
                        </Link>
                        <p className="text-primary font-bold text-sm md:text-lg mb-2 md:mb-3">
                          {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}€
                        </p>
                        <Button 
                          onClick={() => handleAddToCart(product)} 
                          size="sm"
                          className="w-full text-[10px] md:text-xs py-1.5 md:py-2 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:scale-[1.02] transition-all"
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
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
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
