import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const links = ['HOME', 'GAMEPLAY', 'LORE', 'MEDIA', 'UPDATES', 'ABOUT', 'STUDIO'];

  const handleNav = (id: string) => {
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between pointer-events-none">
        {/* Logo */}
        <div 
          onClick={() => {
            if (location.pathname !== '/') navigate('/');
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-4 group cursor-pointer pointer-events-auto"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <motion.div 
              className="absolute inset-0 border-2 border-gold/40 rotate-45 transform group-hover:border-gold transition-colors duration-500"
              animate={{ rotate: 45 }}
              whileHover={{ scale: 1.1, rotate: 135 }}
            />
            <span className="font-serif text-lg font-bold text-gold group-hover:text-white transition-colors z-10">X</span>
          </div>
          <div className="flex flex-col uppercase tracking-[0.2em] text-[10px] leading-tight drop-shadow-md">
            <span className="font-bold text-white">Syntax</span>
            <span className="text-gray-400">Studio</span>
          </div>
        </div>

        {/* Hamburger */}
        <button 
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 border border-gold/30 rounded flex items-center justify-center hover:bg-gold/10 hover:border-gold transition-colors glass-panel pointer-events-auto text-gold"
        >
          <Menu size={18} />
        </button>
      </nav>

      {/* Futuristic Sidebar Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex justify-end pointer-events-auto"
          >
            {/* Backdrop click to close */}
            <div className="absolute inset-0 bg-darker/90 backdrop-blur-xl" onClick={() => setIsOpen(false)} />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full md:w-96 h-full bg-black/50 border-l border-gold/10 p-8 flex flex-col justify-center relative z-10"
            >
               <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-8 right-8 text-white/50 hover:text-white border border-white/20 hover:border-gold p-3 rounded-full transition-colors group"
                >
                  <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>

                <div className="flex flex-col gap-8 flex-1 justify-center max-w-sm mx-auto w-full">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-gold uppercase mb-4 border-b border-white/10 pb-4">
                    SYS.NAV_CORE
                  </div>
                  
                  {links.map((link, i) => {
                    const id = link === 'HOME' ? 'home' : link.toLowerCase();
                    return (
                      <motion.a 
                        key={link}
                        href={`/#${id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNav(id);
                        }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="font-serif text-3xl md:text-4xl text-gray-400 hover:text-white hover:translate-x-4 transition-all duration-300 flex items-center gap-4 group"
                      >
                        <span className="text-[10px] font-mono text-gold/50 group-hover:text-gold w-6">
                          0{i + 1}
                        </span>
                        <span className="group-hover:text-glow">{link}</span>
                      </motion.a>
                    );
                  })}
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-gray-500">
                  <span>STATUS: SECURE</span>
                  <span>v9.42</span>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
