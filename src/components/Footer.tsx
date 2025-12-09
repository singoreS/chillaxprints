import { Link } from "react-router-dom";
import { Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t-2 border-border/50 bg-gradient-to-b from-background to-muted/30">
      <div className="container py-8 md:py-12 lg:py-16 px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <img 
              src={logo} 
              alt="ChillaxPrints" 
              className="h-12 md:h-14 w-auto mb-3 md:mb-4"
            />
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Des vêtements pour les esprits drôles et paresseux. Lazy but Legendary 🎯
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm md:text-base lg:text-lg mb-2 md:mb-4 text-foreground">Navigation</h4>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
              <li>
                <Link to="/boutique" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Boutique
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm md:text-base lg:text-lg mb-2 md:mb-4 text-foreground">Informations</h4>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
              <li>
                <Link to="/guide-des-tailles" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Guide des Tailles
                </Link>
              </li>
              <li>
                <Link to="/livraison" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="/retours" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Retours
                </Link>
              </li>
              <li>
                <Link to="/cgv" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  CGV
                </Link>
              </li>
              <li>
                <Link to="/politique-confidentialite" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold text-sm md:text-base lg:text-lg mb-2 md:mb-4 text-foreground">Suivez-nous</h4>
            <div className="flex space-x-3 md:space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-3 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 shadow-[var(--shadow-soft)]"
              >
                <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-3 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 shadow-[var(--shadow-soft)]"
              >
                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t text-center text-xs md:text-sm text-muted-foreground">
          <p>© 2024 ChillaxPrints. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
