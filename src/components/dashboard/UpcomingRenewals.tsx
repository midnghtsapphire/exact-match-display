import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Subscription } from "@/hooks/useSubscriptions";
import { differenceInDays, parseISO, format } from "date-fns";

interface UpcomingRenewalsProps {
  subscriptions: Subscription[];
}

interface RenewalAlert {
  subscription: Subscription;
  daysUntil: number;
  urgency: "urgent" | "soon" | "upcoming";
}

export function UpcomingRenewals({ subscriptions }: UpcomingRenewalsProps) {
  const renewalAlerts = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return subscriptions
      .filter((sub) => sub.is_active)
      .map((subscription) => {
        const nextBilling = parseISO(subscription.next_billing_date);
        const daysUntil = differenceInDays(nextBilling, today);
        
        let urgency: "urgent" | "soon" | "upcoming";
        if (daysUntil <= 3) {
          urgency = "urgent";
        } else if (daysUntil <= 7) {
          urgency = "soon";
        } else {
          urgency = "upcoming";
        }

        return { subscription, daysUntil, urgency };
      })
      .filter((alert) => alert.daysUntil <= 7 && alert.daysUntil >= 0)
      .sort((a, b) => a.daysUntil - b.daysUntil);
  }, [subscriptions]);

  if (renewalAlerts.length === 0) {
    return null;
  }

  return (
    <Card className="border-2 border-warning-orange/50 bg-card mb-8">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 font-display text-xl uppercase tracking-tight text-foreground">
          <AlertTriangle className="h-5 w-5 text-warning-orange" />
          Upcoming Renewals
          <Badge variant="secondary" className="ml-2 bg-warning-orange/20 text-warning-orange">
            {renewalAlerts.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          <div className="space-y-3">
            {renewalAlerts.map(({ subscription, daysUntil, urgency }, index) => (
              <motion.div
                key={subscription.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between rounded-lg border p-4 ${
                  urgency === "urgent"
                    ? "border-destructive/50 bg-destructive/10"
                    : urgency === "soon"
                    ? "border-warning-orange/50 bg-warning-orange/10"
                    : "border-foreground/10 bg-card"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      urgency === "urgent"
                        ? "bg-destructive/20"
                        : urgency === "soon"
                        ? "bg-warning-orange/20"
                        : "bg-muted"
                    }`}
                  >
                    {urgency === "urgent" ? (
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    ) : (
                      <Clock className="h-5 w-5 text-warning-orange" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{subscription.name}</p>
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {format(parseISO(subscription.next_billing_date), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg text-foreground">
                    ${subscription.amount.toFixed(2)}
                  </p>
                  <Badge
                    variant={urgency === "urgent" ? "destructive" : "secondary"}
                    className={
                      urgency === "soon"
                        ? "bg-warning-orange/20 text-warning-orange border-warning-orange/30"
                        : ""
                    }
                  >
                    {daysUntil === 0
                      ? "Today!"
                      : daysUntil === 1
                      ? "Tomorrow"
                      : `${daysUntil} days`}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
