import { BookOpen, AlertTriangle, Hash, Info, FileText, X, ExternalLink } from 'lucide-react';
import { getDocById } from '../data/docs';

interface Props {
  activeDocId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Documentation({ activeDocId, isOpen, onClose }: Props) {
  const doc = getDocById(activeDocId);

  const renderContent = () => {
    if (!doc) {
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

    const mdnSearchUrl = `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(doc.topic)}`;

    return (
      <div className="space-y-6">
        <div className="border-b border-[#30363D] pb-4">
          <div className="flex items-center gap-2 text-[12px] text-[#8B949E] mb-2 font-mono">
            <FileText size={14} />
            <span>{doc.category}</span>
          </div>
          <h1 className="text-2xl font-semibold text-[#E6EDF3] tracking-tight mb-2">{doc.title}</h1>
          <p className="text-[14px] text-[#8B949E] leading-relaxed">
            {doc.description}
          </p>
        </div>
        
        {doc.syntax && (
          <div>
            <h3 className="text-[15px] font-semibold text-[#E6EDF3] mb-3 flex items-center gap-2">
              <Hash size={16} className="text-[#58A6FF]" />
              Syntax
            </h3>
            <div className="bg-[#161B22] border border-[#30363D] rounded-md p-3 font-mono text-[13px] text-[#C9D1D9] overflow-x-auto whitespace-pre">
              {doc.syntax}
            </div>
          </div>
        )}

        {doc.note && (
          <div className="bg-[#1F6FEB]/10 border-l-4 border-[#3B82F6] p-3 rounded-r-md">
            <div className="flex gap-2">
              <Info size={18} className="text-[#3B82F6] shrink-0 mt-0.5" />
              <p className="text-[13px] text-[#C9D1D9] leading-relaxed">
                <strong>Note:</strong> {doc.note}
              </p>
            </div>
          </div>
        )}

        {doc.errorMsg && doc.errorDescription && (
           <div className="mt-6 border border-[#F85149]/20 bg-[#F85149]/5 rounded-md p-4">
            <div className="flex gap-2 mb-2">
               <AlertTriangle size={16} className="text-[#F85149] shrink-0 mt-0.5" />
               <h4 className="text-[14px] font-semibold text-[#F85149]">Common <code className="font-mono">TypeError</code></h4>
            </div>
            <p className="text-[13px] text-[#C9D1D9] ml-6 leading-relaxed mb-3">
              {doc.errorDescription}
            </p>
            {doc.errorExample && (
               <div className="bg-[#0D1117] border border-[#30363D] rounded p-3 font-mono text-[12px] text-[#C9D1D9] ml-6 whitespace-pre">
                 {doc.errorExample}
               </div>
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#30363D]">
          <a 
            href={doc.url || mdnSearchUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#58A6FF] hover:text-[#79C0FF] transition-colors"
          >
            Read more on MDN <ExternalLink size={14} />
          </a>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="absolute lg:static inset-0 z-30 flex w-full lg:w-[320px] xl:w-[400px] bg-[#010409] border-l border-[#30363D] flex-col shrink-0 flex-shrink-0">
      <div className="h-9 border-b border-[#30363D] flex items-center px-4 shrink-0 justify-between bg-[#161B22] lg:bg-[#0D1117]">
        <div className="flex items-center gap-2 text-[#C9D1D9] font-semibold text-[11px] tracking-wider uppercase">
          Reference Library
        </div>
        <button className="text-[#8B949E] hover:text-[#C9D1D9] p-1" onClick={onClose}>
          <X size={16} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 scroll-smooth">
        {renderContent()}
      </div>
    </div>
  );
}
