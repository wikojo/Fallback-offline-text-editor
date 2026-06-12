import { X, RefreshCw } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  files: { id: string, name: string, language: string, content?: string }[];
}

export default function Preview({ isOpen, onClose, files }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const getCombinedHtml = () => {
    // Find index.html or first html file
    const htmlFile = files.find(f => f.name === 'index.html') || files.find(f => f.language === 'html');
    let htmlContent = htmlFile?.content || '<h1>No HTML file found</h1>';

    // Find custom CSS
    const cssFiles = files.filter(f => f.language === 'css').map(f => f.content).join('\n');
    
    // Find custom JS
    const jsFiles = files.filter(f => f.language === 'javascript').map(f => f.content).join('\n');

    // Inject CSS
    if (cssFiles && !htmlContent.includes('<style id="preview-css">')) {
      if (htmlContent.includes('</head>')) {
        htmlContent = htmlContent.replace('</head>', `\n<style id="preview-css">\n${cssFiles}\n</style>\n</head>`);
      } else {
        htmlContent = `<style id="preview-css">\n${cssFiles}\n</style>\n` + htmlContent;
      }
    }

    // Inject JS
    if (jsFiles && !htmlContent.includes('<script id="preview-js">')) {
      if (htmlContent.includes('</body>')) {
        htmlContent = htmlContent.replace('</body>', `\n<script id="preview-js">\n${jsFiles}\n</script>\n</body>`);
      } else {
        htmlContent = htmlContent + `\n<script id="preview-js">\n${jsFiles}\n</script>\n`;
      }
    }

    return htmlContent;
  };

  const refreshPreview = () => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = getCombinedHtml();
    }
  };

  useEffect(() => {
    if (isOpen) {
      refreshPreview();
    }
  }, [isOpen, files]);

  if (!isOpen) return null;

  return (
    <div className="flex flex-col w-full h-full bg-white border-l border-[#30363D] overflow-hidden">
      <div className="flex items-center justify-between px-3 h-9 bg-[#0D1117] border-b border-[#30363D] shrink-0">
        <div className="text-[11px] font-semibold tracking-wider text-[#8B949E] uppercase flex items-center gap-2">
          <span>Live Preview</span>
          <span className="bg-[#1F6FEB] text-white px-1.5 py-0.5 rounded text-[9px] lowercase font-mono">localhost</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={refreshPreview}
            className="p-1 hover:bg-[#30363D] rounded text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
            title="Refresh Preview"
          >
            <RefreshCw size={14} />
          </button>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-[#30363D] rounded text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden bg-white relative">
        <iframe
          ref={iframeRef}
          title="Preview"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-downloads allow-modals"
        />
      </div>
    </div>
  );
}
