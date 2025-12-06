import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function Wishlist() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore(state => state.addItem);

  const handleAddToCart = (product: any) => {
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Mes Favoris"
        description="Retrouvez vos produits favoris ChillaxPrints. Vêtements humoristiques sauvegardés pour plus tard."
        keywords="favoris, wishlist, produits sauvegardés"
        canonicalUrl="/favoris"
        noIndex={true}
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-8 h-8 text-accent fill-accent" />
            <h1 className="text-4xl font-bold text-foreground">Mes Favoris</h1>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2 text-foreground">
                Aucun favori pour le moment
              </h2>
              <p className="text-muted-foreground mb-6">
                Ajoutez des produits à vos favoris pour les retrouver facilement
              </p>
              <Link to="/boutique">
                <Button size="lg">
                  Découvrir nos produits
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((product) => (
                <Card key={product.node.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <Link to={`/product/${product.node.handle}`} className="block mb-4">
                      <div className="aspect-square bg-secondary/20 rounded-lg mb-4 overflow-hidden">
                        {product.node.images?.edges?.[0]?.node && (
                          <img
                            src={product.node.images.edges[0].node.url}
                            alt={product.node.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <h3 className="font-semibold text-lg mb-2 text-foreground">
                        {product.node.title}
                      </h3>
                      <p className="text-accent font-bold text-xl mb-2">
                        {product.node.priceRange.minVariantPrice.currencyCode}{" "}
                        {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                      </p>
                    </Link>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1"
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Ajouter au panier
                      </Button>
                      <Button
                        onClick={() => {
                          removeItem(product.node.id);
                          toast.success("Retiré des favoris");
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
