import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Connexion réussie ! 🎉",
      description: "Bienvenue sur ChillaxPrints",
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Compte créé ! 🎉",
      description: "Bienvenue dans la famille ChillaxPrints",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Bon retour ! 👋</CardTitle>
                  <CardDescription>
                    Connectez-vous à votre compte ChillaxPrints
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label htmlFor="login-email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="login-password" className="block text-sm font-medium mb-2">
                        Mot de passe
                      </label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Se souvenir de moi</span>
                      </label>
                      <Link to="/mot-de-passe-oublie" className="text-primary hover:underline">
                        Mot de passe oublié ?
                      </Link>
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Se connecter
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Rejoignez-nous ! 🎉</CardTitle>
                  <CardDescription>
                    Créez votre compte et profitez d'avantages exclusifs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label htmlFor="register-name" className="block text-sm font-medium mb-2">
                        Nom complet
                      </label>
                      <Input
                        id="register-name"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="register-email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="register-email"
                        type="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="register-password" className="block text-sm font-medium mb-2">
                        Mot de passe
                      </label>
                      <Input
                        id="register-password"
                        type="password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                        Confirmer le mot de passe
                      </label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      En créant un compte, vous acceptez nos{" "}
                      <Link to="/conditions" className="text-primary hover:underline">
                        Conditions d'utilisation
                      </Link>
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Créer mon compte
                    </Button>
                  </form>
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

export default Login;
