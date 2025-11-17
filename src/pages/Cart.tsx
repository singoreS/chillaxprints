import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cartStore";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ExternalLink, Loader2, Tag } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { items, updateQuantity, removeItem, createCheckout, isLoading } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");

  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shippingCost = shippingMethod === "standard" ? 5.99 : 12.99;
  const total = subtotal - discount + shippingCost;
  const currencyCode = items[0]?.price.currencyCode || "EUR";

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "CHILLAX10") {
      setPromoApplied(true);
      toast.success("Code promo appliqué!", {
        description: "Vous bénéficiez de 10% de réduction"
      });
    } else {
      toast.error("Code promo invalide");
    }
  };

  const handleCheckout = async () => {
    try {
      await createCheckout();
      const checkoutUrl = useCartStore.getState().checkoutUrl;
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error("Erreur lors de la création du panier");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
            <p className="text-muted-foreground mb-8">
              Ajoutez des produits pour commencer vos achats
            </p>
            <Button asChild size="lg">
              <Link to="/boutique">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continuer mes achats
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/boutique">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continuer mes achats
            </Link>
          </Button>
        </div>

        <h1 className="text-3xl font-bold mb-8">Mon Panier</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.variantId} className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
                    {item.product.node.images?.edges?.[0]?.node && (
                      <img
                        src={item.product.node.images.edges[0].node.url}
                        alt={item.product.node.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1">{item.product.node.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.selectedOptions.map(option => `${option.name}: ${option.value}`).join(' • ')}
                    </p>
                    <p className="font-bold text-lg">
                      {currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.variantId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-2 border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <p className="font-semibold">
                      {currencyCode} {(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Résumé de la commande</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <Label htmlFor="promo" className="mb-2 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Code promo
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="promo"
                    placeholder="CHILLAX10"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                  />
                  <Button
                    onClick={handleApplyPromo}
                    disabled={promoApplied || !promoCode.trim()}
                    variant="secondary"
                  >
                    {promoApplied ? "Appliqué" : "Appliquer"}
                  </Button>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="mb-6">
                <Label className="mb-3 block">Méthode de livraison</Label>
                <div className="space-y-2">
                  <button
                    onClick={() => setShippingMethod("standard")}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                      shippingMethod === "standard"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Livraison Standard</p>
                        <p className="text-sm text-muted-foreground">5-7 jours ouvrés</p>
                      </div>
                      <p className="font-semibold">{currencyCode} 5.99</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setShippingMethod("express")}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                      shippingMethod === "express"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Livraison Express</p>
                        <p className="text-sm text-muted-foreground">2-3 jours ouvrés</p>
                      </div>
                      <p className="font-semibold">{currencyCode} 12.99</p>
                    </div>
                  </button>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Pricing */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Sous-total</span>
                  <span>{currencyCode} {subtotal.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Réduction (10%)</span>
                    <span>-{currencyCode} {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Livraison</span>
                  <span>{currencyCode} {shippingCost.toFixed(2)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold">{currencyCode} {total.toFixed(2)}</span>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Chargement...
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Passer la commande
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Paiement sécurisé via Shopify
              </p>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
