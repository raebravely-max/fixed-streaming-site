import { X, Crown } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  const handleUpgrade = async () => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();

      if (data.url) {
        // ✅ Modern Stripe redirect
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Upgrade error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-[#111] p-8 rounded-2xl w-[420px] border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Crown className="text-yellow-400 w-5 h-5" />
            Upgrade to Pro
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <ul className="text-sm text-gray-300 space-y-3 mb-6">
          <li>✅ Switch between multiple streams</li>
          <li>✅ Ad‑free streaming</li>
          <li>✅ Priority servers</li>
          <li>✅ 4K Support</li>
        </ul>

        <button
          onClick={handleUpgrade}
          className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
        >
          Pay $9.99 / Month
        </button>
      </div>
    </div>
  );
};