import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Shop = () => {
  const [category, setCategory] = useState("all");

  const products = [
    {
      id: 1,
      name: "Hoodie 'Lazy Legend'",
      price: "49.99€",
      category: "hoodies",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
      badge: "Nouveau",
    },
    {
      id: 2,
      name: "T-shirt 'Sarcasm is my cardio'",
      price: "24.99€",
      category: "tshirts",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    },
    {
      id: 3,
      name: "Bonnet 'Chill Mode'",
      price: "19.99€",
      category: "bonnets",
      image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&h=500&fit=crop",
      badge: "Populaire",
    },
    {
      id: 4,
      name: "T-shirt 'Nap Queen'",
      price: "24.99€",
      category: "tshirts",
      image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500&h=500&fit=crop",
    },
    {
      id: 5,
      name: "Hoodie 'Professional Napper'",
      price: "49.99€",
      category: "hoodies",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=500&fit=crop",
    },
    {
      id: 6,
      name: "Chaussures 'Slow Motion'",
      price: "59.99€",
      category: "chaussures",
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop",
      badge: "Nouveau",
    },
  ];

  const filteredProducts = category === "all" 
    ? products 
    : products.filter(p => p.category === category);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Notre Boutique</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Pas besoin de courir, mais cette collection ne dure pas éternellement 😴
            </p>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              🎉 -15% sur votre première commande avec le code: CHILL15
            </Badge>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12">
          <div className="container">
            <Tabs defaultValue="all" className="w-full" onValueChange={setCategory}>
              <TabsList className="w-full md:w-auto mb-8 grid grid-cols-5 gap-2">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="tshirts">T-shirts</TabsTrigger>
                <TabsTrigger value="hoodies">Hoodies</TabsTrigger>
                <TabsTrigger value="bonnets">Bonnets</TabsTrigger>
                <TabsTrigger value="chaussures">Chaussures</TabsTrigger>
              </TabsList>

              <TabsContent value={category} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <Link key={product.id} to={`/produit/${product.id}`}>
                      <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
                        <div className="relative aspect-square overflow-hidden">
                          {product.badge && (
                            <Badge className="absolute top-3 right-3 z-10">
                              {product.badge}
                            </Badge>
                          )}
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <p className="text-xl font-bold text-primary">{product.price}</p>
                            <Button size="sm" variant="outline">
                              Voir
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  Aucun produit dans cette catégorie pour le moment
                </p>
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
