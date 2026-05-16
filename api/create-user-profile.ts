import { createClient } from "@supabase/supabase-js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId, email } = req.body;

    if (!userId || !email) {
      return res.status(400).json({ error: "Missing user data" });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 7);

    await supabase.from("users").insert({
      id: userId,
      email: email,
      role: "PRO",
      subscription_status: "trialing",
      trial_ends_at: trialEnd.toISOString(),
    });

    return res.status(200).json({ success: true });

  } catch (error: any) {
    console.error("Create user profile error:", error);
    return res.status(500).json({ error: "Failed to create profile" });
  }
}