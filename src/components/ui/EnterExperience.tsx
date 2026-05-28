import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';

export function EnterExperience({ onEnter }: { onEnter: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleEnter = () => {
    setIsVisible(false);
    setTimeout(onEnter, 100);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-darker"
        >
          {/* Cinematic subtle background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-darker via-darker/80 to-darker" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative z-10 flex flex-col items-center text-center gap-8"
          >
            <div className="font-mono text-[10px] tracking-[0.4em] text-moss uppercase animate-pulse">System Online</div>
            
            <button 
              onClick={handleEnter}
              className="group relative px-8 py-4 flex items-center gap-4 border border-moss/30 hover:border-moss bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-700 glass-panel overflow-hidden"
            >
              <div className="absolute inset-0 bg-moss/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <Play className="w-5 h-5 text-moss group-hover:scale-110 transition-transform duration-500" />
              <span className="font-serif text-lg tracking-[0.3em] text-white">ENTER EXPERIENCE</span>
            </button>
            <div className="font-mono text-[9px] tracking-widest text-gray-500 uppercase">Headphones Recommended</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
