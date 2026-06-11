import { Folder, Search, Settings, BookText } from 'lucide-react';
import { SidebarTab } from '../types';

interface Props {
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  onSettingsClick?: () => void;
}

export default function ActivityBar({ activeTab, onTabChange, onSettingsClick }: Props) {
  return (
    <div className="w-12 bg-[#010409] border-r border-[#30363D] flex flex-col items-center py-4 gap-4 shrink-0 z-10 block">
      <button 
        onClick={() => onTabChange('explorer')}
        title="Explorer (Cmd+Shift+E)"
        className={`relative w-10 h-10 flex items-center justify-center transition-colors ${activeTab === 'explorer' ? 'text-[#C9D1D9]' : 'text-[#8B949E] hover:text-[#C9D1D9]'}`}
      >
        <Folder size={22} strokeWidth={1.5} />
        {activeTab === 'explorer' && <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-[#58A6FF]" />}
      </button>

      <button 
        onClick={() => onTabChange('search')}
        title="Search (Cmd+Shift+F)"
        className={`relative w-10 h-10 flex items-center justify-center transition-colors ${activeTab === 'search' ? 'text-[#C9D1D9]' : 'text-[#8B949E] hover:text-[#C9D1D9]'}`}
      >
        <Search size={22} strokeWidth={1.5} />
        {activeTab === 'search' && <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-[#58A6FF]" />}
      </button>

      <button 
        onClick={() => onTabChange('docs')}
        title="Documentation Library"
        className={`relative w-10 h-10 flex items-center justify-center transition-colors ${activeTab === 'docs' ? 'text-[#C9D1D9]' : 'text-[#8B949E] hover:text-[#C9D1D9]'}`}
      >
        <BookText size={22} strokeWidth={1.5} />
        {activeTab === 'docs' && <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-[#58A6FF]" />}
      </button>

      <div className="mt-auto mb-2">
        <button 
          onClick={onSettingsClick}
          title="Settings"
          className="w-10 h-10 flex items-center justify-center text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
        >
          <Settings size={22} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
