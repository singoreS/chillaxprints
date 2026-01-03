import { useState } from "react";
import { Star, Camera, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const reviewSchema = z.object({
  customer_name: z.string().trim().min(2, "Nom trop court").max(50, "Nom trop long"),
  customer_email: z.string().trim().email("Email invalide"),
  rating: z.number().min(1).max(5),
  title: z.string().trim().max(100, "Titre trop long").optional(),
  content: z.string().trim().min(10, "Avis trop court (min 10 caractères)").max(1000, "Avis trop long"),
});

interface ReviewFormProps {
  productId?: string;
  onSuccess?: () => void;
}

export const ReviewForm = ({ productId, onSuccess }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [instagram, setInstagram] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("L'image ne doit pas dépasser 5MB");
        return;
      }
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form
    const result = reviewSchema.safeParse({
      customer_name: name,
      customer_email: email,
      rating,
      title: title || undefined,
      content,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (rating === 0) {
      setErrors({ rating: "Veuillez donner une note" });
      return;
    }

    setLoading(true);

    try {
      // Insert review
      const { data: reviewData, error: reviewError } = await supabase
        .from("customer_reviews")
        .insert({
          customer_name: name.trim(),
          customer_email: email.trim(),
          rating,
          title: title.trim() || null,
          content: content.trim(),
          product_id: productId || null,
          is_approved: false, // Requires admin approval
        })
        .select()
        .single();

      if (reviewError) throw reviewError;

      // Upload photo if provided
      if (photo && reviewData) {
        const fileExt = photo.name.split('.').pop();
        const fileName = `${reviewData.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("customer-photos")
          .upload(fileName, photo);

        if (uploadError) {
          console.error("Photo upload error:", uploadError);
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from("customer-photos")
            .getPublicUrl(fileName);

          // Insert customer photo record
          await supabase.from("customer_photos").insert({
            review_id: reviewData.id,
            customer_name: name.trim(),
            customer_instagram: instagram.trim() || null,
            photo_url: publicUrl,
            caption: content.trim().substring(0, 200),
            is_approved: false,
          });
        }
      }

      setSubmitted(true);
      toast.success("Merci pour votre avis ! Il sera publié après validation.");
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="border-2 border-green-500/30 bg-green-500/5">
        <CardContent className="py-12 text-center">
          <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Merci pour votre avis !</h3>
          <p className="text-muted-foreground">
            Votre avis sera publié après validation par notre équipe.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Laisser un avis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="space-y-2">
            <Label>Votre note *</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && <p className="text-sm text-destructive">{errors.rating}</p>}
          </div>

          {/* Name & Email */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Votre prénom *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Marie"
                maxLength={50}
              />
              {errors.customer_name && <p className="text-sm text-destructive">{errors.customer_name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Votre email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="marie@example.com"
                maxLength={255}
              />
              {errors.customer_email && <p className="text-sm text-destructive">{errors.customer_email}</p>}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Titre de l'avis (optionnel)</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Super produit !"
              maxLength={100}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Votre avis *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Partagez votre expérience avec ce produit..."
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground text-right">{content.length}/1000</p>
            {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Ajouter une photo (optionnel)</Label>
            <div className="flex items-start gap-4">
              <label className="flex-shrink-0 w-24 h-24 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <>
                    <Camera className="w-6 h-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground mt-1">Photo</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
              <div className="flex-1 space-y-2">
                <Input
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@votre_instagram (optionnel)"
                  maxLength={50}
                />
                <p className="text-xs text-muted-foreground">
                  Partagez votre Instagram pour être crédité si votre photo est publiée !
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full gap-2">
            {loading ? (
              "Envoi en cours..."
            ) : (
              <>
                <Send className="w-4 h-4" />
                Envoyer mon avis
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Votre avis sera visible après validation par notre équipe. Votre email ne sera pas publié.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;