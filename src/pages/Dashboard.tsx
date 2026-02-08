import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, DollarSign, TrendingDown, Bell } from "lucide-react";
import { AddSubscriptionDialog } from "@/components/dashboard/AddSubscriptionDialog";
import { SubscriptionsList } from "@/components/dashboard/SubscriptionsList";
import { UpcomingRenewals } from "@/components/dashboard/UpcomingRenewals";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { useSubscriptions } from "@/hooks/useSubscriptions";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { subscriptions, activeSubscriptions, cancelledSubscriptions, monthlySpending, totalSaved, isLoading } = useSubscriptions();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-primary bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-8 py-6">
          <nav className="flex items-center justify-between">
            <a href="/" className="relative font-display text-3xl uppercase tracking-tighter text-primary">
              SubKill
              <span className="absolute -right-5 -top-1 text-sm text-cash-green blink">◉</span>
            </a>

            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-card text-foreground">
                  {user?.email ? getInitials(user.email) : <User className="w-4 h-4" />}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-foreground/60 hover:text-primary"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Sign Out
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">
                Welcome back
              </h1>
              <p className="mt-2 text-foreground/60">
                {user?.email}
              </p>
            </div>
            <AddSubscriptionDialog />
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="border-2 border-foreground/10 bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-foreground/60">
                  Active Subscriptions
                </CardTitle>
                <Bell className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display text-foreground">
                  {isLoading ? "..." : activeSubscriptions.length}
                </div>
                <p className="text-xs text-foreground/40 mt-1">Being tracked</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-foreground/10 bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-foreground/60">
                  Monthly Spending
                </CardTitle>
                <DollarSign className="h-4 w-4 text-warning-orange" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display text-foreground">
                  ${isLoading ? "..." : monthlySpending.toFixed(2)}
                </div>
                <p className="text-xs text-foreground/40 mt-1">Estimated monthly</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-foreground/10 bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-foreground/60">
                  Subscriptions Killed
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-cash-green" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display text-cash-green">
                  {isLoading ? "..." : cancelledSubscriptions.length}
                </div>
                <p className="text-xs text-foreground/40 mt-1">Total cancelled</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-foreground/10 bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-foreground/60">
                  Money Saved
                </CardTitle>
                <DollarSign className="h-4 w-4 text-cash-green" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-display text-cash-green">
                  ${isLoading ? "..." : totalSaved.toFixed(2)}
                </div>
                <p className="text-xs text-foreground/40 mt-1">Monthly savings</p>
              </CardContent>
            </Card>
          </div>

          {/* Spending Chart */}
          <SpendingChart subscriptions={subscriptions} />

          {/* Upcoming Renewals Alert */}
          <UpcomingRenewals subscriptions={subscriptions} />

          {/* Subscriptions List */}
          <Card className="border-2 border-foreground/10 bg-card">
            <CardHeader>
              <CardTitle className="font-display text-xl uppercase tracking-tight text-foreground">
                Your Subscriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SubscriptionsList />
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
