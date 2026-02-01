import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export type BillingCycle = "weekly" | "monthly" | "yearly";

export interface Subscription {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  billing_cycle: BillingCycle;
  next_billing_date: string;
  category: string | null;
  is_active: boolean;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionInput {
  name: string;
  amount: number;
  billing_cycle: BillingCycle;
  next_billing_date: string;
  category?: string;
}

export function useSubscriptions() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: subscriptions = [], isLoading, error } = useQuery({
    queryKey: ["subscriptions", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .order("next_billing_date", { ascending: true });

      if (error) throw error;
      return data as Subscription[];
    },
    enabled: !!user?.id,
  });

  const addSubscription = useMutation({
    mutationFn: async (input: SubscriptionInput) => {
      if (!user?.id) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("subscriptions")
        .insert({
          user_id: user.id,
          name: input.name,
          amount: input.amount,
          billing_cycle: input.billing_cycle,
          next_billing_date: input.next_billing_date,
          category: input.category || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast.success("Subscription added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add subscription: " + error.message);
    },
  });

  const updateSubscription = useMutation({
    mutationFn: async ({ id, ...input }: SubscriptionInput & { id: string }) => {
      const { data, error } = await supabase
        .from("subscriptions")
        .update({
          name: input.name,
          amount: input.amount,
          billing_cycle: input.billing_cycle,
          next_billing_date: input.next_billing_date,
          category: input.category || null,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast.success("Subscription updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update subscription: " + error.message);
    },
  });

  const cancelSubscription = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from("subscriptions")
        .update({
          is_active: false,
          cancelled_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast.success("Subscription cancelled - money saved! 💰");
    },
    onError: (error) => {
      toast.error("Failed to cancel subscription: " + error.message);
    },
  });

  const deleteSubscription = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("subscriptions")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast.success("Subscription deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete subscription: " + error.message);
    },
  });

  const reactivateSubscription = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from("subscriptions")
        .update({
          is_active: true,
          cancelled_at: null,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast.success("Subscription reactivated");
    },
    onError: (error) => {
      toast.error("Failed to reactivate subscription: " + error.message);
    },
  });

  // Calculate stats
  const activeSubscriptions = subscriptions.filter((s) => s.is_active);
  const cancelledSubscriptions = subscriptions.filter((s) => !s.is_active);

  const monthlySpending = activeSubscriptions.reduce((total, sub) => {
    switch (sub.billing_cycle) {
      case "weekly":
        return total + sub.amount * 4.33;
      case "monthly":
        return total + sub.amount;
      case "yearly":
        return total + sub.amount / 12;
      default:
        return total;
    }
  }, 0);

  const totalSaved = cancelledSubscriptions.reduce((total, sub) => {
    switch (sub.billing_cycle) {
      case "weekly":
        return total + sub.amount * 4.33;
      case "monthly":
        return total + sub.amount;
      case "yearly":
        return total + sub.amount / 12;
      default:
        return total;
    }
  }, 0);

  return {
    subscriptions,
    activeSubscriptions,
    cancelledSubscriptions,
    isLoading,
    error,
    monthlySpending,
    totalSaved,
    addSubscription,
    updateSubscription,
    cancelSubscription,
    deleteSubscription,
    reactivateSubscription,
  };
}
