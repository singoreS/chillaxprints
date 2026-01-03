import { useState, useEffect } from "react";
import { Instagram, Camera, Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import social1 from "@/assets/social-1.jpg";
import social2 from "@/assets/social-2.jpg";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import lifestyle3 from "@/assets/lifestyle-3.jpg";
import heroImage from "@/assets/hero-chill.jpg";

interface CustomerPhoto {
  id: string;
  customer_name: string;
  customer_instagram: string | null;
  photo_url: string;
  caption: string | null;
}

// Placeholder photos until real UGC is collected
const placeholderPhotos: CustomerPhoto[] = [
  {
    id: "placeholder-1",
    customer_name: "Marie",
    customer_instagram: "@marie_chill",
    photo_url: social1,
    caption: "Mon nouveau hoodie préféré 💜 #ChillaxPrints",
  },
  {
    id: "placeholder-2",
    customer_name: "Thomas",
    customer_instagram: "@tom_lazy",
    photo_url: social2,
    caption: "Dimanche mode activé 😴 #LazyButLegendary",
  },
  {
    id: "placeholder-3",
    customer_name: "Emma",
    customer_instagram: "@emma.style",
    photo_url: lifestyle1,
    caption: "Le confort avant tout ✨",
  },
  {
    id: "placeholder-4",
    customer_name: "Lucas",
    customer_instagram: "@lucas_vibes",
    photo_url: lifestyle2,
    caption: "Chill time avec mon café ☕",
  },
  {
    id: "placeholder-5",
    customer_name: "Julie",
    customer_instagram: "@julie_relax",
    photo_url: lifestyle3,
    caption: "Weekend vibes 🌿 #ChillaxPrints",
  },
  {
    id: "placeholder-6",
    customer_name: "Alex",
    customer_instagram: "@alex_lazy",
    photo_url: heroImage,
    caption: "Living my best lazy life 😎",
  },
];

interface UGCGalleryProps {
  showTitle?: boolean;
  showSubmitButton?: boolean;
}

export const UGCGallery = ({ showTitle = true, showSubmitButton = true }: UGCGalleryProps) => {
  const [photos, setPhotos] = useState<CustomerPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data, error } = await supabase
          .from("customer_photos")
          .select("*")
          .eq("is_approved", true)
          .order("created_at", { ascending: false })
          .limit(6);

        if (error) throw error;

        // Use placeholder photos if no real photos exist
        setPhotos(data && data.length > 0 ? data : placeholderPhotos);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setPhotos(placeholderPhotos);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="py-12">
        <div className="container px-4">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      <div className="container px-4 md:px-6">
        {showTitle && (
          <div className="text-center mb-8 md:mb-12 space-y-2 md:space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20">
              <Instagram className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-medium text-pink-600">#ChillaxPrints</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Notre <span className="text-primary">communauté</span> chill
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Partagez vos looks avec #ChillaxPrints et apparaissez ici !
            </p>
          </div>
        )}

        {/* Photo Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative aspect-square group cursor-pointer overflow-hidden rounded-xl"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={photo.photo_url}
                alt={`Photo de ${photo.customer_name}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
                hoveredIndex === index ? "opacity-100" : "opacity-0"
              }`}>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                  <p className="font-medium text-sm truncate">{photo.customer_name}</p>
                  {photo.customer_instagram && (
                    <p className="text-xs text-white/70 flex items-center gap-1">
                      <Instagram className="w-3 h-3" />
                      {photo.customer_instagram}
                    </p>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <Heart className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Submit CTA */}
        {showSubmitButton && (
          <div className="mt-8 md:mt-12 text-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="gap-2">
                  <Camera className="w-5 h-5" />
                  Partager ma photo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center">Partagez votre style !</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-center py-4">
                  <p className="text-muted-foreground">
                    Postez votre photo sur Instagram avec le hashtag <span className="font-bold text-primary">#ChillaxPrints</span> et identifiez-nous <span className="font-bold">@chillaxprints</span>
                  </p>
                  <div className="py-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-2xl flex items-center justify-center">
                      <Instagram className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Les meilleures photos seront partagées sur notre site et nos réseaux !
                  </p>
                  <Button asChild className="w-full gap-2">
                    <a href="https://instagram.com/chillaxprints" target="_blank" rel="noopener noreferrer">
                      <Instagram className="w-4 h-4" />
                      Aller sur Instagram
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </section>
  );
};

export default UGCGallery;