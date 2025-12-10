import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  DollarSign, 
  Link as LinkIcon, 
  TrendingUp, 
  Copy, 
  CheckCircle2, 
  ArrowRight,
  Percent,
  Gift,
  BarChart3
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface AffiliateData {
  id: string;
  affiliate_code: string;
  commission_rate: number;
  total_earnings: number;
  total_sales: number;
  status: string;
  paypal_email: string | null;
}

interface Commission {
  id: string;
  order_amount: number;
  commission_amount: number;
  status: string;
  created_at: string;
}

const Affiliate = () => {
  const [user, setUser] = useState<User | null>(null);
  const [affiliateData, setAffiliateData] = useState<AffiliateData | null>(null);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paypalEmail, setPaypalEmail] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        // Fetch affiliate data
        const { data: affiliate } = await supabase
          .from('affiliates')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (affiliate) {
          setAffiliateData(affiliate);
          setPaypalEmail(affiliate.paypal_email || "");

          // Fetch commissions
          const { data: commissionsData } = await supabase
            .from('affiliate_commissions')
            .select('*')
            .eq('affiliate_id', affiliate.id)
            .order('created_at', { ascending: false })
            .limit(10);

          if (commissionsData) {
            setCommissions(commissionsData);
          }
        }
      }
      setIsLoading(false);
    };

    fetchData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleBecomeAffiliate = async () => {
    if (!user) {
      toast.error("Tu dois être connecté pour devenir affilié");
      return;
    }

    try {
      // Generate affiliate code
      const { data: codeData, error: codeError } = await supabase.rpc('generate_affiliate_code');
      
      if (codeError) throw codeError;

      const { data, error } = await supabase
        .from('affiliates')
        .insert({
          user_id: user.id,
          affiliate_code: codeData,
        })
        .select()
        .single();

      if (error) throw error;

      setAffiliateData(data);
      toast.success("Bienvenue dans le programme d'affiliation ! 🎉");
    } catch (error) {
      console.error('Error becoming affiliate:', error);
      toast.error("Erreur lors de l'inscription au programme");
    }
  };

  const handleUpdatePaypal = async () => {
    if (!affiliateData) return;

    try {
      const { error } = await supabase
        .from('affiliates')
        .update({ paypal_email: paypalEmail })
        .eq('id', affiliateData.id);

      if (error) throw error;

      toast.success("Email PayPal mis à jour !");
    } catch (error) {
      console.error('Error updating PayPal:', error);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const copyAffiliateLink = () => {
    if (!affiliateData) return;
    const link = `${window.location.origin}?ref=${affiliateData.affiliate_code}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Lien copié !");
    setTimeout(() => setCopied(false), 2000);
  };

  const benefits = [
    {
      icon: Percent,
      title: "10% de commission",
      description: "Gagne 10% sur chaque vente générée par ton lien d'affiliation.",
    },
    {
      icon: Gift,
      title: "Cookies 30 jours",
      description: "Les visiteurs ont 30 jours pour acheter après avoir cliqué sur ton lien.",
    },
    {
      icon: BarChart3,
      title: "Dashboard complet",
      description: "Suis tes clics, ventes et commissions en temps réel.",
    },
    {
      icon: DollarSign,
      title: "Paiements mensuels",
      description: "Reçois tes gains chaque mois via PayPal.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Programme d'Affiliation | ChillaxPrints"
        description="Rejoins le programme d'affiliation ChillaxPrints et gagne 10% de commission sur chaque vente. Deviens partenaire et monétise ton audience."
        canonicalUrl="/affiliation"
      />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <div className="container relative z-10 px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
                <Users className="h-3 w-3 mr-1" />
                Programme d'affiliation
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Gagne de l'argent en <span className="text-primary">partageant</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Rejoins notre programme d'affiliation et gagne 10% de commission sur chaque vente. C'est gratuit, simple et rentable ! 💰
              </p>
              {!user ? (
                <Link to="/connexion">
                  <Button size="lg" className="group">
                    Connecte-toi pour commencer
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : !affiliateData ? (
                <Button size="lg" className="group" onClick={handleBecomeAffiliate}>
                  <Users className="h-5 w-5 mr-2" />
                  Devenir affilié
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              ) : (
                <a href="#dashboard">
                  <Button size="lg" className="group">
                    Voir mon dashboard
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pourquoi devenir affilié ?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Un programme simple et transparent pour monétiser ton audience.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center border-2 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Affiliate Dashboard */}
        {affiliateData && (
          <section id="dashboard" className="py-16">
            <div className="container px-4 md:px-6">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Ton dashboard
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Bienvenue, affilié ! 🎉
                </h2>
              </div>

              {/* Stats Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <CardDescription>Code affilié</CardDescription>
                    <CardTitle className="text-2xl text-primary">{affiliateData.affiliate_code}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <CardDescription>Commission</CardDescription>
                    <CardTitle className="text-2xl">{affiliateData.commission_rate}%</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <CardDescription>Ventes générées</CardDescription>
                    <CardTitle className="text-2xl">{affiliateData.total_sales}</CardTitle>
                  </CardHeader>
                </Card>
                <Card className="border-2 border-primary/30">
                  <CardHeader className="pb-2">
                    <CardDescription>Gains totaux</CardDescription>
                    <CardTitle className="text-2xl text-primary">{affiliateData.total_earnings.toFixed(2)} €</CardTitle>
                  </CardHeader>
                </Card>
              </div>

              {/* Affiliate Link */}
              <Card className="mb-8 border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5 text-primary" />
                    Ton lien d'affiliation
                  </CardTitle>
                  <CardDescription>
                    Partage ce lien pour gagner des commissions sur chaque vente.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      value={`${window.location.origin}?ref=${affiliateData.affiliate_code}`}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button onClick={copyAffiliateLink} variant="outline">
                      {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* PayPal Settings */}
              <Card className="mb-8 border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Paramètres de paiement
                  </CardTitle>
                  <CardDescription>
                    Configure ton email PayPal pour recevoir tes commissions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label htmlFor="paypal">Email PayPal</Label>
                      <Input
                        id="paypal"
                        type="email"
                        placeholder="ton@email.com"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleUpdatePaypal} className="self-end">
                      Sauvegarder
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Commissions */}
              {commissions.length > 0 && (
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Dernières commissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {commissions.map((commission) => (
                        <div key={commission.id} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                          <div>
                            <p className="font-medium">Commande de {commission.order_amount.toFixed(2)} €</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(commission.created_at).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">+{commission.commission_amount.toFixed(2)} €</p>
                            <Badge variant={commission.status === 'paid' ? 'default' : 'secondary'}>
                              {commission.status === 'paid' ? 'Payé' : commission.status === 'pending' ? 'En attente' : commission.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        )}

        {/* How it Works */}
        <section className="py-16 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comment ça marche ?
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold text-lg mb-2">Inscris-toi</h3>
                <p className="text-sm text-muted-foreground">
                  Crée un compte et rejoins le programme gratuitement.
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold text-lg mb-2">Partage ton lien</h3>
                <p className="text-sm text-muted-foreground">
                  Partage ton lien unique sur tes réseaux, blog ou chaîne.
                </p>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold text-lg mb-2">Gagne des commissions</h3>
                <p className="text-sm text-muted-foreground">
                  Reçois 10% sur chaque vente générée par ton lien.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-primary/80 p-8 md:p-12 text-center">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Prêt à gagner de l'argent ?
                </h2>
                <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                  Rejoins des centaines d'affiliés qui monétisent leur audience avec ChillaxPrints ! 🚀
                </p>
                {!user ? (
                  <Link to="/connexion">
                    <Button size="lg" variant="secondary" className="group">
                      Créer un compte
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                ) : !affiliateData ? (
                  <Button size="lg" variant="secondary" className="group" onClick={handleBecomeAffiliate}>
                    Devenir affilié maintenant
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <a href="#dashboard">
                    <Button size="lg" variant="secondary" className="group">
                      Voir mon dashboard
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Affiliate;
