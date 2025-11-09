import { Link } from "react-router-dom";
import { Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">ChillaxPrints</h3>
            <p className="text-sm text-muted-foreground">
              Des vêtements pour les esprits drôles et paresseux.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/boutique" className="text-muted-foreground hover:text-primary transition-colors">
                  Boutique
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-muted-foreground hover:text-primary transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Informations</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/mentions-legales" className="text-muted-foreground hover:text-primary transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/politique-retour" className="text-muted-foreground hover:text-primary transition-colors">
                  Politique de retour
                </Link>
              </li>
              <li>
                <Link to="/livraison" className="text-muted-foreground hover:text-primary transition-colors">
                  Livraison
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 ChillaxPrints. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
