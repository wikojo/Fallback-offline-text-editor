import { FileCode2, ChevronRight, FolderOpen, Book, Plus } from 'lucide-react';
import { SidebarTab } from '../types';
import React, { useState, useRef, useEffect } from 'react';

interface Props {
  activeTab: SidebarTab;
  activeTopicId: string;
  onTopicSelect: (id: string) => void;
  files?: { id: string, name: string, language: string, content?: string }[];
  activeFileId?: string;
  onFileSelect?: (id: string) => void;
  onNewFile?: (name: string) => void;
  onOpenLocalFolder?: () => void;
}

export default function Sidebar({ activeTab, activeTopicId, onTopicSelect, files = [], activeFileId, onFileSelect, onNewFile, onOpenLocalFolder }: Props) {
  const [isCreating, setIsCreating] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCreating) {
      inputRef.current?.focus();
    }
  }, [isCreating]);

  const handleCreateFile = () => {
    if (newFileName.trim() && onNewFile) {
      onNewFile(newFileName.trim());
    }
    setIsCreating(false);
    setNewFileName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCreateFile();
    if (e.key === 'Escape') {
      setIsCreating(false);
      setNewFileName('');
    }
  };

  if (activeTab === 'explorer') {
    return (
      <div className="w-60 bg-[#0D1117] border-r border-[#30363D] flex flex-col shrink-0 text-[#C9D1D9] text-sm">
        <div className="h-9 flex items-center px-4 font-semibold text-[11px] tracking-wider text-[#8B949E] uppercase justify-between group">
          <span>Explorer</span>
          <div className="flex items-center gap-1">
            <button 
              onClick={onOpenLocalFolder}
              className="p-0.5 hover:bg-[#30363D] hover:text-[#C9D1D9] rounded transition-all text-[#8B949E]"
              title="Open Local Folder"
            >
              <FolderOpen size={14} />
            </button>
            <button 
              onClick={() => setIsCreating(true)}
              className="p-0.5 hover:bg-[#30363D] hover:text-[#C9D1D9] rounded transition-all text-[#8B949E]"
              title="New File"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
        <div className="px-1 py-1">
          <div className="flex items-center gap-1.5 px-2 py-1 text-[13px] font-semibold text-[#C9D1D9] hover:bg-[#21262D] rounded-sm cursor-pointer transition-colors">
            <ChevronRight size={14} className="text-[#8B949E] transition-transform rotate-90" />
            <FolderOpen size={14} className="text-[#58A6FF]" />
            <span className="truncate">learning-project</span>
          </div>
          <div className="ml-5 mt-0.5 flex flex-col gap-0.5">
            {isCreating && (
              <div className="flex items-center gap-2 px-2 py-1 text-[13px]">
                <FileCode2 size={14} className="text-[#8B949E]" />
                <input 
                  ref={inputRef}
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={() => {
                    // Slight delay to allow save if clicking out
                    setTimeout(() => {
                      setIsCreating(false);
                      setNewFileName('');
                    }, 150);
                  }}
                  placeholder="filename.ext"
                  className="bg-[#010409] border border-[#30363D] rounded px-1.5 py-0.5 text-[12px] text-[#C9D1D9] focus:outline-none focus:border-[#58A6FF] w-full"
                />
              </div>
            )}
            {files.map(file => (
              <div 
                key={file.id}
                onClick={() => onFileSelect && onFileSelect(file.id)}
                className={`flex items-center gap-2 px-2 py-1 text-[13px] rounded-sm cursor-pointer transition-colors ${
                  activeFileId === file.id 
                    ? 'bg-[#1F6FEB]/15 text-[#58A6FF]' 
                    : 'text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#21262D]'
                }`}
              >
                <FileCode2 size={14} className={
                  file.language === 'css' ? 'text-[#3FB950]' : 
                  file.language === 'typescript' ? 'text-[#3178C6]' :
                  file.language === 'html' ? 'text-[#E34F26]' :
                  file.language === 'json' ? 'text-[#F8C51E]' :
                  file.language === 'python' ? 'text-[#3572A5]' :
                  'text-[#D2A8FF]'
                } />
                <span>{file.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'docs') {
    return (
      <div className="w-60 bg-[#0D1117] border-r border-[#30363D] flex flex-col shrink-0 shadow-[-1px_0_0_#30363D_inset]">
        <div className="h-9 flex items-center px-4 font-semibold text-[11px] tracking-wider text-[#8B949E] uppercase">
          Reference Library
        </div>
        <div className="flex-1 overflow-y-auto px-1 py-1">
          <div className="mb-2">
            <div className="flex items-center gap-1.5 px-2 py-1 text-[13px] font-semibold text-[#C9D1D9] hover:bg-[#21262D] rounded-sm cursor-pointer transition-colors">
              <ChevronRight size={14} className="text-[#8B949E] transition-transform rotate-90" />
              <Book size={14} className="text-[#A371F7]" />
              <span>JavaScript MDN Core</span>
            </div>
            <div className="ml-5 mt-0.5 flex flex-col gap-0.5">
              {[
                { id: 'variable_declaration', title: 'Variable Declarations (const)' },
                { id: 'array_iteration', title: 'Array.prototype.forEach()' },
                { id: 'functions', title: 'Arrow Function Expressions' }
              ].map(concept => {
                const isActive = activeTopicId === concept.id;
                return (
                  <button
                    key={concept.id}
                    onClick={() => onTopicSelect(concept.id)}
                    className={`flex items-center gap-2 px-2 py-1 text-[12px] text-left rounded-sm transition-colors ${
                      isActive 
                        ? 'bg-[#1F6FEB]/15 text-[#58A6FF]' 
                        : 'text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#21262D]'
                    }`}
                  >
                    <span className="truncate">{concept.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-60 bg-[#0D1117] border-r border-[#30363D] flex flex-col shrink-0">
      <div className="h-9 flex items-center px-4 font-semibold text-[11px] tracking-wider text-[#8B949E] uppercase">
        Search Docs
      </div>
      <div className="p-3">
        <input 
          type="text" 
          placeholder="Search documentation..." 
          className="w-full bg-[#010409] border border-[#30363D] rounded px-2.5 py-1.5 text-[12px] text-[#C9D1D9] placeholder:text-[#8B949E] focus:outline-none focus:border-[#58A6FF] transition-colors"
        />
      </div>
    </div>
  );
}
