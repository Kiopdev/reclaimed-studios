import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TermIcon, ShieldAlert } from 'lucide-react';

export function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "INITIALIZING KERNEL [OS v9.42.1]",
    "ESTABLISHING SECURE CONNECTION...",
    "ACCESS GRANTED.",
    "USER: GUEST_00492",
    "TYPE 'help' FOR AVAILABLE COMMANDS."
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === 'Escape') {
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommand = async (cmd: string) => {
    const normalizedCmd = cmd.trim().toLowerCase();
    if (!normalizedCmd) return;

    setLogs(prev => [...prev, `ADMIN@LPS:~$ ${cmd}`]);

    let response: string[] = [];

    switch(normalizedCmd) {
      case 'help':
        response = [
          "AVAILABLE COMMANDS:",
          "- about     : Details on the universe",
          "- clear     : Clear terminal",
          "- lore      : Access classified lore",
          "- districts : List known sectors",
          "- socials   : External links",
          "- updates   : Development status",
          "- system    : Diagnostics",
          "- credits   : Core team"
        ];
        break;
      case 'about':
        response = [
          "PROJECT RECLAIMED is an upcoming story-driven experience.",
          "A world defined by mystery, survival, and identity."
        ];
        break;
      case 'clear':
        setLogs([]);
        return;
      case 'lore':
        response = ["ACCESS DENIED. CLEARANCE LEVEL 4 REQUIRED."];
        break;
      case 'districts':
        response = [
          "KNOWN SECTORS:",
          "[01] UPPER SPINDLE (SECURE)",
          "[02] NEON BARRENS (UNSTABLE)",
          "[03] SUB-CORE PIPES (DANGER)",
          "[04] BLACK MARKET (ENCRYPTED)"
        ];
        break;
      case 'socials':
        try {
          const res = await fetch('/config/socials.json');
          const data = await res.json();
          response = ["EXTERNAL COMMS LINKS:"];
          Object.entries(data).forEach(([platform, link]) => {
             response.push(`[${platform.toUpperCase()}]: ${link}`);
          });
        } catch {
          response = ["COMMUNICATION RELAY OFFLINE."];
        }
        break;
      case 'updates':
        response = ["NAVIGATE TO SECTOR: /#updates"];
        break;
      case 'system':
        response = [
          "CPU: 92% ALLOCATED TO RENDER",
          "MEM: 12TB VRAM STABLE",
          "NET: 0.04ms LATENCY TO ORBITAL RELAY",
          "STATUS: OPTIMAL RUNTIME"
        ];
        break;
      case 'credits':
        response = ["DIRECTED BY RECLAIMED STUDIOS.", "8 CORE DEVELOPERS."];
        break;
      default:
        response = [`ERROR: COMMAND '${cmd}' NOT RECOGNIZED.`];
    }

    setLogs(prev => [...prev, ...response]);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-10 h-10 border border-moss/30 rounded flex items-center justify-center text-moss/50 hover:bg-moss/10 hover:text-moss transition-all glass-panel"
        title="Access Terminal"
      >
        <TermIcon size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-20 right-6 w-80 md:w-[450px] h-[400px] z-[100] bg-darker/95 border border-moss/20 rounded shadow-2xl p-4 font-mono text-xs flex flex-col mix-blend-normal backdrop-blur-xl"
            style={{
              boxShadow: '0 0 50px rgba(95, 122, 67, 0.05), inset 0 0 20px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-moss/10 pb-2 mb-4">
              <div className="flex items-center gap-2 text-moss">
                <ShieldAlert size={14} />
                <span className="tracking-widest">SYS.TERMINAL</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">✕</button>
            </div>

            {/* Logs Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto flex flex-col gap-1 mb-4 text-[#a1dd70]/80 custom-scrollbar pr-2">
              {logs.map((log, i) => (
                <div key={i} className="leading-relaxed break-words whitespace-pre-wrap">
                  {log.startsWith('ADMIN') ? (
                    <span className="text-white/60">{log}</span>
                  ) : (
                    <><span className="text-gray-600 mr-2">&gt;</span>{log}</>
                  )}
                </div>
              ))}
              <div className="animate-pulse opacity-50 mt-2">_</div>
            </div>

            {/* Input line */}
            <div className="flex items-center gap-2 text-moss/80 mt-auto border-t border-white/5 pt-2">
              <span className="shrink-0">ADMIN@LPS:~$</span>
              <input 
                ref={inputRef}
                type="text" 
                className="bg-transparent border-none outline-none w-full text-white/90 font-mono focus:ring-0 cursor-[text]" 
                placeholder="Enter command..."
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const el = e.target as HTMLInputElement;
                    handleCommand(el.value);
                    el.value = '';
                  }
                }}
              />
            </div>
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-moss/50" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-moss/50" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-moss/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-moss/50" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
