import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Loader2, ArrowLeft, Heart, Ruler, Palette, Star } from "lucide-react";
import { getProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { toast } from "sonner";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const addItem = useCartStore(state => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        const shopifyProduct = await getProductByHandle(id);
        setProduct(shopifyProduct);
        
        if (shopifyProduct) {
          const firstVariant = shopifyProduct.variants.edges[0]?.node;
          setSelectedVariant(firstVariant);
          
          const initialOptions: Record<string, string> = {};
          firstVariant?.selectedOptions.forEach(option => {
            initialOptions[option.name] = option.value;
          });
          setSelectedOptions(initialOptions);
          
          if (shopifyProduct.images?.edges?.[0]?.node) {
            setMainImage(shopifyProduct.images.edges[0].node.url);
          }
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);
    
    const variant = product?.variants.edges.find(({ node }) => {
      return node.selectedOptions.every(option => 
        newOptions[option.name] === option.value
      );
    });
    
    if (variant) {
      setSelectedVariant(variant.node);
      
      // Update main image based on the selected variant
      // Try to find variant-specific image or use the variant's image if available
      if (variant.node.image?.url) {
        setMainImage(variant.node.image.url);
      } else {
        // Find image index based on variant position
        const variantIndex = product?.variants.edges.findIndex(v => v.node.id === variant.node.id) || 0;
        const imageAtIndex = product?.images?.edges?.[variantIndex]?.node?.url;
        if (imageAtIndex) {
          setMainImage(imageAtIndex);
        }
      }
    }
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const productWrapper: ShopifyProduct = {
      node: product
    };

    const cartItem = {
      product: productWrapper,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Ajouté au panier !", {
      description: `${product.title} - ${quantity}x`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Produit non trouvé</h1>
            <p className="text-muted-foreground">Ce produit n'existe pas ou a été retiré</p>
            <Link to="/boutique">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à la boutique
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={product.title}
        description={product.description || `Découvrez ${product.title} - Vêtement confortable et humoristique ChillaxPrints. Livraison rapide, qualité premium.`}
        keywords={`${product.title}, ${product.productType || 'vêtement'}, ChillaxPrints, achat en ligne`}
        canonicalUrl={`/produit/${id}`}
        ogType="product"
      />
      <Header />
      
      <main className="flex-1 py-4 md:py-6 lg:py-10">
        <div className="container px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="mb-4 md:mb-6 lg:mb-8 text-xs md:text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            {" / "}
            <Link to="/boutique" className="hover:text-primary transition-colors">Boutique</Link>
            {" / "}
            <span className="text-foreground line-clamp-1">{product.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12">
            {/* Product Images Gallery */}
            <div className="space-y-3 md:space-y-4 animate-fade-in">
              <div className="aspect-square overflow-hidden rounded-xl md:rounded-2xl border-2 border-border/50 bg-secondary/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-500 relative group">
                <img
                  src={mainImage || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 md:top-4 md:right-4 h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 bg-background/90 hover:bg-background backdrop-blur-sm shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:scale-110"
                  onClick={() => {
                    const productWrapper: ShopifyProduct = { node: product };
                    if (isInWishlist(product.id)) {
                      removeFromWishlist(product.id);
                      toast.success("Retiré des favoris");
                    } else {
                      addToWishlist(productWrapper);
                      toast.success("Ajouté aux favoris");
                    }
                  }}
                >
                  <Heart
                    className={`w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-all duration-300 ${
                      isInWishlist(product.id)
                        ? "fill-accent text-accent scale-110"
                        : "text-foreground"
                    }`}
                  />
                </Button>
              </div>
              {product.images?.edges && product.images.edges.length > 1 && (
                <div className="grid grid-cols-4 gap-2 md:gap-3">
                  {product.images.edges.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(image.node.url)}
                      className={`aspect-square overflow-hidden rounded-lg md:rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                        mainImage === image.node.url
                          ? "border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] scale-105"
                          : "border-border/50 hover:border-primary/50 shadow-[var(--shadow-soft)]"
                      }`}
                    >
                      <img
                        src={image.node.url}
                        alt={image.node.altText || `${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-4 md:space-y-5 lg:space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {product.productType && (
                    <Badge variant="secondary" className="text-[10px] md:text-xs lg:text-sm px-2 md:px-3 py-0.5 md:py-1 shadow-[var(--shadow-soft)]">
                      {product.productType}
                    </Badge>
                  )}
                  {selectedVariant?.availableForSale ? (
                    <Badge className="text-[10px] md:text-xs lg:text-sm px-2 md:px-3 py-0.5 md:py-1 bg-green-500 shadow-[var(--shadow-soft)]">En stock</Badge>
                  ) : (
                    <Badge variant="destructive" className="text-[10px] md:text-xs lg:text-sm px-2 md:px-3 py-0.5 md:py-1 shadow-[var(--shadow-soft)]">Rupture de stock</Badge>
                  )}
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">{product.title}</h1>
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                  {selectedVariant ? (
                    <>
                      {parseFloat(selectedVariant.price.amount).toFixed(2)}€
                    </>
                  ) : (
                    <>
                      {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}€
                    </>
                  )}
                </p>
              </div>

              {product.description && (
                <div className="p-3 md:p-4 lg:p-5 rounded-lg md:rounded-xl bg-secondary/30 border border-border/50">
                  <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Product Options */}
              {product.options && product.options.length > 0 && (
                <div className="space-y-4 md:space-y-5 p-3 md:p-4 lg:p-5 rounded-lg md:rounded-xl bg-secondary/20 border border-border/50">
                  {product.options.map((option) => (
                    <div key={option.name} className="space-y-2 md:space-y-3">
                      <Label className="text-sm md:text-base lg:text-lg font-semibold">
                        {option.name}: <span className="text-primary">{selectedOptions[option.name]}</span>
                      </Label>
                      <RadioGroup
                        value={selectedOptions[option.name] || ""}
                        onValueChange={(value) => handleOptionChange(option.name, value)}
                      >
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
                          {option.values.map((value) => (
                            <div key={value}>
                              <RadioGroupItem
                                value={value}
                                id={`${option.name}-${value}`}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={`${option.name}-${value}`}
                                className="flex items-center justify-center rounded-lg md:rounded-xl border-2 border-border bg-background p-2 md:p-3 lg:p-4 text-xs md:text-sm lg:text-base hover:bg-accent hover:border-primary transition-all duration-300 cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary peer-data-[state=checked]:font-semibold peer-data-[state=checked]:scale-105"
                              >
                                {value}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-3 md:space-y-4 p-3 md:p-4 lg:p-5 rounded-lg md:rounded-xl bg-secondary/20 border border-border/50">
                <Label className="text-sm md:text-base lg:text-lg font-semibold">Quantité</Label>
                <div className="flex items-center gap-3 md:gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-lg md:rounded-xl text-base md:text-lg"
                  >
                    -
                  </Button>
                  <span className="text-xl md:text-2xl lg:text-3xl font-bold w-12 md:w-16 lg:w-20 text-center text-primary">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-lg md:rounded-xl text-base md:text-lg"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.availableForSale}
                  className="flex-1 h-12 md:h-14 lg:h-16 text-sm md:text-base lg:text-lg rounded-lg md:rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:scale-[1.02] transition-all duration-300"
                >
                  <ShoppingCart className="mr-2 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
                  {selectedVariant?.availableForSale ? "Ajouter au panier" : "Rupture de stock"}
                </Button>
                
                {/* Personalization Button */}
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="flex-1 h-12 md:h-14 lg:h-16 text-sm md:text-base lg:text-lg rounded-lg md:rounded-xl border-2 border-primary/50 hover:border-primary hover:bg-primary/5 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:scale-[1.02] transition-all duration-300 group"
                >
                  <Link to="/personnalisation">
                    <Palette className="mr-2 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-primary group-hover:scale-110 transition-transform" />
                    <span>Personnaliser</span>
                  </Link>
                </Button>
              </div>

              {/* Size Guide Link */}
              <Link
                to="/guide-des-tailles"
                className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg md:rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <Ruler className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-xs md:text-sm text-foreground">Besoin d'aide pour la taille ?</p>
                  <p className="text-muted-foreground text-[10px] md:text-xs truncate">Consulte notre guide des tailles →</p>
                </div>
              </Link>

              {/* Product Features */}
              <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4 pt-4 md:pt-6 border-t border-border/50">
                <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-4 lg:p-5 rounded-lg md:rounded-xl bg-secondary/20 border border-border/30 hover:shadow-[var(--shadow-soft)] transition-all">
                  <div className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm md:text-lg lg:text-xl flex-shrink-0">
                    🚚
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[10px] md:text-xs lg:text-sm">Livraison gratuite</p>
                    <p className="text-muted-foreground text-[9px] md:text-[10px] lg:text-xs">Dès 50€ d'achat</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-4 lg:p-5 rounded-lg md:rounded-xl bg-secondary/20 border border-border/30 hover:shadow-[var(--shadow-soft)] transition-all">
                  <div className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm md:text-lg lg:text-xl flex-shrink-0">
                    🔄
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[10px] md:text-xs lg:text-sm">Retours faciles</p>
                    <p className="text-muted-foreground text-[9px] md:text-[10px] lg:text-xs">30 jours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section - Placeholder */}
          <div className="mt-12 md:mt-16 lg:mt-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="border-t border-border/50 pt-8 md:pt-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8">Avis clients</h2>
              
              {/* Rating Summary */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 p-4 md:p-6 rounded-xl bg-secondary/20 border border-border/50">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground/30"
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-muted-foreground">0/5</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Basé sur 0 avis</p>
                </div>
                
                {/* Rating Bars */}
                <div className="flex-1 w-full space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-2 md:gap-3">
                      <span className="text-xs md:text-sm w-3 text-muted-foreground">{rating}</span>
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground/50" />
                      <div className="flex-1 h-2 md:h-3 bg-border/50 rounded-full overflow-hidden">
                        <div className="h-full bg-primary/30 rounded-full" style={{ width: '0%' }} />
                      </div>
                      <span className="text-xs md:text-sm w-8 text-muted-foreground text-right">0%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Empty State */}
              <div className="text-center py-12 md:py-16 px-4 rounded-xl border-2 border-dashed border-border/50 bg-secondary/10">
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground/20"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-muted-foreground mb-2">
                  Aucun avis pour le moment
                </h3>
                <p className="text-sm md:text-base text-muted-foreground/70 max-w-md mx-auto">
                  Sois le premier à partager ton expérience avec ce produit !
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Product;
