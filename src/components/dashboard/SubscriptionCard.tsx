import { format, differenceInDays } from "date-fns";
import { MoreVertical, Trash2, XCircle, RotateCcw, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSubscriptions, type Subscription } from "@/hooks/useSubscriptions";

interface SubscriptionCardProps {
  subscription: Subscription;
  onEdit?: (subscription: Subscription) => void;
}

export function SubscriptionCard({ subscription, onEdit }: SubscriptionCardProps) {
  const { cancelSubscription, deleteSubscription, reactivateSubscription } = useSubscriptions();

  const daysUntilBilling = differenceInDays(
    new Date(subscription.next_billing_date),
    new Date()
  );

  const getBillingLabel = () => {
    switch (subscription.billing_cycle) {
      case "weekly":
        return "/week";
      case "monthly":
        return "/mo";
      case "yearly":
        return "/yr";
    }
  };

  const getUrgencyColor = () => {
    if (!subscription.is_active) return "text-foreground/40";
    if (daysUntilBilling <= 3) return "text-destructive";
    if (daysUntilBilling <= 7) return "text-warning-orange";
    return "text-foreground/60";
  };

  return (
    <Card
      className={`border-2 transition-all ${
        subscription.is_active
          ? "border-foreground/10 bg-card hover:border-primary/50"
          : "border-foreground/5 bg-card/50 opacity-60"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3
                className={`font-semibold truncate ${
                  subscription.is_active ? "text-foreground" : "text-foreground/60 line-through"
                }`}
              >
                {subscription.name}
              </h3>
              {subscription.category && (
                <Badge variant="secondary" className="text-xs shrink-0">
                  {subscription.category}
                </Badge>
              )}
            </div>
            <div className="flex items-baseline gap-1">
              <span
                className={`text-2xl font-display ${
                  subscription.is_active ? "text-foreground" : "text-foreground/40"
                }`}
              >
                ${subscription.amount.toFixed(2)}
              </span>
              <span className="text-foreground/40 text-sm">{getBillingLabel()}</span>
            </div>
            <p className={`text-sm mt-2 ${getUrgencyColor()}`}>
              {subscription.is_active ? (
                daysUntilBilling < 0 ? (
                  `Billed ${Math.abs(daysUntilBilling)} days ago`
                ) : daysUntilBilling === 0 ? (
                  "Bills today"
                ) : daysUntilBilling === 1 ? (
                  "Bills tomorrow"
                ) : (
                  `Bills in ${daysUntilBilling} days`
                )
              ) : (
                `Cancelled ${format(new Date(subscription.cancelled_at!), "MMM d, yyyy")}`
              )}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {subscription.is_active && (
                <>
                  <DropdownMenuItem onClick={() => onEdit?.(subscription)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => cancelSubscription.mutate(subscription.id)}
                    className="text-warning-orange focus:text-warning-orange"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel Subscription
                  </DropdownMenuItem>
                </>
              )}
              {!subscription.is_active && (
                <DropdownMenuItem
                  onClick={() => reactivateSubscription.mutate(subscription.id)}
                  className="text-cash-green focus:text-cash-green"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reactivate
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete subscription?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete "{subscription.name}" from your tracking.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteSubscription.mutate(subscription.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
