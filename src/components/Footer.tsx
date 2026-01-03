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
              className="h-10 sm:h-12 md:h-14 w-auto max-w-[140px] sm:max-w-[160px] md:max-w-none object-contain mb-3 md:mb-4"
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
              <a
                href="https://pinterest.com/chillaxprints"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 md:p-3 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 shadow-[var(--shadow-soft)]"
              >
                <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
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
