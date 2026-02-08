import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { Subscription } from "@/hooks/useSubscriptions";
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval, parseISO } from "date-fns";

interface SpendingChartProps {
  subscriptions: Subscription[];
}

const chartConfig = {
  spending: {
    label: "Monthly Spending",
    color: "hsl(var(--primary))",
  },
};

export function SpendingChart({ subscriptions }: SpendingChartProps) {
  const chartData = useMemo(() => {
    const now = new Date();
    const months = [];

    // Generate last 6 months of data
    for (let i = 5; i >= 0; i--) {
      const monthDate = subMonths(now, i);
      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate);

      // Calculate spending for this month based on active subscriptions
      const monthlySpending = subscriptions
        .filter((sub) => {
          // Only count active subscriptions or those cancelled after this month
          if (sub.is_active) return true;
          if (sub.cancelled_at) {
            const cancelledDate = parseISO(sub.cancelled_at);
            return cancelledDate > monthEnd;
          }
          return true;
        })
        .reduce((total, sub) => {
          // Convert to monthly equivalent
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

      months.push({
        month: format(monthDate, "MMM"),
        spending: Math.round(monthlySpending * 100) / 100,
      });
    }

    return months;
  }, [subscriptions]);

  const totalChange = useMemo(() => {
    if (chartData.length < 2) return 0;
    const first = chartData[0].spending;
    const last = chartData[chartData.length - 1].spending;
    if (first === 0) return 0;
    return Math.round(((last - first) / first) * 100);
  }, [chartData]);

  return (
    <Card className="border-2 border-foreground/10 bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="font-display text-xl uppercase tracking-tight text-foreground">
            Spending Trends
          </CardTitle>
          <p className="text-sm text-foreground/60 mt-1">
            Monthly spending over the last 6 months
          </p>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span
            className={`text-sm font-medium ${
              totalChange > 0
                ? "text-warning-orange"
                : totalChange < 0
                ? "text-cash-green"
                : "text-foreground/60"
            }`}
          >
            {totalChange > 0 ? "+" : ""}
            {totalChange}%
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--foreground))", opacity: 0.6, fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--foreground))", opacity: 0.6, fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
              width={60}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [`$${value}`, "Spending"]}
                  labelFormatter={(label) => `${label}`}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="spending"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#spendingGradient)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
