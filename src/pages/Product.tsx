import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Loader2, ArrowLeft, Heart } from "lucide-react";
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
      <Header />
      
      <main className="flex-1 py-4 md:py-6">
        <div className="container">
          {/* Breadcrumb */}
          <div className="mb-4 text-xs md:text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            {" / "}
            <Link to="/boutique" className="hover:text-primary transition-colors">Boutique</Link>
            {" / "}
            <span className="text-foreground">{product.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
            {/* Product Images Gallery */}
            <div className="space-y-3 animate-fade-in">
              <div className="aspect-square overflow-hidden rounded-xl border-2 border-border/50 bg-secondary/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-500 relative group">
                <img
                  src={mainImage || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 h-9 w-9 bg-background/90 hover:bg-background backdrop-blur-sm shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:scale-110"
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
                    className={`w-5 h-5 transition-all duration-300 ${
                      isInWishlist(product.id)
                        ? "fill-accent text-accent scale-110"
                        : "text-foreground"
                    }`}
                  />
                </Button>
              </div>
              {product.images?.edges && product.images.edges.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.edges.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(image.node.url)}
                      className={`aspect-square overflow-hidden rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                        mainImage === image.node.url
                          ? "border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] scale-105"
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
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {product.productType && (
                    <Badge variant="secondary" className="text-xs px-2 py-1 shadow-[var(--shadow-soft)]">
                      {product.productType}
                    </Badge>
                  )}
                  {selectedVariant?.availableForSale ? (
                    <Badge className="text-xs px-2 py-1 bg-green-500 shadow-[var(--shadow-soft)]">En stock</Badge>
                  ) : (
                    <Badge variant="destructive" className="text-xs px-2 py-1 shadow-[var(--shadow-soft)]">Rupture de stock</Badge>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
                <p className="text-3xl md:text-4xl font-bold text-primary">
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
                <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Product Options */}
              {product.options && product.options.length > 0 && (
                <div className="space-y-4 p-4 rounded-lg bg-secondary/20 border border-border/50">
                  {product.options.map((option) => (
                    <div key={option.name} className="space-y-3">
                      <Label className="text-sm font-semibold">
                        {option.name}: <span className="text-primary">{selectedOptions[option.name]}</span>
                      </Label>
                      <RadioGroup
                        value={selectedOptions[option.name] || ""}
                        onValueChange={(value) => handleOptionChange(option.name, value)}
                      >
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                          {option.values.map((value) => (
                            <div key={value}>
                              <RadioGroupItem
                                value={value}
                                id={`${option.name}-${value}`}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={`${option.name}-${value}`}
                                className="flex items-center justify-center rounded-lg border-2 border-border bg-background p-2 text-sm hover:bg-accent hover:border-primary transition-all duration-300 cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary peer-data-[state=checked]:font-semibold peer-data-[state=checked]:scale-105"
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
              <div className="space-y-3 p-4 rounded-lg bg-secondary/20 border border-border/50">
                <Label className="text-sm font-semibold">Quantité</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 rounded-lg"
                  >
                    -
                  </Button>
                  <span className="text-xl font-bold w-12 text-center text-primary">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 rounded-lg"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
                className="w-full h-12 rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] hover:scale-[1.02] transition-all duration-300"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {selectedVariant?.availableForSale ? "Ajouter au panier" : "Rupture de stock"}
              </Button>

              {/* Product Features */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs p-3 rounded-lg bg-secondary/20 border border-border/30">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm">
                    🚚
                  </div>
                  <div>
                    <p className="font-semibold text-xs">Livraison gratuite</p>
                    <p className="text-muted-foreground text-[10px]">Dès 50€</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs p-3 rounded-lg bg-secondary/20 border border-border/30">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm">
                    🔄
                  </div>
                  <div>
                    <p className="font-semibold text-xs">Retours faciles</p>
                    <p className="text-muted-foreground text-[10px]">30 jours</p>
                  </div>
                </div>
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
