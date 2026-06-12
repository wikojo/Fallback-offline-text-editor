import { Maximize2, Minus, X, ShieldCheck, Menu, Search } from 'lucide-react';

interface Props {
  onMenuClick?: () => void;
  onActionClick?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export default function Titlebar({ onMenuClick, onActionClick, searchQuery = '', onSearchChange }: Props) {
  return (
    <div style={{ WebkitAppRegion: 'drag' } as any} className="flex items-center justify-between h-9 bg-[#010409] border-b border-[#30363D] px-2 md:px-4 shrink-0">
      <div className="flex items-center gap-3 md:gap-6 min-w-0">
        <button className="md:hidden p-1.5 text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#30363D] rounded transition-colors" onClick={onMenuClick}>
          <Menu size={16} />
        </button>
        <div style={{ WebkitAppRegion: 'no-drag' } as any} className="hidden md:flex gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#ED6A5E] hover:bg-[#FF5F56] cursor-pointer" onClick={onActionClick}></div>
          <div className="w-3 h-3 rounded-full bg-[#F4BF4F] hover:bg-[#FFBD2E] cursor-pointer" onClick={onActionClick}></div>
          <div className="w-3 h-3 rounded-full bg-[#61C554] hover:bg-[#27C93F] cursor-pointer" onClick={onActionClick}></div>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[12px] font-semibold text-[#8B949E] tracking-wide">
            FALLBACK
          </span>
        </div>
      </div>

      <div style={{ WebkitAppRegion: 'no-drag' } as any} className="flex-1 max-w-xl mx-4 hidden md:flex relative">
        <Search size={14} className="absolute left-3 top-1.5 text-[#8B949E]" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          placeholder="Search docs and concepts..." 
          className="w-full bg-[#0D1117] border border-[#30363D] rounded-md pl-9 pr-3 py-1 text-[12px] text-[#C9D1D9] placeholder:text-[#8B949E] focus:outline-none focus:border-[#58A6FF] focus:bg-[#010409] transition-colors"
        />
      </div>
      
      <div className="flex items-center gap-4 text-[11px] font-medium tracking-wide text-[#8B949E] shrink-0">
        <div className="flex items-center gap-1.5" title="Fully offline environment">
          <ShieldCheck size={14} className="text-[#3FB950]" />
          <span className="hidden sm:inline">OFFLINE</span>
        </div>
      </div>
    </div>
  );
}
