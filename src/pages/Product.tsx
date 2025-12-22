import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Loader2, ArrowLeft, Heart, Ruler, Palette, Star, Expand, Box, ZoomIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { getProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { toast } from "sonner";
import { Product3DViewer } from "@/components/Product3DViewer";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [viewMode, setViewMode] = useState<'3d' | 'image'>('3d');
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
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
      
      <main className="flex-1 py-3 md:py-4 lg:py-6">
        <div className="container px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="mb-3 md:mb-4 text-xs md:text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            {" / "}
            <Link to="/boutique" className="hover:text-primary transition-colors">Boutique</Link>
            {" / "}
            <span className="text-foreground line-clamp-1">{product.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
            {/* Product Images Gallery */}
            <div className="space-y-3 md:space-y-4 animate-fade-in">
              {/* Main View - 3D or Image */}
              <div className="relative">
                {viewMode === '3d' ? (
                  <Product3DViewer
                    modelUrl={(product as any).model3dUrl}
                    fallbackImage={mainImage}
                    productTitle={product.title}
                  />
                ) : (
                  <div 
                    className="aspect-square overflow-hidden rounded-xl md:rounded-2xl border-2 border-border/50 bg-secondary/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-500 relative group cursor-zoom-in"
                    onClick={() => setZoomedImage(mainImage)}
                  >
                    <img
                      src={mainImage || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 backdrop-blur-sm rounded-full p-3">
                        <ZoomIn className="w-6 h-6 text-foreground" />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Wishlist Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 md:top-4 md:right-4 h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 bg-background/90 hover:bg-background backdrop-blur-sm shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:scale-110 z-20"
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
              
              {/* Thumbnails - 3D + Images */}
              <div className="grid grid-cols-5 gap-2 md:gap-3">
                {/* 3D View Thumbnail */}
                <button
                  onClick={() => setViewMode('3d')}
                  className={`aspect-square overflow-hidden rounded-lg md:rounded-xl border-2 transition-all duration-300 hover:scale-105 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 ${
                    viewMode === '3d'
                      ? "border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] scale-105"
                      : "border-border/50 hover:border-primary/50 shadow-[var(--shadow-soft)]"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <Box className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    <span className="text-[8px] md:text-[10px] text-white/70 font-medium">3D</span>
                  </div>
                </button>
                
                {/* Image Thumbnails */}
                {product.images?.edges?.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setMainImage(image.node.url);
                      setViewMode('image');
                    }}
                    className={`aspect-square overflow-hidden rounded-lg md:rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                      viewMode === 'image' && mainImage === image.node.url
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
            </div>

            {/* Image Zoom Modal */}
            <Dialog open={!!zoomedImage} onOpenChange={() => setZoomedImage(null)}>
              <DialogContent className="max-w-4xl w-full p-2 bg-background/95 backdrop-blur-xl">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                  {zoomedImage && (
                    <img
                      src={zoomedImage}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </DialogContent>
            </Dialog>


            {/* Product Info */}
            <div className="space-y-3 md:space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {product.productType && (
                    <Badge variant="secondary" className="text-[10px] md:text-xs px-2 py-0.5 shadow-[var(--shadow-soft)]">
                      {product.productType}
                    </Badge>
                  )}
                  {selectedVariant?.availableForSale ? (
                    <Badge className="text-[10px] md:text-xs px-2 py-0.5 bg-green-500 shadow-[var(--shadow-soft)]">En stock</Badge>
                  ) : (
                    <Badge variant="destructive" className="text-[10px] md:text-xs px-2 py-0.5 shadow-[var(--shadow-soft)]">Rupture de stock</Badge>
                  )}
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">{product.title}</h1>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
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

              {(product.descriptionHtml || product.description) && (
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full text-left p-3 md:p-4 rounded-xl bg-gradient-to-br from-secondary/40 to-secondary/20 border border-border/50 hover:border-primary/30 hover:shadow-[0_4px_20px_rgba(var(--primary-rgb),0.15)] transition-all duration-300 group cursor-pointer relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-start justify-between gap-2 relative">
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2 group-hover:text-foreground transition-colors">
                          {product.description}
                        </p>
                        <div className="flex-shrink-0 p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                          <Expand className="w-3.5 h-3.5 text-primary" />
                        </div>
                      </div>
                      <span className="text-[10px] md:text-xs text-primary font-medium mt-2 inline-block group-hover:translate-x-1 transition-transform duration-300">
                        Cliquez pour voir plus →
                      </span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg md:max-w-2xl lg:max-w-3xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-lg md:text-xl font-bold text-primary flex items-center gap-3">
                        <span className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-inner">📝</span>
                        Description du produit
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-6 space-y-6">
                      {/* Main Description Content */}
                      <div className="p-5 md:p-8 rounded-2xl bg-gradient-to-br from-secondary/20 via-background to-secondary/10 border border-border/30 shadow-inner">
                        <div 
                          className="prose prose-sm md:prose-base max-w-none text-foreground
                            [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-muted-foreground
                            [&>ul]:my-4 [&>ul]:space-y-2 [&>ul]:list-disc [&>ul]:pl-5
                            [&>ol]:my-4 [&>ol]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-5
                            [&>li]:text-muted-foreground [&>li]:leading-relaxed
                            [&>h1]:text-xl [&>h1]:font-bold [&>h1]:text-foreground [&>h1]:mb-4 [&>h1]:mt-6
                            [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:text-foreground [&>h2]:mb-3 [&>h2]:mt-5
                            [&>h3]:text-base [&>h3]:font-semibold [&>h3]:text-foreground [&>h3]:mb-2 [&>h3]:mt-4
                            [&>strong]:text-foreground [&>strong]:font-semibold
                            [&>em]:italic
                            [&>a]:text-primary [&>a]:underline [&>a]:hover:text-primary/80
                            [&>br]:block [&>br]:h-2"
                          dangerouslySetInnerHTML={{ 
                            __html: product.descriptionHtml || product.description 
                          }}
                        />
                      </div>
                      
                      {/* Product Features Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Badge variant="secondary" className="text-xs px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                          ✨ Design original
                        </Badge>
                        <Badge variant="secondary" className="text-xs px-3 py-1.5 bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20">
                          🎨 Impression haute qualité
                        </Badge>
                        <Badge variant="secondary" className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                          👕 Coton premium
                        </Badge>
                        <Badge variant="secondary" className="text-xs px-3 py-1.5 bg-gradient-to-r from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                          🚚 Livraison rapide
                        </Badge>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}

              {/* Product Options */}
              {product.options && product.options.length > 0 && (
                <div className="space-y-3 p-2 md:p-3 rounded-lg bg-secondary/20 border border-border/50">
                  {product.options.map((option) => (
                    <div key={option.name} className="space-y-1.5">
                      <Label className="text-xs md:text-sm font-semibold">
                        {option.name}: <span className="text-primary">{selectedOptions[option.name]}</span>
                      </Label>
                      <RadioGroup
                        value={selectedOptions[option.name] || ""}
                        onValueChange={(value) => handleOptionChange(option.name, value)}
                      >
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 md:gap-2">
                          {option.values.map((value) => (
                            <div key={value}>
                              <RadioGroupItem
                                value={value}
                                id={`${option.name}-${value}`}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={`${option.name}-${value}`}
                                className="flex items-center justify-center rounded-lg border-2 border-border bg-background p-1.5 md:p-2 text-[10px] md:text-xs hover:bg-accent hover:border-primary transition-all duration-300 cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary peer-data-[state=checked]:font-semibold"
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
              <div className="flex items-center gap-3 p-2 md:p-3 rounded-lg bg-secondary/20 border border-border/50">
                <Label className="text-xs md:text-sm font-semibold">Quantité:</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 md:h-9 md:w-9 rounded-lg text-sm"
                  >
                    -
                  </Button>
                  <span className="text-base md:text-lg font-bold w-8 text-center text-primary">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 md:h-9 md:w-9 rounded-lg text-sm"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  size="default"
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.availableForSale}
                  className="flex-1 h-10 md:h-11 text-xs md:text-sm rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:scale-[1.02] transition-all duration-300"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {selectedVariant?.availableForSale ? "Ajouter au panier" : "Rupture de stock"}
                </Button>
                
                {/* Personalization Button */}
                <Button
                  size="default"
                  variant="outline"
                  asChild
                  className="flex-1 h-10 md:h-11 text-xs md:text-sm rounded-lg border-2 border-primary/50 hover:border-primary hover:bg-primary/5 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:scale-[1.02] transition-all duration-300 group"
                >
                  <Link to="/personnalisation">
                    <Palette className="mr-2 h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                    <span>Personnaliser</span>
                  </Link>
                </Button>
              </div>

              {/* Size Guide & Features - Compact Row */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border/50">
                <Link
                  to="/guide-des-tailles"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-all text-xs"
                >
                  <Ruler className="w-3.5 h-3.5 text-primary" />
                  <span className="font-medium">Guide tailles</span>
                </Link>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary/20 border border-border/30 text-xs">
                  <span>🚚</span>
                  <span className="font-medium">Livraison gratuite dès 50€</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary/20 border border-border/30 text-xs">
                  <span>🔄</span>
                  <span className="font-medium">Retours 30j</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section - Compact */}
          <div className="mt-6 md:mt-8 animate-fade-in border-t border-border/50 pt-4 md:pt-6" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base md:text-lg font-bold">Avis clients</h2>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-muted-foreground/30" strokeWidth={1.5} />
                ))}
                <span className="text-xs text-muted-foreground ml-1">0/5 (0 avis)</span>
              </div>
            </div>
            
            <div className="text-center py-6 px-4 rounded-lg border border-dashed border-border/50 bg-secondary/10">
              <p className="text-sm text-muted-foreground">
                Aucun avis pour le moment. Sois le premier à partager ton expérience !
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Product;
