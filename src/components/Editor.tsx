import { ChevronRight, FileCode2, X, Play, Save, Check, ArrowRightToLine } from 'lucide-react';
import MonacoEditor from '@monaco-editor/react';
import { useRef, useState, useEffect } from 'react';

import { emmetHTML, emmetCSS, emmetJSX } from 'emmet-monaco-es';

interface Props {
  activeDocId: string;
  onLineClick: (id: string) => void;
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  onCloseFile?: () => void;
  file?: { id: string, name: string, language: string };
}

export default function Editor({ activeDocId, onLineClick, code, onChange, onRun, onCloseFile, file }: Props) {
  const [isSaved, setIsSaved] = useState(true);
  const [showSavedMsg, setShowSavedMsg] = useState(false);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    setIsSaved(true);
  }, [file?.id]); // Reset saved state when changing files

  useEffect(() => {
    setIsSaved(false);
  }, [code]);

  const handleSave = () => {
    setIsSaved(true);
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 2000);
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    emmetHTML(monaco);
    emmetCSS(monaco);
    emmetJSX(monaco);

    // Customize Monaco theme to match GitHub Dark Dimmed somewhat
    monaco.editor.defineTheme('github-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '8B949E' },
        { token: 'keyword', foreground: 'FF7B72' },
        { token: 'string', foreground: 'A5D6FF' },
        { token: 'identifier', foreground: 'C9D1D9' },
        { token: 'type.identifier', foreground: 'D2A8FF' },
      ],
      colors: {
        'editor.background': '#0D1117',
        'editor.foreground': '#C9D1D9',
        'editorLineNumber.foreground': '#6E7681',
        'editor.selectionBackground': '#21262D',
        'editor.inactiveSelectionBackground': '#21262D',
      }
    });
    monaco.editor.setTheme('github-dark');

    editor.onDidChangeCursorPosition((e: any) => {
      const position = e.position;
      const model = editor.getModel();
      const wordInfo = model.getWordAtPosition(position);
      
      let matchedId = '';
      
      if (wordInfo) {
        const word = wordInfo.word;
        if (word === 'const' || word === 'let' || word === 'var') matchedId = 'variable_declaration';
        if (word === 'forEach' || word === 'map' || word === 'filter') matchedId = 'array_iteration';
      }
      
      const lineText = model.getLineContent(position.lineNumber);
      if (lineText.includes('=>') && !matchedId) {
        matchedId = 'functions';
      }

      if (matchedId) {
        onLineClick(matchedId);
      }
    });

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      handleSave();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRun();
    });
  };

  return (
    <div className="flex flex-col flex-1 min-w-0 bg-[#0D1117]">
      {/* Editor Tabs */}
      <div className="flex bg-[#010409] border-b border-[#30363D] h-9 px-0 items-end shrink-0 overflow-x-auto">
        <div className="flex items-center gap-2 px-3 h-full bg-[#0D1117] border-t border-x border-transparent border-t-[#58A6FF] text-[#C9D1D9] text-[13px] cursor-default relative">
          <FileCode2 size={14} className={file?.language === 'css' ? 'text-[#3FB950]' : 'text-[#D2A8FF]'} />
          <span>{file?.name || 'index.js'}</span>
          {!isSaved && <div className="w-2 h-2 rounded-full bg-[#C9D1D9] ml-1" title="Unsaved changes" />}
          {isSaved && <X size={14} className="text-[#8B949E] hover:text-[#C9D1D9] cursor-pointer ml-1" onClick={(e) => { e.stopPropagation(); onCloseFile && onCloseFile(); }} />}
        </div>
      </div>

      {/* Breadcrumbs & Actions */}
      <div className="flex items-center justify-between h-8 px-2 md:px-4 border-b border-[#30363D] shrink-0 bg-[#0D1117] overflow-x-auto">
        <div className="flex items-center gap-1 text-[12px] text-[#8B949E] whitespace-nowrap">
          <span className="hidden sm:inline hover:text-[#58A6FF] cursor-pointer transition-colors">learning-project</span>
          <ChevronRight size={14} className="hidden sm:block text-[#30363D]" />
          <span className="hover:text-[#58A6FF] cursor-pointer transition-colors">src</span>
          <ChevronRight size={14} className="text-[#30363D]" />
          <span className="text-[#C9D1D9]">{file?.name || 'index.js'}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              editorRef.current?.trigger('keyboard', 'tab', null);
              editorRef.current?.focus();
            }}
            title="Insert Tab"
            className="md:hidden flex items-center text-[12px] font-medium text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
          >
            <ArrowRightToLine size={16} />
          </button>

          <button 
            onClick={handleSave}
            title="Save (Cmd+S)"
            className="flex items-center gap-1.5 text-[12px] font-medium text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
          >
            {showSavedMsg ? (
              <span className="flex items-center gap-1.5 text-[#3FB950]"><Check size={13} /> Saved</span>
            ) : (
              <><Save size={13} /> Save</>
            )}
          </button>
          
          <button 
            onClick={onRun}
            title="Run Code (Cmd+Enter)"
            className="flex items-center gap-1.5 text-[12px] font-medium text-[#3FB950] hover:text-[#56D364] transition-colors"
          >
            <Play size={13} className="fill-current" />
            Run
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="flex flex-1 overflow-hidden relative">
        <MonacoEditor
          language={file?.language || "javascript"}
          theme="vs-dark" // fallback until custom theme loads
          path={file?.name || "index.js"}
          value={code}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineHeight: 1.6,
            fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            formatOnPaste: true,
          }}
        />
      </div>
    </div>
  );
}
