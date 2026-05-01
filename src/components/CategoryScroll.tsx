import { CATEGORIES } from '../data';
import { cn } from '../utils/cn';

interface CategoryScrollProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export const CategoryScroll = ({ selectedId, onSelect }: CategoryScrollProps) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={cn(
            "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap border",
            selectedId === cat.id
              ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};
