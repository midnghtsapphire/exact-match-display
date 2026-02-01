import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSubscriptions, type SubscriptionInput } from "@/hooks/useSubscriptions";

const subscriptionSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  amount: z.coerce.number().positive("Amount must be positive"),
  billing_cycle: z.enum(["weekly", "monthly", "yearly"]),
  next_billing_date: z.string().min(1, "Next billing date is required"),
  category: z.string().max(50, "Category must be less than 50 characters").optional(),
});

type FormData = z.infer<typeof subscriptionSchema>;

const CATEGORIES = [
  "Entertainment",
  "Software",
  "Music",
  "News",
  "Gaming",
  "Fitness",
  "Education",
  "Cloud Storage",
  "Productivity",
  "Other",
];

export function AddSubscriptionDialog() {
  const [open, setOpen] = useState(false);
  const { addSubscription } = useSubscriptions();

  const form = useForm<FormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: "",
      amount: 0,
      billing_cycle: "monthly",
      next_billing_date: new Date().toISOString().split("T")[0],
      category: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    await addSubscription.mutateAsync(data as SubscriptionInput);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground font-semibold uppercase tracking-widest hover:bg-warning-orange transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Add Subscription
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-2 border-foreground/10">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl uppercase tracking-tight text-foreground">
            Add Subscription
          </DialogTitle>
          <DialogDescription className="text-foreground/60">
            Track a new subscription to monitor your spending.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Service Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Netflix, Spotify, etc."
                      className="border-foreground/20 bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Amount ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="9.99"
                        className="border-foreground/20 bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billing_cycle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Billing Cycle</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-foreground/20 bg-background">
                          <SelectValue placeholder="Select cycle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="next_billing_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Next Billing Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="border-foreground/20 bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Category (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-foreground/20 bg-background">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="text-foreground/60"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={addSubscription.isPending}
                className="bg-primary text-primary-foreground font-semibold uppercase tracking-widest hover:bg-warning-orange"
              >
                {addSubscription.isPending ? "Adding..." : "Add Subscription"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
