import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Gift, 
  TrendingUp, 
  Star, 
  ArrowRight, 
  Sparkles,
  ShoppingBag,
  Clock,
  ChevronRight
} from "lucide-react";
import { useLoyaltyPoints, LOYALTY_TIERS, POINTS_TO_EURO, POINTS_PER_EURO } from "@/hooks/useLoyaltyPoints";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export const LoyaltyCard = () => {
  const { 
    user, 
    loyaltyPoints, 
    transactions, 
    isLoading, 
    getProgressToNextTier,
    pointsToDiscount
  } = useLoyaltyPoints();

  if (!user) {
    return (
      <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="p-6 text-center">
          <Gift className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">Programme Fidélité</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Connectez-vous pour accumuler des points et profiter d'avantages exclusifs !
          </p>
          <Button asChild>
            <Link to="/connexion">
              Se connecter <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  const tier = loyaltyPoints?.tier || "bronze";
  const tierConfig = LOYALTY_TIERS[tier];
  const { nextTier, progress, pointsNeeded } = getProgressToNextTier();
  const balance = loyaltyPoints?.points_balance || 0;
  const discountValue = pointsToDiscount(balance);

  return (
    <Card className="overflow-hidden">
      {/* Header with tier badge */}
      <div className={`p-4 ${tierConfig.bgColor} border-b ${tierConfig.borderColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{tierConfig.emoji}</span>
            <div>
              <h3 className={`font-bold ${tierConfig.color}`}>Membre {tierConfig.name}</h3>
              <p className="text-xs text-muted-foreground">
                {tierConfig.pointsMultiplier * POINTS_PER_EURO} points par € dépensé
              </p>
            </div>
          </div>
          <Sparkles className={`w-5 h-5 ${tierConfig.color}`} />
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Points balance */}
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground mb-1">Vos points</p>
          <div className="text-4xl font-bold text-primary">{balance.toLocaleString("fr-FR")}</div>
          <p className="text-sm text-muted-foreground mt-1">
            = <span className="font-semibold text-foreground">{discountValue.toFixed(2)}€</span> de réduction
          </p>
        </div>

        {/* Progress to next tier */}
        {nextTier && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Prochain niveau: {nextTier.name}</span>
              <span className="font-medium">{pointsNeeded} pts restants</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Tier benefits */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            Vos avantages
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {tierConfig.benefits.slice(0, 3).map((benefit, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {benefit}
              </Badge>
            ))}
          </div>
        </div>

        {/* Recent transactions */}
        {transactions && transactions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              Dernières activités
            </h4>
            <ScrollArea className="h-24">
              <div className="space-y-2">
                {transactions.slice(0, 3).map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {tx.transaction_type === "earn" || tx.transaction_type === "bonus" ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <ShoppingBag className="w-3 h-3 text-primary" />
                      )}
                      <span className="text-muted-foreground truncate max-w-[150px]">
                        {tx.description}
                      </span>
                    </div>
                    <span className={tx.points > 0 ? "text-green-600 font-medium" : "text-muted-foreground"}>
                      {tx.points > 0 ? "+" : ""}{tx.points}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* CTA */}
        <Button asChild variant="outline" className="w-full" size="sm">
          <Link to="/compte?tab=fidelite">
            Voir mon programme fidélité
            <ChevronRight className="ml-1 w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

// Compact version for header/sidebar
export const LoyaltyBadge = () => {
  const { user, loyaltyPoints, isLoading } = useLoyaltyPoints();

  if (!user || isLoading) return null;

  const tier = loyaltyPoints?.tier || "bronze";
  const tierConfig = LOYALTY_TIERS[tier];
  const balance = loyaltyPoints?.points_balance || 0;

  return (
    <Link 
      to="/compte?tab=fidelite"
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${tierConfig.bgColor} ${tierConfig.color} border ${tierConfig.borderColor} hover:opacity-80 transition-opacity`}
    >
      <span>{tierConfig.emoji}</span>
      <span>{balance.toLocaleString("fr-FR")} pts</span>
    </Link>
  );
};

// Info card explaining the program
export const LoyaltyInfoCard = () => {
  return (
    <Card className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-primary" />
          Programme Fidélité ChillaxPrints
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">
          <strong>1€ dépensé = {POINTS_PER_EURO} points</strong>. Utilisez vos points pour des réductions : 
          {POINTS_TO_EURO} points = 1€ de réduction.
        </p>

        <div className="grid gap-4">
          {Object.entries(LOYALTY_TIERS).map(([key, tier]) => (
            <div 
              key={key} 
              className={`p-4 rounded-lg border-2 ${tier.bgColor} ${tier.borderColor}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{tier.emoji}</span>
                <div>
                  <h4 className={`font-bold ${tier.color}`}>{tier.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    Dès {tier.minSpend}€ d'achats cumulés
                  </p>
                </div>
                <Badge className="ml-auto" variant="secondary">
                  x{tier.pointsMultiplier}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tier.benefits.map((benefit, i) => (
                  <span key={i} className="text-xs text-muted-foreground">
                    • {benefit}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
