import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface SubscriptionReminder {
  id: string;
  name: string;
  amount: number;
  next_billing_date: string;
  user_id: string;
  user_email: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get today and 7 days from now
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    // Fetch subscriptions due in 3 or 7 days
    const { data: subscriptions, error: subError } = await supabase
      .from("subscriptions")
      .select("id, name, amount, next_billing_date, user_id, billing_cycle")
      .eq("is_active", true)
      .or(
        `next_billing_date.eq.${threeDaysFromNow.toISOString().split("T")[0]},next_billing_date.eq.${sevenDaysFromNow.toISOString().split("T")[0]}`
      );

    if (subError) {
      throw new Error(`Failed to fetch subscriptions: ${subError.message}`);
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log("No subscriptions due for reminder today");
      return new Response(
        JSON.stringify({ message: "No reminders to send", sent: 0 }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get unique user IDs
    const userIds = [...new Set(subscriptions.map((s) => s.user_id))];

    // Fetch user emails from auth.users using service role
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
    
    if (usersError) {
      throw new Error(`Failed to fetch users: ${usersError.message}`);
    }

    const userEmailMap = new Map(
      users.users.filter((u) => userIds.includes(u.id)).map((u) => [u.id, u.email])
    );

    // Group subscriptions by user
    const userSubscriptions = new Map<string, typeof subscriptions>();
    for (const sub of subscriptions) {
      const userEmail = userEmailMap.get(sub.user_id);
      if (!userEmail) continue;
      
      if (!userSubscriptions.has(sub.user_id)) {
        userSubscriptions.set(sub.user_id, []);
      }
      userSubscriptions.get(sub.user_id)!.push(sub);
    }

    let emailsSent = 0;
    const errors: string[] = [];

    // Send emails to each user
    for (const [userId, subs] of userSubscriptions) {
      const userEmail = userEmailMap.get(userId);
      if (!userEmail) continue;

      const subscriptionList = subs
        .map((s) => {
          const dueDate = new Date(s.next_billing_date);
          const daysUntil = Math.ceil(
            (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
          );
          return `<li><strong>${s.name}</strong> - $${s.amount.toFixed(2)} (${s.billing_cycle}) - Renews in ${daysUntil} days (${s.next_billing_date})</li>`;
        })
        .join("");

      const totalAmount = subs.reduce((sum, s) => sum + s.amount, 0);

      try {
        await resend.emails.send({
          from: "SubKill <noreply@resend.dev>",
          to: [userEmail],
          subject: `💸 Subscription Renewal Reminder - ${subs.length} upcoming`,
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #0f0; background: #000; padding: 20px; margin: 0;">SubKill</h1>
              <div style="padding: 20px; background: #111; color: #fff;">
                <h2 style="color: #f90;">⚠️ Upcoming Renewals</h2>
                <p>You have ${subs.length} subscription(s) renewing soon:</p>
                <ul style="padding-left: 20px;">
                  ${subscriptionList}
                </ul>
                <p style="margin-top: 20px; padding: 15px; background: #222; border-left: 4px solid #f90;">
                  <strong>Total upcoming charges: $${totalAmount.toFixed(2)}</strong>
                </p>
                <p style="color: #888; margin-top: 20px;">
                  Review your subscriptions and cancel any you no longer need to save money!
                </p>
              </div>
              <div style="padding: 15px; background: #000; color: #666; font-size: 12px; text-align: center;">
                Sent by SubKill - Your subscription tracker
              </div>
            </div>
          `,
        });
        emailsSent++;
        console.log(`Sent reminder email to ${userEmail}`);
      } catch (emailError: any) {
        console.error(`Failed to send email to ${userEmail}:`, emailError.message);
        errors.push(`${userEmail}: ${emailError.message}`);
      }
    }

    return new Response(
      JSON.stringify({
        message: "Renewal reminders processed",
        sent: emailsSent,
        errors: errors.length > 0 ? errors : undefined,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-renewal-reminders:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
