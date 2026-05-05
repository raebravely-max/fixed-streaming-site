import { createClient } from "@supabase/supabase-js";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const {
    data: { user },
  } = await supabase.auth.getUser(token);

  if (!user) {
    return res.status(401).json({ error: "Invalid session" });
  }

  const { data: dbUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", user.email)
    .single();

  if (
    !dbUser ||
    dbUser.role !== "PRO" ||
    dbUser.subscription_status !== "active"
  ) {
    return res.status(403).json({ error: "PRO required" });
  }

  // ✅ Only PRO users reach here

  return res.json({
    streamUrl: "https://your-secure-stream-url.m3u8"
  });
}