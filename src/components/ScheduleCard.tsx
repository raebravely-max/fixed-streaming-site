import { Bell } from 'lucide-react';
import { Event } from '../types';

export const ScheduleCard = ({ event }: { event: Event }) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
        <img src={event.thumbnail} alt={event.title} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{event.category}</span>
          <span className="w-1 h-1 bg-gray-600 rounded-full" />
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{event.time}</span>
        </div>
        <h4 className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">
          {event.title}
        </h4>
        <p className="text-xs text-gray-400 mt-1">International Championship</p>
      </div>

      <button className="p-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-blue-500 hover:border-blue-500/50 transition-all">
        <Bell className="w-5 h-5" />
      </button>
    </div>
  );
};
