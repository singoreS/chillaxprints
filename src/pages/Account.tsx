import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { Loader2, Package, MapPin, User as UserIcon, Plus, Trash2, LogOut, Gift } from "lucide-react";
import { LoyaltyCard, LoyaltyInfoCard } from "@/components/LoyaltyCard";

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
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  
  // Get default tab from URL params
  const defaultTab = searchParams.get("tab") || "profile";

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
      <main className="flex-1 container mx-auto px-4 py-4 md:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Mon Compte</h1>
            <Button variant="outline" onClick={handleLogout} size="sm" className="text-xs md:text-sm">
              <LogOut className="mr-1.5 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              Déconnexion
            </Button>
          </div>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-auto">
              <TabsTrigger value="profile" className="text-xs md:text-sm py-2 md:py-2.5 px-1 md:px-3">
                <UserIcon className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Profil</span>
                <span className="sm:hidden">Profil</span>
              </TabsTrigger>
              <TabsTrigger value="fidelite" className="text-xs md:text-sm py-2 md:py-2.5 px-1 md:px-3">
                <Gift className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Fidélité</span>
                <span className="sm:hidden">Pts</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="text-xs md:text-sm py-2 md:py-2.5 px-1 md:px-3">
                <Package className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Commandes</span>
                <span className="sm:hidden">Cmd</span>
              </TabsTrigger>
              <TabsTrigger value="addresses" className="text-xs md:text-sm py-2 md:py-2.5 px-1 md:px-3">
                <MapPin className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Adresses</span>
                <span className="sm:hidden">Adr</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-4 md:mt-6">
              <Card>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-base md:text-lg">Informations personnelles</CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Gérez vos informations de compte
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 md:pt-0 space-y-3 md:space-y-4">
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <Label className="text-xs md:text-sm">Prénom</Label>
                      <p className="text-sm md:text-lg">{profile?.first_name || "-"}</p>
                    </div>
                    <div>
                      <Label className="text-xs md:text-sm">Nom</Label>
                      <p className="text-sm md:text-lg">{profile?.last_name || "-"}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs md:text-sm">Email</Label>
                    <p className="text-sm md:text-lg break-all">{profile?.email || "-"}</p>
                  </div>
                  <div>
                    <Label className="text-xs md:text-sm">Téléphone</Label>
                    <p className="text-sm md:text-lg">{profile?.phone || "Non renseigné"}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fidelite" className="mt-4 md:mt-6 space-y-4 md:space-y-6">
              <LoyaltyCard />
              <LoyaltyInfoCard />
            </TabsContent>

            <TabsContent value="orders" className="mt-4 md:mt-6">
              <Card>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-base md:text-lg">Historique des commandes</CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Consultez vos commandes passées
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                  {orders.length === 0 ? (
                    <div className="text-center py-6 md:py-8">
                      <Package className="h-10 w-10 md:h-12 md:w-12 mx-auto text-muted-foreground mb-3 md:mb-4" />
                      <p className="text-sm md:text-base text-muted-foreground">Aucune commande</p>
                    </div>
                  ) : (
                    <div className="space-y-3 md:space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-3 md:p-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                            <div>
                              <p className="font-semibold text-sm md:text-base">Commande #{order.order_number}</p>
                              <p className="text-xs md:text-sm text-muted-foreground">
                                {new Date(order.created_at).toLocaleDateString("fr-FR")}
                              </p>
                            </div>
                            <div className="text-left sm:text-right">
                              <p className="font-bold text-sm md:text-base">{order.total_amount.toFixed(2)} {order.currency}</p>
                              <p className="text-xs md:text-sm text-muted-foreground capitalize">{order.status}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses" className="mt-4 md:mt-6">
              <Card>
                <CardHeader className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <CardTitle className="text-base md:text-lg">Mes adresses</CardTitle>
                      <CardDescription className="text-xs md:text-sm">
                        Gérez vos adresses de livraison
                      </CardDescription>
                    </div>
                    <Button onClick={() => setShowAddAddress(!showAddAddress)} size="sm" className="text-xs md:text-sm">
                      <Plus className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                      Ajouter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 md:pt-0 space-y-3 md:space-y-4">
                  {showAddAddress && (
                    <form onSubmit={handleAddAddress} className="border rounded-lg p-3 md:p-4 space-y-3 md:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        <div>
                          <Label htmlFor="label" className="text-xs md:text-sm">Libellé</Label>
                          <Input id="label" name="label" placeholder="Maison, Bureau..." required className="text-sm" />
                        </div>
                        <div>
                          <Label htmlFor="country" className="text-xs md:text-sm">Pays</Label>
                          <Input id="country" name="country" defaultValue="France" required className="text-sm" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        <div>
                          <Label htmlFor="first_name" className="text-xs md:text-sm">Prénom</Label>
                          <Input id="first_name" name="first_name" required className="text-sm" />
                        </div>
                        <div>
                          <Label htmlFor="last_name" className="text-xs md:text-sm">Nom</Label>
                          <Input id="last_name" name="last_name" required className="text-sm" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address_line1" className="text-xs md:text-sm">Adresse</Label>
                        <Input id="address_line1" name="address_line1" required className="text-sm" />
                      </div>
                      <div>
                        <Label htmlFor="address_line2" className="text-xs md:text-sm">Complément d'adresse</Label>
                        <Input id="address_line2" name="address_line2" className="text-sm" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        <div>
                          <Label htmlFor="postal_code" className="text-xs md:text-sm">Code postal</Label>
                          <Input id="postal_code" name="postal_code" required className="text-sm" />
                        </div>
                        <div>
                          <Label htmlFor="city" className="text-xs md:text-sm">Ville</Label>
                          <Input id="city" name="city" required className="text-sm" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-xs md:text-sm">Téléphone</Label>
                        <Input id="phone" name="phone" type="tel" className="text-sm" />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" size="sm" className="text-xs md:text-sm">Enregistrer</Button>
                        <Button type="button" variant="outline" size="sm" className="text-xs md:text-sm" onClick={() => setShowAddAddress(false)}>
                          Annuler
                        </Button>
                      </div>
                    </form>
                  )}

                  {addresses.length === 0 ? (
                    <div className="text-center py-6 md:py-8">
                      <MapPin className="h-10 w-10 md:h-12 md:w-12 mx-auto text-muted-foreground mb-3 md:mb-4" />
                      <p className="text-sm md:text-base text-muted-foreground">Aucune adresse enregistrée</p>
                    </div>
                  ) : (
                    <div className="space-y-3 md:space-y-4">
                      {addresses.map((address) => (
                        <div key={address.id} className="border rounded-lg p-3 md:p-4">
                          <div className="flex justify-between items-start gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-sm md:text-base">{address.label}</p>
                              <p className="text-xs md:text-sm">
                                {address.first_name} {address.last_name}
                              </p>
                              <p className="text-xs md:text-sm text-muted-foreground">
                                {address.address_line1}
                                {address.address_line2 && `, ${address.address_line2}`}
                              </p>
                              <p className="text-xs md:text-sm text-muted-foreground">
                                {address.postal_code} {address.city}, {address.country}
                              </p>
                              {address.phone && (
                                <p className="text-xs md:text-sm text-muted-foreground">
                                  Tél: {address.phone}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 md:h-9 md:w-9 flex-shrink-0"
                              onClick={() => handleDeleteAddress(address.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
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
