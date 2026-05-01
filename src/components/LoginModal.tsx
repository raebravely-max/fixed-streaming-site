import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: Props) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleLogin = () => {
    if (!email) return;
    login(email);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-[#111] p-8 rounded-2xl w-[400px] border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Login</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 mb-4 outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};