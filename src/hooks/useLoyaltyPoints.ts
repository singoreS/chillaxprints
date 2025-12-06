import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

interface LoyaltyPoints {
  id: string;
  user_id: string;
  points_balance: number;
  total_earned: number;
  total_spent: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  created_at: string;
  updated_at: string;
}

interface LoyaltyTransaction {
  id: string;
  user_id: string;
  points: number;
  transaction_type: 'earn' | 'spend' | 'bonus' | 'expire' | 'adjustment';
  description: string;
  order_id: string | null;
  created_at: string;
}

// Tier configuration
export const LOYALTY_TIERS = {
  bronze: {
    name: "Bronze",
    minPoints: 0,
    pointsMultiplier: 1,
    color: "text-amber-700",
    bgColor: "bg-amber-100",
    borderColor: "border-amber-300",
    emoji: "🥉",
    benefits: ["1 point par € dépensé", "Accès aux ventes privées"],
  },
  silver: {
    name: "Silver",
    minPoints: 500,
    pointsMultiplier: 1.25,
    color: "text-gray-500",
    bgColor: "bg-gray-100",
    borderColor: "border-gray-300",
    emoji: "🥈",
    benefits: ["1.25 points par € dépensé", "Livraison prioritaire", "-5% sur les soldes"],
  },
  gold: {
    name: "Gold",
    minPoints: 2000,
    pointsMultiplier: 1.5,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-400",
    emoji: "🥇",
    benefits: ["1.5 points par € dépensé", "Livraison gratuite", "-10% permanent", "Accès anticipé nouveautés"],
  },
  platinum: {
    name: "Platinum",
    minPoints: 5000,
    pointsMultiplier: 2,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-400",
    emoji: "💎",
    benefits: ["2 points par € dépensé", "Livraison express gratuite", "-15% permanent", "Cadeaux exclusifs", "Service VIP"],
  },
};

// Points conversion rate
export const POINTS_TO_EURO = 100; // 100 points = 1€ de réduction

export const useLoyaltyPoints = () => {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch loyalty points
  const { data: loyaltyPoints, isLoading: isLoadingPoints } = useQuery({
    queryKey: ["loyaltyPoints", user?.id],
    queryFn: async (): Promise<LoyaltyPoints | null> => {
      if (!user) return null;

      const { data, error } = await supabase
        .from("loyalty_points")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data as LoyaltyPoints | null;
    },
    enabled: !!user,
  });

  // Fetch transactions history
  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ["loyaltyTransactions", user?.id],
    queryFn: async (): Promise<LoyaltyTransaction[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("loyalty_transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      return (data as LoyaltyTransaction[]) || [];
    },
    enabled: !!user,
  });

  // Add points mutation
  const addPointsMutation = useMutation({
    mutationFn: async ({ 
      points, 
      type, 
      description, 
      orderId 
    }: { 
      points: number; 
      type: string; 
      description: string; 
      orderId?: string;
    }) => {
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase.rpc("add_loyalty_points", {
        _user_id: user.id,
        _points: points,
        _type: type,
        _description: description,
        _order_id: orderId || null,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loyaltyPoints"] });
      queryClient.invalidateQueries({ queryKey: ["loyaltyTransactions"] });
    },
  });

  // Spend points mutation
  const spendPointsMutation = useMutation({
    mutationFn: async ({ 
      points, 
      description, 
      orderId 
    }: { 
      points: number; 
      description: string; 
      orderId?: string;
    }) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase.rpc("spend_loyalty_points", {
        _user_id: user.id,
        _points: points,
        _description: description,
        _order_id: orderId || null,
      });

      if (error) throw error;
      return data as boolean;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loyaltyPoints"] });
      queryClient.invalidateQueries({ queryKey: ["loyaltyTransactions"] });
    },
  });

  // Calculate points for a purchase
  const calculateEarnedPoints = (amount: number): number => {
    const tier = loyaltyPoints?.tier || "bronze";
    const multiplier = LOYALTY_TIERS[tier].pointsMultiplier;
    return Math.floor(amount * multiplier);
  };

  // Convert points to discount
  const pointsToDiscount = (points: number): number => {
    return points / POINTS_TO_EURO;
  };

  // Get progress to next tier
  const getProgressToNextTier = (): { 
    currentTier: typeof LOYALTY_TIERS.bronze; 
    nextTier: typeof LOYALTY_TIERS.bronze | null; 
    progress: number; 
    pointsNeeded: number;
  } => {
    const totalEarned = loyaltyPoints?.total_earned || 0;
    const currentTierKey = loyaltyPoints?.tier || "bronze";
    const currentTier = LOYALTY_TIERS[currentTierKey];

    const tiers = Object.entries(LOYALTY_TIERS);
    const currentIndex = tiers.findIndex(([key]) => key === currentTierKey);
    
    if (currentIndex === tiers.length - 1) {
      return { currentTier, nextTier: null, progress: 100, pointsNeeded: 0 };
    }

    const [, nextTier] = tiers[currentIndex + 1];
    const pointsNeeded = nextTier.minPoints - totalEarned;
    const progress = ((totalEarned - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100;

    return { currentTier, nextTier, progress: Math.min(progress, 100), pointsNeeded: Math.max(pointsNeeded, 0) };
  };

  return {
    user,
    loyaltyPoints,
    transactions,
    isLoading: isLoadingPoints || isLoadingTransactions,
    addPoints: addPointsMutation.mutate,
    spendPoints: spendPointsMutation.mutate,
    calculateEarnedPoints,
    pointsToDiscount,
    getProgressToNextTier,
    isAddingPoints: addPointsMutation.isPending,
    isSpendingPoints: spendPointsMutation.isPending,
  };
};
