import { User, Settings, LogOut, Shield, CreditCard } from 'lucide-react';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export const UserMenu = ({ isOpen, onClose, onUpgrade }: UserMenuProps) => {
  if (!isOpen) return null;

  const menuItems = [
    { icon: User, label: 'Profile Settings' },
    { icon: Shield, label: 'Privacy & Security' },
    { icon: CreditCard, label: 'Subscription', action: onUpgrade },
    { icon: Settings, label: 'App Preferences' },
  ];

  return (
    <>
      <div className="fixed inset-0 z-[150]" onClick={onClose} />
      <div className="absolute top-20 right-8 w-64 bg-[#121214] border border-white/10 rounded-3xl shadow-2xl z-[160] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-1">
            <span className="font-bold">Guest User</span>
            <span className="px-1.5 py-0.5 bg-blue-600/20 text-blue-500 text-[10px] font-black rounded uppercase">Free</span>
          </div>
          <p className="text-xs text-gray-500">guest@sportstream.com</p>
        </div>
        
        <div className="p-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.action) item.action();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
            >
              <item.icon className="w-4 h-4" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
          
          <div className="h-px bg-white/10 my-2 mx-4" />
          
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 rounded-2xl transition-all">
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};
