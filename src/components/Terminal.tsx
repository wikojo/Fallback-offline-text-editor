import { Terminal as TerminalIcon, XCircle, AlertCircle, CircleOff, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Props {
  outputLines?: { id: string, text: string, type: 'log' | 'error' | 'cmd' }[];
  onClear?: () => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function Terminal({ outputLines = [], onClear, isOpen = true, onToggle }: Props) {
  const [activeTab, setActiveTab] = useState<'terminal' | 'problems' | 'output'>('terminal');

  return (
    <div className={`bg-[#0D1117] border-t border-[#30363D] flex flex-col shrink-0 flex-shrink-0 z-20 transition-all duration-200 ${isOpen ? 'h-44 md:h-56' : 'h-9'}`}>
      <div className="flex items-center px-2 md:px-4 border-b border-[#30363D] h-9 gap-4 md:gap-6 bg-[#010409]">
        <div 
          onClick={() => { setActiveTab('terminal'); if (!isOpen && onToggle) onToggle(); }}
          className={`flex items-center gap-1.5 h-full ${activeTab === 'terminal' ? 'border-b-[2px] border-[#58A6FF] text-[#C9D1D9]' : 'border-b-[2px] border-transparent text-[#8B949E] hover:text-[#C9D1D9]'} text-[11px] font-medium tracking-wide uppercase cursor-pointer transition-colors`}
        >
          <TerminalIcon size={14} />
          <span className="hidden sm:inline">Terminal</span>
          <span className="sm:hidden">Term</span>
        </div>
        <div 
          onClick={() => { setActiveTab('problems'); if (!isOpen && onToggle) onToggle(); }}
          className={`flex items-center gap-1.5 h-full ${activeTab === 'problems' ? 'border-b-[2px] border-[#58A6FF] text-[#C9D1D9]' : 'border-b-[2px] border-transparent text-[#8B949E] hover:text-[#C9D1D9]'} text-[11px] font-medium tracking-wide uppercase cursor-pointer transition-colors`}
        >
          <XCircle size={14} className="hidden sm:block" />
          <span className="hidden sm:inline">Problems</span>
          <span className="sm:hidden">Probs</span>
          <span className="bg-[#30363D] text-[#C9D1D9] px-1.5 py-0.5 rounded text-[10px] ml-0.5">0</span>
        </div>
        <div 
          onClick={() => { setActiveTab('output'); if (!isOpen && onToggle) onToggle(); }}
          className={`flex items-center gap-1.5 h-full ${activeTab === 'output' ? 'border-b-[2px] border-[#58A6FF] text-[#C9D1D9]' : 'border-b-[2px] border-transparent text-[#8B949E] hover:text-[#C9D1D9]'} text-[11px] font-medium tracking-wide uppercase cursor-pointer transition-colors`}
        >
          <AlertCircle size={14} className="hidden sm:block" />
          Output
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-2 md:gap-3">
          <button onClick={onClear} className="hover:text-[#C9D1D9] text-[#8B949E] transition-colors p-1" title="Clear Terminal">
             <CircleOff size={14} />
          </button>
          <button onClick={onToggle} className="hover:text-[#C9D1D9] text-[#8B949E] transition-colors p-1 text-[10px]" title="Toggle Panel">
             {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="flex-1 p-3 overflow-y-auto font-mono text-[13px] leading-[1.6] text-[#C9D1D9] flex flex-col gap-1">
          {activeTab === 'terminal' && (
            <>
              {outputLines.map((line, index) => {
                if (line.type === 'cmd') {
                  return (
                    <div key={line.id} className="flex gap-2.5 mt-1">
                      <span className="text-[#3FB950] font-bold shrink-0">~/Fallback</span>
                      <span className="text-[#8B949E] shrink-0">$</span>
                      <span className="text-[#C9D1D9]">{line.text}</span>
                      {index === outputLines.length - 1 && line.text === '' && (
                        <span className="inline-block w-2 bg-[#58A6FF] animate-pulse h-[1.1em] translate-y-0.5"></span>
                      )}
                    </div>
                  );
                }
                if (line.type === 'error') {
                  return (
                    <div key={line.id} className="text-[#F85149] ml-2 break-all">
                      {line.text}
                    </div>
                  );
                }
                return (
                  <div key={line.id} className="text-[#C9D1D9] ml-2 break-all">
                    {line.text}
                  </div>
                );
              })}
              {outputLines.length === 0 && (
                <div className="flex gap-2.5 mt-1">
                  <span className="text-[#3FB950] font-bold">~/Fallback</span>
                  <span className="text-[#8B949E]">$</span>
                  <span className="inline-block w-2 bg-[#58A6FF] animate-pulse h-[1.1em] translate-y-0.5"></span>
                </div>
              )}
            </>
          )}
          {activeTab === 'problems' && (
             <div className="text-[#8B949E] p-2 flex items-center justify-center h-full">No problems have been detected in the workspace.</div>
          )}
          {activeTab === 'output' && (
             <div className="text-[#8B949E] p-2 flex items-center justify-center h-full">No background tasks running.</div>
          )}
        </div>
      )}
    </div>
  );
}
