import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Heart, Share2, Truck, RefreshCw, Shield } from "lucide-react";

const Product = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("black");
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const product = {
    id: 1,
    name: "Hoodie 'Lazy Legend'",
    price: "49.99€",
    description: "Parfait pour ne rien faire avec style. Ce hoodie ultra-confortable est votre meilleur allié pour vos journées détente.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=800&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Noir", value: "black" },
      { name: "Blanc", value: "white" },
      { name: "Orange", value: "orange" },
    ],
    material: "80% coton, 20% polyester",
    care: "Lavage en machine à 30°C",
    fit: "Coupe décontractée",
  };

  const similarProducts = [
    {
      id: 2,
      name: "T-shirt 'Sarcasm is my cardio'",
      price: "24.99€",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Bonnet 'Chill Mode'",
      price: "19.99€",
      image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop",
    },
    {
      id: 5,
      name: "Hoodie 'Professional Napper'",
      price: "49.99€",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop",
    },
  ];

  const [mainImage, setMainImage] = useState(product.images[0]);

  const handleAddToCart = () => {
    toast({
      title: "Ajouté au panier ! 🛒",
      description: `${product.name} (Taille: ${selectedSize}, Couleur: ${selectedColor})`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Accueil</Link>
            {" / "}
            <Link to="/boutique" className="hover:text-primary">Boutique</Link>
            {" / "}
            <span>{product.name}</span>
          </div>

          {/* Product Details */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(image)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      mainImage === image ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge className="mb-3">Nouveau</Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                <p className="text-3xl font-bold text-primary mb-6">{product.price}</p>
                <p className="text-lg text-muted-foreground">{product.description}</p>
              </div>

              {/* Size Selection */}
              <div>
                <Label className="text-base mb-3 block">Taille</Label>
                <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <div key={size}>
                      <RadioGroupItem value={size} id={size} className="peer sr-only" />
                      <Label
                        htmlFor={size}
                        className="flex items-center justify-center px-6 py-3 border-2 rounded-md cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Color Selection */}
              <div>
                <Label className="text-base mb-3 block">Couleur</Label>
                <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex gap-3">
                  {product.colors.map((color) => (
                    <div key={color.value}>
                      <RadioGroupItem value={color.value} id={color.value} className="peer sr-only" />
                      <Label
                        htmlFor={color.value}
                        className="flex items-center justify-center px-6 py-3 border-2 rounded-md cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        {color.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Quantity */}
              <div>
                <Label className="text-base mb-3 block">Quantité</Label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button size="lg" className="w-full" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Ajouter au panier
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="lg">
                    <Heart className="mr-2 h-5 w-5" />
                    Favoris
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="mr-2 h-5 w-5" />
                    Partager
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                  <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Livraison rapide</p>
                </div>
                <div className="text-center">
                  <RefreshCw className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Retour 30 jours</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Paiement sécurisé</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 pt-6 border-t">
                <div>
                  <h3 className="font-semibold mb-2">Détails du produit</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Matière : {product.material}</li>
                    <li>• Entretien : {product.care}</li>
                    <li>• Coupe : {product.fit}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Produits Similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProducts.map((product) => (
                <Link key={product.id} to={`/produit/${product.id}`}>
                  <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <p className="text-xl font-bold text-primary">{product.price}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Product;
