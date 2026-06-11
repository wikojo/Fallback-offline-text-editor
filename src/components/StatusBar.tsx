import { GitBranch, AlertCircle, RefreshCw, Layers } from 'lucide-react';

interface Props {
  onActionClick?: () => void;
}

export default function StatusBar({ onActionClick }: Props) {
  return (
    <div className="h-6 bg-[#16825D] flex flex-wrap overflow-hidden items-center px-2 md:px-3 justify-between shrink-0 text-white select-none z-30">
      <div className="flex items-center gap-1 md:gap-4 text-[10px] md:text-[11px] font-medium tracking-wide">
        <div className="flex items-center gap-1.5 hover:bg-white/10 px-1.5 h-6 cursor-pointer" onClick={onActionClick}>
          <GitBranch size={12} />
          <span>main</span>
        </div>
        <div className="flex items-center gap-1.5 hover:bg-white/10 px-1.5 h-6 cursor-pointer" onClick={onActionClick}>
          <RefreshCw size={12} />
        </div>
        <div className="flex items-center gap-1.5 hover:bg-white/10 px-1.5 h-6 cursor-pointer" onClick={onActionClick}>
          <AlertCircle size={12} />
          <span>0</span>
        </div>
      </div>
      <div className="flex items-center gap-1 md:gap-4 text-[10px] md:text-[11px] font-medium tracking-wide">
        <span className="hover:bg-white/10 px-1.5 h-6 flex items-center cursor-pointer" onClick={onActionClick}>Ln 8, Col 15</span>
        <span className="hidden sm:flex hover:bg-white/10 px-1.5 h-6 items-center cursor-pointer" onClick={onActionClick}>Spaces: 2</span>
        <span className="hidden sm:flex hover:bg-white/10 px-1.5 h-6 items-center cursor-pointer" onClick={onActionClick}>UTF-8</span>
        <span className="hover:bg-white/10 px-1.5 h-6 flex items-center cursor-pointer gap-1.5" onClick={onActionClick}>
          <Layers size={13} />
          JavaScript
        </span>
      </div>
    </div>
  );
}
