import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionCard } from "./SubscriptionCard";
import { EditSubscriptionDialog } from "./EditSubscriptionDialog";
import { useSubscriptions, type Subscription } from "@/hooks/useSubscriptions";
import { Skeleton } from "@/components/ui/skeleton";

export function SubscriptionsList() {
  const { activeSubscriptions, cancelledSubscriptions, isLoading } = useSubscriptions();
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  return (
    <>
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4 bg-card border-2 border-foreground/10">
          <TabsTrigger value="active" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Active ({activeSubscriptions.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Cancelled ({cancelledSubscriptions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-3">
          {activeSubscriptions.length === 0 ? (
            <p className="text-center text-foreground/40 py-8">
              No active subscriptions. Add one to start tracking!
            </p>
          ) : (
            activeSubscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onEdit={setEditingSubscription}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-3">
          {cancelledSubscriptions.length === 0 ? (
            <p className="text-center text-foreground/40 py-8">
              No cancelled subscriptions yet. Cancel some to save money! 💰
            </p>
          ) : (
            cancelledSubscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onEdit={setEditingSubscription}
              />
            ))
          )}
        </TabsContent>
      </Tabs>

      <EditSubscriptionDialog
        subscription={editingSubscription}
        open={!!editingSubscription}
        onOpenChange={(open) => !open && setEditingSubscription(null)}
      />
    </>
  );
}
