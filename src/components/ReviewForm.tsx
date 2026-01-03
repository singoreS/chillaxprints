import { useState } from "react";
import { Star, Camera, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
      <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/5 text-center">
        <div className="flex items-center justify-center gap-2 text-green-600">
          <Check className="w-5 h-5" />
          <span className="font-medium">Merci ! Avis en attente de validation.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-lg border bg-card">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Rating inline */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium">Note :</span>
          <div className="flex gap-1">
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
                  className={`w-5 h-5 ${
                    star <= (hoverRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground/30"
                  }`}
                />
              </button>
            ))}
          </div>
          {errors.rating && <p className="text-xs text-destructive">{errors.rating}</p>}
        </div>

        {/* Name & Email - compact grid */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Prénom *"
              maxLength={50}
              className="h-9 text-sm"
            />
            {errors.customer_name && <p className="text-xs text-destructive mt-1">{errors.customer_name}</p>}
          </div>
          <div>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email *"
              maxLength={255}
              className="h-9 text-sm"
            />
            {errors.customer_email && <p className="text-xs text-destructive mt-1">{errors.customer_email}</p>}
          </div>
        </div>

        {/* Content - smaller textarea */}
        <div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Votre avis... *"
            rows={2}
            maxLength={1000}
            className="text-sm resize-none"
          />
          {errors.content && <p className="text-xs text-destructive mt-1">{errors.content}</p>}
        </div>

        {/* Photo upload - compact */}
        <div className="flex items-center gap-2">
          <label className="flex-shrink-0 w-10 h-10 border border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors overflow-hidden">
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-4 h-4 text-muted-foreground" />
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
          <Input
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="@instagram (optionnel)"
            maxLength={50}
            className="h-9 text-sm flex-1"
          />
          <Button type="submit" disabled={loading} size="sm" className="gap-1.5">
            {loading ? "..." : <><Send className="w-3.5 h-3.5" /> Envoyer</>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;