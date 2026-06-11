import { BookOpen, AlertTriangle, Hash, Info, FileText, X } from 'lucide-react';

interface Props {
  activeDocId: string;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Documentation({ activeDocId, isMobileOpen, onCloseMobile }: Props) {
  const renderContent = () => {
    switch (activeDocId) {
      case 'variable_declaration':
        return (
          <div className="space-y-6">
            <div className="border-b border-[#30363D] pb-4">
              <div className="flex items-center gap-2 text-[12px] text-[#8B949E] mb-2 font-mono">
                <FileText size={14} />
                <span>JavaScript &gt; Core &gt; Statements</span>
              </div>
              <h1 className="text-2xl font-semibold text-[#E6EDF3] tracking-tight mb-2">const</h1>
              <p className="text-[14px] text-[#8B949E] leading-relaxed">
                The <code className="font-mono bg-[#161B22] text-[#C9D1D9] border border-[#30363D] px-1 rounded">const</code> declaration declares block-scoped local variables. The value of a constant can't be changed through reassignment, and it can't be redeclared.
              </p>
            </div>
            
            <div>
              <h3 className="text-[15px] font-semibold text-[#E6EDF3] mb-3 flex items-center gap-2">
                <Hash size={16} className="text-[#58A6FF]" />
                Syntax
              </h3>
              <div className="bg-[#161B22] border border-[#30363D] rounded-md p-3 font-mono text-[13px] text-[#C9D1D9] overflow-x-auto">
                <span className="text-[#FF7B72]">const</span> <span className="text-[#FFA657]">name1</span> <span className="text-[#FF7B72]">=</span> <span className="text-[#A5D6FF]">value1</span>;
              </div>
            </div>

            <div>
              <h3 className="text-[15px] font-semibold text-[#E6EDF3] mb-3 flex items-center gap-2">
                <Hash size={16} className="text-[#58A6FF]" />
                Description
              </h3>
              <p className="text-[14px] text-[#C9D1D9] leading-relaxed mb-3">
                This declaration creates a constant whose scope can be either global or local to the block in which it is declared. Global constants do not become properties of the <code className="font-mono bg-[#161B22] border border-[#30363D] px-1 rounded text-[13px]">window</code> object.
              </p>
              
              <div className="mt-4 bg-[#1F6FEB]/10 border-l-4 border-[#3B82F6] p-3 rounded-r-md">
                <div className="flex gap-2">
                  <Info size={18} className="text-[#3B82F6] shrink-0 mt-0.5" />
                  <p className="text-[13px] text-[#C9D1D9] leading-relaxed">
                    <strong>Note:</strong> <code className="font-mono text-[#58A6FF]">const</code> does not mean the value it holds is immutable—just that the variable identifier cannot be reassigned. For instance, in the case where the content is an object, this means the object's contents can be altered.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 border border-[#F85149]/20 bg-[#F85149]/5 rounded-md p-4">
              <div className="flex gap-2 mb-2">
                 <AlertTriangle size={16} className="text-[#F85149] shrink-0 mt-0.5" />
                 <h4 className="text-[14px] font-semibold text-[#F85149]">Common <code className="font-mono">TypeError</code></h4>
              </div>
              <p className="text-[13px] text-[#C9D1D9] ml-6 leading-relaxed mb-3">
                Attempting to modify a <code className="font-mono text-[#F85149]">const</code> variable will throw a runtime error.
              </p>
              <div className="bg-[#0D1117] border border-[#30363D] rounded p-3 font-mono text-[12px] text-[#C9D1D9] ml-6">
                 <span className="text-[#FF7B72]">const</span> <span className="text-[#C9D1D9]">score</span> <span className="text-[#FF7B72]">=</span> <span className="text-[#79C0FF]">100</span>;<br/>
                 <span className="text-[#C9D1D9]">score</span> <span className="text-[#FF7B72]">=</span> <span className="text-[#79C0FF]">150</span>; <span className="text-[#8B949E]">// TypeError: Assignment to constant variable.</span>
              </div>
            </div>
          </div>
        );
      
      case 'functions':
        return (
          <div className="space-y-6">
            <div className="border-b border-[#30363D] pb-4">
              <div className="flex items-center gap-2 text-[12px] text-[#8B949E] mb-2 font-mono">
                <FileText size={14} />
                <span>JavaScript &gt; Functions &gt; Arrow functions</span>
              </div>
              <h1 className="text-2xl font-semibold text-[#E6EDF3] tracking-tight mb-2">Arrow function expressions</h1>
              <p className="text-[14px] text-[#8B949E] leading-relaxed">
                An arrow function expression is a compact alternative to a traditional function expression, with some semantic differences and deliberate limitations in language usage.
              </p>
            </div>
            
            <div>
              <h3 className="text-[15px] font-semibold text-[#E6EDF3] mb-3 flex items-center gap-2">
                <Hash size={16} className="text-[#58A6FF]" />
                Syntax
              </h3>
              <div className="bg-[#161B22] border border-[#30363D] rounded-md p-3 font-mono text-[13px] text-[#C9D1D9] overflow-x-auto space-y-2">
                <div>(param1, param2, …, paramN) <span className="text-[#FF7B72]">=&gt;</span> {"{"} statements {"}"}</div>
                <div>(param1, param2, …, paramN) <span className="text-[#FF7B72]">=&gt;</span> expression</div>
                <div className="text-[#8B949E]">// Equivalent to: <span className="text-[#FF7B72]">=&gt;</span> {"{"} return expression; {"}"}</div>
              </div>
            </div>
          </div>
        );

      case 'array_iteration':
        return (
          <div className="space-y-6">
            <div className="border-b border-[#30363D] pb-4">
              <div className="flex items-center gap-2 text-[12px] text-[#8B949E] mb-2 font-mono">
                <FileText size={14} />
                <span>JavaScript &gt; Objects &gt; Array &gt; forEach</span>
              </div>
              <h1 className="text-2xl font-semibold text-[#E6EDF3] tracking-tight mb-2">Array.prototype.forEach()</h1>
              <p className="text-[14px] text-[#8B949E] leading-relaxed">
                The <code className="font-mono bg-[#161B22] text-[#C9D1D9] border border-[#30363D] px-1 rounded">forEach()</code> method executes a provided function once for each array element.
              </p>
            </div>
            
            <div>
              <h3 className="text-[15px] font-semibold text-[#E6EDF3] mb-3 flex items-center gap-2">
                <Hash size={16} className="text-[#58A6FF]" />
                Syntax
              </h3>
              <div className="bg-[#161B22] border border-[#30363D] rounded-md p-3 font-mono text-[13px] text-[#C9D1D9]">
                <span className="text-[#D2A8FF]">forEach</span>(callbackFn)<br/>
                <span className="text-[#D2A8FF]">forEach</span>((element) <span className="text-[#FF7B72]">=&gt;</span> {"{ /* ... */ }"})
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 gap-4 text-[#8B949E]">
            <BookOpen size={48} className="opacity-20" />
            <div>
              <h3 className="font-semibold text-[#C9D1D9] mb-1">Documentation Viewer</h3>
              <p className="text-sm">Click a highlighted symbol in the editor to view its documentation.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`
      ${isMobileOpen ? 'absolute md:static inset-0 z-30 flex' : 'hidden lg:flex'}
      w-full lg:w-[450px] bg-[#010409] border-l border-[#30363D] flex-col shrink-0 flex-shrink-0
    `}>
      <div className="h-9 border-b border-[#30363D] flex items-center px-4 shrink-0 justify-between bg-[#161B22] lg:bg-transparent">
        <div className="flex items-center gap-2 text-[#C9D1D9] font-semibold text-[11px] tracking-wider uppercase">
          Reference Library
        </div>
        <button className="lg:hidden text-[#8B949E] hover:text-[#C9D1D9] p-1" onClick={onCloseMobile}>
          <X size={16} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 scroll-smooth">
        {renderContent()}
      </div>
    </div>
  );
}
