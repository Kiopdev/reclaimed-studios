import { cn } from '../../lib/utils';
import { motion } from 'motion/react';
import { useState } from 'react';

export function LostPunkLogo({ className }: { className?: string }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={cn("flex flex-col items-center select-none text-white", className)}>
      {!imageError ? (
        <motion.img 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          src="/assets/custom/logo.png" 
          alt="Project Reclaimed" 
          onError={() => setImageError(true)}
          className="w-full max-w-[600px] h-auto drop-shadow-2xl mix-blend-screen"
        />
      ) : (
        <>
          {/* THE - Fallback */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif font-black text-3xl md:text-5xl tracking-[0.45em] mb-[-0.5rem] md:mb-[-1rem] opacity-90 grunge-text z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            THE
          </motion.div>

          {/* LOST  - Fallback */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="flex font-anton text-[6rem] md:text-[10rem] leading-[0.85] tracking-tight grunge-text drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            LOST PUNK
          </motion.div>

          {/* Bottom Line & Triangles  - Fallback */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-start w-full mt-4 md:mt-8 opacity-85 px-4 justify-center"
          >
             <div className="flex-1 h-[4px] md:h-[8px] bg-white mt-1 md:mt-2 grunge-bg filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
             <div className="px-2 md:px-4 flex flex-col items-center">
               <svg viewBox="0 0 100 50" className="w-12 h-6 md:w-24 md:h-12 text-white grunge-bg filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  <path d="M0,0 L50,50 L100,0 L85,0 L50,35 L15,0 Z" fill="currentColor"/>
                  <path d="M25,0 L50,25 L75,0 L60,0 L50,10 L40,0 Z" fill="currentColor"/>
               </svg>
             </div>
             <div className="flex-1 h-[4px] md:h-[8px] bg-white mt-1 md:mt-2 grunge-bg filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
          </motion.div>
        </>
      )}
    </div>
  );
}
