import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  title: string | null;
  content: string;
  created_at: string;
  is_verified_purchase: boolean;
}

interface CustomerReviewsProps {
  productId?: string;
  showTitle?: boolean;
  maxReviews?: number;
}

export const CustomerReviews = ({ productId, showTitle = true, maxReviews = 4 }: CustomerReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let query = supabase
          .from("customer_reviews")
          .select("*")
          .eq("is_approved", true)
          .order("created_at", { ascending: false })
          .limit(maxReviews);

        if (productId) {
          query = query.eq("product_id", productId);
        }

        const { data, error } = await query;

        if (error) throw error;

        setReviews(data || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, maxReviews]);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48 mx-auto" />
          <div className="h-32 bg-muted rounded max-w-2xl mx-auto" />
        </div>
      </div>
    );
  }

  // Don't render section if no reviews
  if (reviews.length === 0) {
    return (
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          {showTitle && (
            <div className="text-center mb-8 space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-yellow-600">Avis Clients</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Avis clients
              </h2>
            </div>
          )}
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Aucun avis pour le moment. Soyez le premier à donner votre avis !
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        {showTitle && (
          <div className="text-center mb-8 md:mb-12 space-y-2 md:space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-yellow-600">Avis Clients</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              Ce que disent nos <span className="text-primary">lazy legends</span>
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Des vrais avis de vrais paresseux assumés
            </p>
          </div>
        )}

        {/* Desktop: Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {reviews.slice(0, 4).map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2">
                <CardContent className="p-6 flex flex-col h-full">
                  <Quote className="w-8 h-8 text-primary/20 mb-4" />
                  
                  <div className="mb-3">
                    {renderStars(review.rating)}
                  </div>
                  
                  {review.title && (
                    <h4 className="font-semibold text-lg mb-2">{review.title}</h4>
                  )}
                  
                  <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
                    "{review.content}"
                  </p>
                  
                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{review.customer_name}</p>
                      {review.is_verified_purchase && (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          ✓ Achat vérifié
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Carousel View */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-2">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-primary/20 mb-4" />
                    
                    <div className="mb-3">
                      {renderStars(reviews[currentIndex]?.rating || 5)}
                    </div>
                    
                    {reviews[currentIndex]?.title && (
                      <h4 className="font-semibold text-lg mb-2">{reviews[currentIndex].title}</h4>
                    )}
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      "{reviews[currentIndex]?.content}"
                    </p>
                    
                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{reviews[currentIndex]?.customer_name}</p>
                        {reviews[currentIndex]?.is_verified_purchase && (
                          <p className="text-xs text-green-600">✓ Achat vérifié</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <Button variant="outline" size="icon" onClick={prevReview}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary w-4" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={nextReview}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Average Rating Display */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-muted/50 rounded-full">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-bold text-lg">4.9/5</span>
            <span className="text-muted-foreground text-sm">basé sur {reviews.length}+ avis</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;