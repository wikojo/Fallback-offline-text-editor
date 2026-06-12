import { useState } from 'react';
import Titlebar from './components/Titlebar';
import ActivityBar from './components/ActivityBar';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Documentation from './components/Documentation';
import Terminal from './components/Terminal';
import StatusBar from './components/StatusBar';
import Preview from './components/Preview';
import { SidebarTab } from './types';

export default function App() {
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>('explorer');
  const [activeDocId, setActiveDocId] = useState<string>('fetch');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyntaxMode, setIsSyntaxMode] = useState(false);
  
  const [files, setFiles] = useState([
    { id: 'index.js', name: 'index.js', language: 'javascript', content: '' }
  ]);
  const [activeFileId, setActiveFileId] = useState('index.js');
  
  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  const handleCodeChange = (newCode: string) => {
    setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, content: newCode } : f));
  };

  const handleNewFile = (fileName: string) => {
    let ext = fileName.split('.').pop()?.toLowerCase() || '';
    let language = 'javascript';
    let content = '';
    if (ext === 'css') {
      language = 'css';
      content = '/* Write your CSS here */\\n';
    } else if (ext === 'ts' || ext === 'tsx') {
      language = 'typescript';
      content = '// Write your TypeScript here\\n';
    } else if (ext === 'html') {
      language = 'html';
      content = '<!DOCTYPE html>\\n<html>\\n<head>\\n  <title>New Page</title>\\n</head>\\n<body>\\n  <!-- Write your HTML here -->\\n</body>\\n</html>';
    } else if (ext === 'json') {
      language = 'json';
      content = '{\\n  "key": "value"\\n}';
    } else if (ext === 'py') {
      language = 'python';
      content = '# Write your Python code here\\n\\ndef main():\\n    print("Hello from Python!")\\n\\nif __name__ == "__main__":\\n    main()';
    } else {
      content = '// Write your JavaScript here\\n';
    }

    const newFile = {
      id: fileName + Date.now(),
      name: fileName,
      language,
      content
    };
    setFiles(prev => [...prev, newFile]);
    setActiveFileId(newFile.id);
  };

  const handleOpenLocalFolder = async () => {
    try {
      if (!('showDirectoryPicker' in window)) {
        showToast('Local file access is not supported by your browser.');
        return;
      }
      
      try {
        const dirHandle = await (window as any).showDirectoryPicker();
        
        let loadedFiles = [];
        for await (const entry of dirHandle.values()) {
          if (entry.kind === 'file') {
            try {
              const file = await entry.getFile();
              
              // Skip large/binary files conservatively for safety
              if (file.size > 1024 * 1024) continue; 
              
              const content = await file.text();
              
              let ext = file.name.split('.').pop()?.toLowerCase() || '';
              let language = 'javascript';
              if (ext === 'css') language = 'css';
              if (ext === 'ts' || ext === 'tsx') language = 'typescript';
              if (ext === 'html') language = 'html';
              if (ext === 'json') language = 'json';
              if (ext === 'py') language = 'python';

              loadedFiles.push({
                id: entry.name + Date.now() + Math.random(),
                name: entry.name,
                language,
                content
              });
            } catch (err) {
              console.warn('Skipped reading file:', entry.name, err);
            }
          }
        }
        
        if (loadedFiles.length > 0) {
          setFiles(loadedFiles);
          setActiveFileId(loadedFiles[0].id);
          showToast(`Loaded ${loadedFiles.length} files from local folder.`);
        } else {
          showToast('Folder is empty or contains no supported files.');
        }

      } catch (err: any) {
        if (err.name === 'NotAllowedError' || err.message?.includes('cross-origin')) {
          showToast('File access blocked. Please open this app in a new tab.');
        } else if (err.name !== 'AbortError') {
          showToast(`Error opening folder: ${err.message || 'Unknown error'}`);
        }
      }
    } catch (e) {
      showToast('Error opening local folder.');
    }
  };

  const [outputLines, setOutputLines] = useState<{ id: string, text: string, type: 'log' | 'error' | 'cmd' }[]>([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRun = (currentCode: string) => {
    if (activeFile.language === 'html') {
      setIsPreviewOpen(true);
      return;
    }
    if (activeFile.language === 'python') {
      showToast('Python execution requires a backend server. Stay tuned!');
      return;
    }
    if (activeFile.language !== 'javascript') {
      showToast('Cannot run ' + activeFile.language + ' files directly inside the console environment.');
      return;
    }
    
    setIsTerminalOpen(true);
    const logs: { id: string, text: string, type: 'log' | 'error' | 'cmd' }[] = [
      { id: Date.now().toString() + '-cmd', text: 'node src/' + activeFile.name, type: 'cmd' }
    ];
    
    const originalLog = console.log;
    console.log = (...args) => {
      logs.push({
        id: Date.now().toString() + Math.random().toString(),
        text: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '),
        type: 'log'
      });
      // originalLog(...args); // Keep silent to avoid cluttering actual console
    };

    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(currentCode);
      fn();
    } catch (err: any) {
      logs.push({ id: Date.now().toString() + Math.random().toString(), text: err.toString(), type: 'error' });
    }

    console.log = originalLog;
    setOutputLines(prev => [...prev, ...logs]);
  };

  const handleClearTerminal = () => {
    setOutputLines([]);
  };

  return (
    <div className="flex flex-col h-[100dvh] text-[#C9D1D9] font-sans overflow-hidden bg-[#0D1117] relative w-full">
      <Titlebar 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        onActionClick={() => showToast('Action not supported in browser environment.')} 
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q) setActiveSidebarTab('docs');
          if (window.innerWidth >= 768) setIsSidebarOpen(true);
        }}
      />
      
      <div className="flex flex-1 overflow-hidden min-h-0 relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="absolute inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className={
          "absolute md:static z-40 h-full flex transition-transform duration-200 bg-[#0D1117] " +
          (isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0")
        }>
          <ActivityBar 
            activeTab={activeSidebarTab} 
            onTabChange={(tab) => {
              setActiveSidebarTab(tab);
              setIsSidebarOpen(true);
            }} 
            onSettingsClick={() => showToast('Settings coming soon.')}
          />
          <Sidebar 
            activeTab={activeSidebarTab} 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onTopicSelect={(id) => {
              setActiveDocId(id);
              setIsDocsOpen(true);
              if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
              }
            }} 
            activeTopicId={activeDocId} 
            files={files}
            activeFileId={activeFileId}
            onFileSelect={(id) => {
              setActiveFileId(id);
              if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
              }
            }}
            onNewFile={handleNewFile}
            onOpenLocalFolder={handleOpenLocalFolder}
          />
        </div>
        
        <div className="flex flex-1 flex-col min-w-0 md:border-l border-[#30363D]">
          <div className="flex flex-1 overflow-hidden relative">
            <div className="flex-1 overflow-hidden relative">
              <Editor 
                activeDocId={activeDocId} 
                isSyntaxMode={isSyntaxMode}
                onToggleSyntaxMode={() => setIsSyntaxMode(!isSyntaxMode)}
                onLineClick={(id) => {
                  setActiveDocId(id);
                  setIsDocsOpen(true);
                }} 
                code={activeFile.content || ''}
                onChange={handleCodeChange}
                onRun={() => handleRun(activeFile.content || '')}
                file={activeFile}
                onCloseFile={() => showToast('Cannot close the main entry point.')}
              />
            </div>
            
            {isPreviewOpen && (
              <div className="flex-1 border-l border-[#30363D] flex flex-col relative z-20 shadow-[-1px_0_0_#30363D]">
                <Preview isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} files={files} />
              </div>
            )}

            <Documentation 
              activeDocId={activeDocId} 
              isOpen={isDocsOpen}
              onClose={() => setIsDocsOpen(false)}
            />
          </div>
          <Terminal 
            outputLines={outputLines} 
            onClear={handleClearTerminal} 
            isOpen={isTerminalOpen}
            onToggle={() => setIsTerminalOpen(!isTerminalOpen)}
          />
        </div>
      </div>
      <StatusBar onActionClick={() => showToast('No connected repository.')} />

      {/* Global Toast */}
      {toastMessage && (
        <div className="absolute bottom-12 right-4 md:bottom-16 md:right-8 bg-[#161B22] border border-[#30363D] text-[#C9D1D9] px-4 py-2 rounded shadow-lg text-sm z-50 animate-in fade-in slide-in-from-bottom-5">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
