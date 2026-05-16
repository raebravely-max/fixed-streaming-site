import { createClient } from "@supabase/supabase-js";

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token" });
    }

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

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ error: "Invalid session" });
    }

    const { data: dbUser, error: dbError } = await supabase
      .from("users")
      .select("id, role, subscription_status, trial_ends_at")
      .eq("email", user.email)
      .single();

    if (dbError || !dbUser) {
      return res.status(403).json({ error: "User not found" });
    }

    const now = new Date();

    const isPaidActive =
      dbUser.role === "PRO" &&
      dbUser.subscription_status === "active";

    const isTrialActive =
      dbUser.trial_ends_at &&
      new Date(dbUser.trial_ends_at) > now;

    const isTrialExpired =
      dbUser.trial_ends_at &&
      new Date(dbUser.trial_ends_at) <= now;

    // ✅ Auto downgrade if trial expired
    if (isTrialExpired) {
      await supabase
        .from("users")
        .update({
          role: "FREE",
          subscription_status: "expired",
          trial_ends_at: null,
        })
        .eq("id", dbUser.id);

      return res.status(403).json({ error: "Trial expired" });
    }

    if (!isPaidActive && !isTrialActive) {
      return res.status(403).json({ error: "PRO subscription required" });
    }

    return res.status(200).json({
      streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    });

  } catch (err) {
    console.error("Stream API error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}