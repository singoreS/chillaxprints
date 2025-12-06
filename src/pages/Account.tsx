import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Loader2, Package, MapPin, User as UserIcon, Plus, Trash2, LogOut } from "lucide-react";

interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
}

interface Address {
  id: string;
  label: string;
  first_name: string;
  last_name: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  postal_code: string;
  country: string;
  phone: string | null;
  is_default: boolean;
}

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  currency: string;
  status: string;
  created_at: string;
}

const Account = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddAddress, setShowAddAddress] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/connexion");
      } else {
        setTimeout(() => {
          loadProfile(session.user.id);
          loadOrders(session.user.id);
          loadAddresses(session.user.id);
        }, 0);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/connexion");
      } else {
        loadProfile(session.user.id);
        loadOrders(session.user.id);
        loadAddresses(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  const loadAddresses = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", userId)
        .order("is_default", { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
    } catch (error) {
      console.error("Error loading addresses:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleAddAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase.from("addresses").insert({
        user_id: user.id,
        label: formData.get("label") as string,
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
        address_line1: formData.get("address_line1") as string,
        address_line2: formData.get("address_line2") as string || null,
        city: formData.get("city") as string,
        postal_code: formData.get("postal_code") as string,
        country: formData.get("country") as string,
        phone: formData.get("phone") as string || null,
      });

      if (error) throw error;
      
      toast.success("Adresse ajoutée");
      setShowAddAddress(false);
      loadAddresses(user.id);
      e.currentTarget.reset();
    } catch (error) {
      toast.error("Erreur lors de l'ajout de l'adresse");
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("addresses")
        .delete()
        .eq("id", addressId);

      if (error) throw error;
      
      toast.success("Adresse supprimée");
      loadAddresses(user.id);
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Mon Compte"
        description="Gérez votre compte ChillaxPrints. Consultez vos commandes, adresses et informations personnelles."
        keywords="mon compte, espace client, commandes, profil"
        canonicalUrl="/compte"
        noIndex={true}
      />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Mon Compte</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">
                <UserIcon className="mr-2 h-4 w-4" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="orders">
                <Package className="mr-2 h-4 w-4" />
                Commandes
              </TabsTrigger>
              <TabsTrigger value="addresses">
                <MapPin className="mr-2 h-4 w-4" />
                Adresses
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Gérez vos informations de compte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Prénom</Label>
                      <p className="text-lg">{profile?.first_name || "-"}</p>
                    </div>
                    <div>
                      <Label>Nom</Label>
                      <p className="text-lg">{profile?.last_name || "-"}</p>
                    </div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-lg">{profile?.email || "-"}</p>
                  </div>
                  <div>
                    <Label>Téléphone</Label>
                    <p className="text-lg">{profile?.phone || "Non renseigné"}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des commandes</CardTitle>
                  <CardDescription>
                    Consultez vos commandes passées
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Aucune commande</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">Commande #{order.order_number}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.created_at).toLocaleDateString("fr-FR")}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{order.total_amount.toFixed(2)} {order.currency}</p>
                              <p className="text-sm text-muted-foreground capitalize">{order.status}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Mes adresses</CardTitle>
                      <CardDescription>
                        Gérez vos adresses de livraison
                      </CardDescription>
                    </div>
                    <Button onClick={() => setShowAddAddress(!showAddAddress)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {showAddAddress && (
                    <form onSubmit={handleAddAddress} className="border rounded-lg p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="label">Libellé</Label>
                          <Input id="label" name="label" placeholder="Maison, Bureau..." required />
                        </div>
                        <div>
                          <Label htmlFor="country">Pays</Label>
                          <Input id="country" name="country" defaultValue="France" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="first_name">Prénom</Label>
                          <Input id="first_name" name="first_name" required />
                        </div>
                        <div>
                          <Label htmlFor="last_name">Nom</Label>
                          <Input id="last_name" name="last_name" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address_line1">Adresse</Label>
                        <Input id="address_line1" name="address_line1" required />
                      </div>
                      <div>
                        <Label htmlFor="address_line2">Complément d'adresse</Label>
                        <Input id="address_line2" name="address_line2" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="postal_code">Code postal</Label>
                          <Input id="postal_code" name="postal_code" required />
                        </div>
                        <div>
                          <Label htmlFor="city">Ville</Label>
                          <Input id="city" name="city" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input id="phone" name="phone" type="tel" />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit">Enregistrer</Button>
                        <Button type="button" variant="outline" onClick={() => setShowAddAddress(false)}>
                          Annuler
                        </Button>
                      </div>
                    </form>
                  )}

                  {addresses.length === 0 ? (
                    <div className="text-center py-8">
                      <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Aucune adresse enregistrée</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {addresses.map((address) => (
                        <div key={address.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">{address.label}</p>
                              <p className="text-sm">
                                {address.first_name} {address.last_name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {address.address_line1}
                                {address.address_line2 && `, ${address.address_line2}`}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {address.postal_code} {address.city}, {address.country}
                              </p>
                              {address.phone && (
                                <p className="text-sm text-muted-foreground">
                                  Tél: {address.phone}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteAddress(address.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
