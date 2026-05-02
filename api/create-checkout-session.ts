import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// ✅ Supabase admin client (server-side only)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId, email } = req.body;

    if (!userId || !email) {
      return res.status(400).json({ error: "Missing user data" });
    }

    // ✅ Check if user already has Stripe customer
    const { data: userData } = await supabase
      .from("users")
      .select("stripe_customer_id")
      .eq("id", userId)
      .single();

    let customerId = userData?.stripe_customer_id;

    // ✅ If no Stripe customer, create one
    if (!customerId) {
      const customer = await stripe.customers.create({
        email,
        metadata: {
          supabase_user_id: userId,
        },
      });

      customerId = customer.id;

      // ✅ Save Stripe customer ID in Supabase
      await supabase
        .from("users")
        .update({ stripe_customer_id: customerId })
        .eq("id", userId);
    }

    // ✅ Create Checkout session linked to customer
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "SportStream Pro Membership",
            },
            recurring: {
              interval: "month",
            },
            unit_amount: 999,
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
    });

    return res.status(200).json({ url: session.url });

  } catch (error: any) {
    console.error("Stripe error:", error);
    return res.status(500).json({
      error: error?.message || "Stripe error",
    });
  }
}