import { Link } from "react-router-dom";
import { useLoyaltyPoints, LOYALTY_TIERS } from "@/hooks/useLoyaltyPoints";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const LoyaltyBadge = () => {
  const { loyaltyPoints, isLoading, getProgressToNextTier } = useLoyaltyPoints();

  if (isLoading || !loyaltyPoints) {
    return null;
  }

  const currentTierKey = loyaltyPoints.tier || 'bronze';
  const tierConfig = LOYALTY_TIERS[currentTierKey];
  const { nextTier, pointsNeeded } = getProgressToNextTier();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link 
            to="/compte" 
            className={`hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105 ${tierConfig.bgColor} ${tierConfig.color} border ${tierConfig.borderColor}`}
          >
            <span>{tierConfig.emoji}</span>
            <span className="hidden md:inline">{tierConfig.name}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="p-3">
          <div className="space-y-1 text-center">
            <p className="font-semibold">{tierConfig.name} {tierConfig.emoji}</p>
            <p className="text-muted-foreground text-xs">{loyaltyPoints.points_balance} points disponibles</p>
            {nextTier && (
              <p className="text-xs text-primary">
                Plus que {pointsNeeded} points pour {nextTier.name}!
              </p>
            )}
            {tierConfig.discount > 0 && (
              <p className="text-xs font-medium text-green-600">-{tierConfig.discount}% sur vos commandes</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
