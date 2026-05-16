import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); // ✅ removed apiVersion

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const sig = req.headers["stripe-signature"];
  const buf = req.body; // ✅ removed micro dependency

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;
      const userId = session.metadata?.user_id;

      if (!userId || !customerId) {
        return res.status(400).json({ error: "Missing metadata" });
      }

      await supabase
        .from("users")
        .update({
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          subscription_status: "active",
          role: "PRO",
        })
        .eq("id", userId);
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;

      const { data: user } = await supabase
        .from("users")
        .select("*")
        .eq("stripe_subscription_id", subscription.id)
        .single();

      if (user) {
        await supabase
          .from("users")
          .update({
            subscription_status: "cancelled",
            role: "FREE",
          })
          .eq("id", user.id);
      }
    }

    return res.status(200).json({ received: true });

  } catch (error: any) {
    console.error("Webhook handler error:", error);
    return res.status(500).json({ error: "Webhook failed" });
  }
}