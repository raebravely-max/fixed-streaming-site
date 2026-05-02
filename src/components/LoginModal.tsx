import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: Props) => {
  const { signIn, signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (isSignup) {
        await signUp(email, password);
        alert("Account created successfully! You can now log in.");
        setIsSignup(false);
      } else {
        await signIn(email, password);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#111] p-8 rounded-2xl w-[420px] border border-white/10 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            {isSignup ? "Create Account" : "Login"}
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-sm">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 mb-4 outline-none focus:border-blue-500 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 mb-4 outline-none focus:border-blue-500 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : isSignup
            ? "Sign Up"
            : "Login"}
        </button>

        <div className="mt-4 text-sm text-center text-gray-400">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => setIsSignup(false)}
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => setIsSignup(true)}
              >
                Sign Up
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};