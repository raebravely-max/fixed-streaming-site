import { Check, X, Zap } from 'lucide-react';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProModal = ({ isOpen, onClose }: ProModalProps) => {
  if (!isOpen) return null;

  const plans = [
    {
      name: 'Monthly',
      price: '$9.99',
      features: ['4K Ultra HD Streaming', 'Ad-Free Experience', 'Multi-device Support', 'Exclusive Interviews'],
      popular: false
    },
    {
      name: 'Yearly',
      price: '$89.99',
      features: ['All Monthly Features', 'Save 25%', 'Offline Downloads', 'Priority Support'],
      popular: true
    }
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#121214] border border-white/10 w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <div className="p-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-600/20">
              <Zap className="w-8 h-8 text-white fill-current" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Upgrade to SportStream Pro</h2>
            <p className="text-gray-400">Unlock the ultimate sports experience with premium features</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`relative p-8 rounded-3xl border ${
                  plan.popular ? 'border-blue-600 bg-blue-600/5' : 'border-white/10 bg-white/5'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-[10px] font-bold text-white rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-black">{plan.price}</span>
                  <span className="text-gray-500 text-sm">/{plan.name === 'Yearly' ? 'yr' : 'mo'}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                  plan.popular 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}>
                  Select Plan
                </button>
              </div>
            ))}
          </div>
          
          <p className="text-center text-xs text-gray-500 mt-8">
            Secure payment processing. Cancel anytime. <br/>
            By upgrading, you agree to our Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
};
