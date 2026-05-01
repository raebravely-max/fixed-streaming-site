import { Bell, CheckCircle2, Trophy, Clock } from 'lucide-react';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsPanel = ({ isOpen, onClose }: NotificationsPanelProps) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      type: 'match',
      title: 'Match Starting Soon!',
      desc: 'Real Madrid vs Barcelona starts in 15 minutes.',
      time: 'Just now',
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      id: 2,
      type: 'result',
      title: 'Final Result',
      desc: 'Arsenal 2 - 1 Man City. The Gunners take the lead!',
      time: '45m ago',
      icon: CheckCircle2,
      color: 'text-green-500'
    },
    {
      id: 3,
      type: 'system',
      title: 'New Feature',
      desc: 'Multi-stream view is now available for Pro members.',
      time: '2h ago',
      icon: Bell,
      color: 'text-blue-500'
    }
  ];

  return (
    <>
      <div className="fixed inset-0 z-[150]" onClick={onClose} />
      <div className="absolute top-20 right-8 w-96 bg-[#121214] border border-white/10 rounded-3xl shadow-2xl z-[160] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-bold text-lg">Notifications</h3>
          <button className="text-xs text-blue-500 font-bold hover:underline">Mark all as read</button>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
          {notifications.map((item) => (
            <div key={item.id} className="p-4 hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer group">
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-500 font-medium">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 text-center">
          <button className="text-sm text-gray-400 font-bold hover:text-white transition-colors">
            View All Notifications
          </button>
        </div>
      </div>
    </>
  );
};
