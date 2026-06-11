import { Maximize2, Minus, X, ShieldCheck, Menu } from 'lucide-react';

interface Props {
  onMenuClick?: () => void;
  onActionClick?: () => void;
}

export default function Titlebar({ onMenuClick, onActionClick }: Props) {
  return (
    <div style={{ WebkitAppRegion: 'drag' } as any} className="flex items-center justify-between h-9 bg-[#010409] border-b border-[#30363D] px-2 md:px-4 shrink-0">
      <div className="flex items-center gap-3 md:gap-6">
        <button className="md:hidden p-1.5 text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#30363D] rounded transition-colors" onClick={onMenuClick}>
          <Menu size={16} />
        </button>
        <div style={{ WebkitAppRegion: 'no-drag' } as any} className="hidden md:flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ED6A5E] hover:bg-[#FF5F56] cursor-pointer" onClick={onActionClick}></div>
          <div className="w-3 h-3 rounded-full bg-[#F4BF4F] hover:bg-[#FFBD2E] cursor-pointer" onClick={onActionClick}></div>
          <div className="w-3 h-3 rounded-full bg-[#61C554] hover:bg-[#27C93F] cursor-pointer" onClick={onActionClick}></div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-semibold text-[#8B949E] tracking-wide">
            CODELIGHT
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-[11px] font-medium tracking-wide text-[#8B949E]">
        <div className="flex items-center gap-1.5" title="Fully offline environment">
          <ShieldCheck size={14} className="text-[#3FB950]" />
          <span className="hidden sm:inline">OFFLINE</span>
        </div>
      </div>
    </div>
  );
}
