import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
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
            unit_amount: 999, // $9.99
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
    });

    // ✅ Return the Checkout URL (modern Stripe method)
    return res.status(200).json({ url: session.url });

  } catch (error: any) {
    console.error("Stripe error:", error);
    return res.status(500).json({
      error: error?.message || "Stripe error",
    });
  }
}