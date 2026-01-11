import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "@/components/SEO";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { CookieConsent } from "@/components/CookieConsent";
import { NotificationProvider } from "@/components/NotificationProvider";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import OrderTracking from "./pages/OrderTracking";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfSale from "./pages/TermsOfSale";
import ReturnPolicy from "./pages/ReturnPolicy";
import Shipping from "./pages/Shipping";
import SizeGuide from "./pages/SizeGuide";
import FAQ from "./pages/FAQ";
import Affiliate from "./pages/Affiliate";
import Collection from "./pages/Collection";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NotificationProvider>
            <NewsletterPopup />
            <CookieConsent />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/boutique" element={<Shop />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/produit/:id" element={<Product />} />
              <Route path="/panier" element={<Cart />} />
              <Route path="/favoris" element={<Wishlist />} />
              <Route path="/connexion" element={<Auth />} />
              <Route path="/compte" element={<Account />} />
              <Route path="/suivi-commande" element={<OrderTracking />} />
              <Route path="/livraison" element={<Shipping />} />
              <Route path="/retours" element={<ReturnPolicy />} />
              <Route path="/cgv" element={<TermsOfSale />} />
              <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
              <Route path="/guide-des-tailles" element={<SizeGuide />} />
              <Route path="/faq" element={<FAQ />} />
              
              <Route path="/affiliation" element={<Affiliate />} />
              <Route path="/collection/:slug" element={<Collection />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </NotificationProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
