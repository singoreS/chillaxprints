import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Menu, Heart } from "lucide-react";
import logo from "@/assets/logo.png";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchBar } from "@/components/SearchBar";
import { PromoBanner } from "@/components/PromoBanner";
import { NotificationCenter } from "@/components/NotificationCenter";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useWishlistStore } from "@/stores/wishlistStore";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const wishlistItems = useWishlistStore(state => state.items);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/boutique", label: "Boutique" },
    { to: "/blog", label: "Blog" },
    { to: "/a-propos", label: "À Propos" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <PromoBanner />
      <header className="sticky top-0 z-50 w-full border-b-2 border-border/50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-[var(--shadow-soft)]">
        <div className="container flex h-16 md:h-20 items-center justify-between gap-2 md:gap-4 px-3 md:px-6">
        <Link to="/" className="flex items-center flex-shrink-0 group min-w-0">
          <img 
            src={logo} 
            alt="ChillaxPrints" 
            className="h-8 xs:h-9 sm:h-10 md:h-12 lg:h-14 w-auto max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-none object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex flex-1 max-w-md mx-4">
          <SearchBar />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-semibold transition-all duration-300 hover:text-primary hover:scale-105 whitespace-nowrap relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
          {user && <NotificationCenter />}
          <Link to={user ? "/compte" : "/connexion"} className="hidden sm:block">
            <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
              <User className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </Link>
          <Link to="/favoris" className="relative">
            <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
              <Heart className="h-4 w-4 md:h-5 md:w-5" />
              {wishlistItems.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 flex items-center justify-center text-[10px] md:text-xs bg-accent">
                  {wishlistItems.length}
                </Badge>
              )}
            </Button>
          </Link>
          <CartDrawer />

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-8">
                {/* Mobile Search */}
                <div className="lg:hidden">
                  <SearchBar />
                </div>
                
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Mobile User Link */}
                <Link 
                  to={user ? "/compte" : "/connexion"} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium transition-colors hover:text-primary flex items-center gap-2"
                >
                  <User className="h-5 w-5" />
                  {user ? "Mon Compte" : "Connexion"}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      </header>
    </>
  );
};

export default Header;
