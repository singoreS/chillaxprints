import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Package, MapPin, Clock, CheckCircle2, TruckIcon, Search } from "lucide-react";

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  currency: string;
  status: string;
  shipping_address: any;
  created_at: string;
}

interface OrderTracking {
  id: string;
  status: string;
  location: string | null;
  description: string;
  created_at: string;
}

interface OrderItem {
  id: string;
  product_title: string;
  product_variant: string | null;
  quantity: number;
  price: number;
  product_image: string | null;
}

const OrderTracking = () => {
  const [searchParams] = useSearchParams();
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [trackingEvents, setTrackingEvents] = useState<OrderTracking[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  // Check for token in URL and auto-load order
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      loadOrderByToken(token);
    }
  }, [searchParams]);

  const loadOrderByToken = async (token: string) => {
    setLoading(true);
    try {
      // Use secure function to validate token and get order data
      const { data: orderData, error: orderError } = await supabase
        .rpc("validate_order_token", { _token: token });

      if (orderError) {
        if (orderError.message.includes("Invalid or expired token")) {
          toast.error("Lien de suivi invalide ou expiré");
        } else {
          toast.error("Erreur lors du chargement de la commande");
        }
        return;
      }
      
      if (!orderData || orderData.length === 0) {
        toast.error("Commande introuvable");
        return;
      }

      const order = orderData[0];
      setOrder(order);
      setOrderNumber(order.order_number);

      // Load tracking events
      const { data: trackingData, error: trackingError } = await supabase
        .from("order_tracking")
        .select("*")
        .eq("order_id", order.order_id)
        .order("created_at", { ascending: false });

      if (trackingError) throw trackingError;
      setTrackingEvents(trackingData || []);

      // Load order items
      const { data: itemsData, error: itemsError } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", order.order_id);

      if (itemsError) throw itemsError;
      setOrderItems(itemsData || []);

      toast.success("Commande chargée avec succès!");
    } catch (error) {
      console.error("Error loading order by token:", error);
      toast.error("Erreur lors du chargement de la commande");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderNumber.trim()) {
      toast.error("Veuillez entrer un numéro de commande");
      return;
    }

    setLoading(true);
    try {
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("order_number", orderNumber.trim())
        .maybeSingle();

      if (orderError) throw orderError;
      
      if (!orderData) {
        toast.error("Commande introuvable");
        setOrder(null);
        setTrackingEvents([]);
        setOrderItems([]);
        return;
      }

      setOrder(orderData);

      const { data: trackingData, error: trackingError } = await supabase
        .from("order_tracking")
        .select("*")
        .eq("order_id", orderData.id)
        .order("created_at", { ascending: false });

      if (trackingError) throw trackingError;
      setTrackingEvents(trackingData || []);

      const { data: itemsData, error: itemsError } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderData.id);

      if (itemsError) throw itemsError;
      setOrderItems(itemsData || []);

      toast.success("Commande trouvée!");
    } catch (error) {
      console.error("Error searching order:", error);
      toast.error("Erreur lors de la recherche");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "processing":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "shipped":
        return <TruckIcon className="h-5 w-5 text-purple-500" />;
      case "delivered":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      pending: "En attente",
      processing: "En préparation",
      shipped: "Expédiée",
      delivered: "Livrée",
    };
    return labels[status.toLowerCase()] || status;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Suivi de commande</h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Rechercher une commande</CardTitle>
              <CardDescription>
                Entrez votre numéro de commande pour suivre son statut
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  placeholder="Ex: CHX-2024-001"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Rechercher
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {order && (
            <>
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Commande #{order.order_number}</CardTitle>
                      <CardDescription>
                        Passée le {new Date(order.created_at).toLocaleDateString("fr-FR")}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        {order.total_amount.toFixed(2)} {order.currency}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusIcon(order.status)}
                        <span className="text-sm font-medium">
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Adresse de livraison</h3>
                      <div className="text-sm text-muted-foreground">
                        <p>{order.shipping_address?.first_name} {order.shipping_address?.last_name}</p>
                        <p>{order.shipping_address?.address_line1}</p>
                        {order.shipping_address?.address_line2 && (
                          <p>{order.shipping_address.address_line2}</p>
                        )}
                        <p>
                          {order.shipping_address?.postal_code} {order.shipping_address?.city}
                        </p>
                        <p>{order.shipping_address?.country}</p>
                      </div>
                    </div>

                    {orderItems.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">Articles commandés</h3>
                        <div className="space-y-2">
                          {orderItems.map((item) => (
                            <div key={item.id} className="flex gap-3 p-2 border rounded">
                              {item.product_image && (
                                <div className="w-16 h-16 bg-secondary/20 rounded overflow-hidden flex-shrink-0">
                                  <img
                                    src={item.product_image}
                                    alt={item.product_title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="font-medium">{item.product_title}</p>
                                {item.product_variant && (
                                  <p className="text-sm text-muted-foreground">
                                    {item.product_variant}
                                  </p>
                                )}
                                <p className="text-sm">
                                  Quantité: {item.quantity} × {item.price.toFixed(2)} {order.currency}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Historique du suivi</CardTitle>
                  <CardDescription>
                    Suivez l'évolution de votre commande
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {trackingEvents.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        Aucun événement de suivi disponible
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {trackingEvents.map((event, index) => (
                        <div
                          key={event.id}
                          className={`flex gap-4 pb-4 ${
                            index !== trackingEvents.length - 1 ? "border-b" : ""
                          }`}
                        >
                          <div className="flex-shrink-0">
                            {getStatusIcon(event.status)}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">
                              {getStatusLabel(event.status)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {event.description}
                            </p>
                            {event.location && (
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3" />
                                {event.location}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(event.created_at).toLocaleString("fr-FR")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
