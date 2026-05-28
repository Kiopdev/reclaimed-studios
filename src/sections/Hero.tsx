import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Hero() {
  const [banner, setBanner] = useState<string>('');

  useEffect(() => {
    fetch('/config/banners.json')
      .then(res => res.json())
      .then(data => {
        // Fallback to a super cinematic image if none is parsed correctly
        setBanner(data.mainBanner || 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2000&auto=format&fit=crop');
      })
      .catch(() => {
        setBanner('https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2000&auto=format&fit=crop');
      });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 z-10 px-8 lg:px-32 mix-blend-lighten overflow-visible">
      {banner && (
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.15, 1], x: [0, -30, 0] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-full h-full bg-cover bg-center opacity-40 md:opacity-60 mix-blend-screen"
            style={{ backgroundImage: `url(${banner})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-darker via-darker/70 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent border-b-2 border-darker" />
          {/* Subtle light leak */}
          <motion.div 
            animate={{ opacity: [0.1, 0.4, 0.1], x: [-100, 100, -100] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[10%] w-[60vw] h-[60vh] bg-gold/10 blur-[200px] rounded-full mix-blend-screen" 
          />
        </div>
      )}

      {/* Side Dots Navigation (Visual Only) */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 text-gray-500 hidden md:flex">
        <span className="text-moss font-mono text-[10px] tracking-widest mb-4">01</span>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`w-1 h-1 rounded-full ${i === 1 ? 'bg-moss' : 'bg-gray-700'}`} />
        ))}
        <div className="hidden h-32 w-[1px] bg-gradient-to-b from-gray-700 to-transparent mt-4" />
        <div className="writing-vertical-rl text-[9px] tracking-[0.3em] uppercase mt-12 rotate-180 opacity-50 text-moss">
          Scroll to explore
        </div>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-4 opacity-50 text-moss"
        >
          ↓
        </motion.div>
      </div>

      <div className="max-w-4xl pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-moss font-mono tracking-[0.25em] text-xs font-semibold mb-6 flex items-center gap-4 overgrown-text">
            WE RECLAIM <span className="w-12 h-[1px] bg-moss/50" />
          </h2>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[1.0] tracking-tighter mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <span className="block text-white">WORLDS</span>
            <span className="block text-gray-400 mt-2">WORTH</span>
            <span className="block text-glow-intense text-white italic mt-2">EXPLORING</span>
          </h1>
          
          <div className="flex items-center gap-4 mb-10 w-fit">
            <div className="w-2 h-2 rotate-45 border border-moss" />
            <div className="h-[1px] w-64 bg-gradient-to-r from-moss/50 to-transparent" />
          </div>

          <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed max-w-lg mb-12">
            We're an independent game studio crafting epic, story-driven experiences about finding beauty in the ruins, staying with you long after the credits roll.
          </p>

          <Link to="/discover" className="inline-flex group relative z-50 px-8 py-4 border border-moss/40 hover:border-moss transition-all duration-500 glass-panel items-center gap-4 text-xs tracking-[0.2em] uppercase font-mono overgrown-button overflow-visible cursor-pointer">
            <div className="absolute inset-0 bg-moss/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none" />
            <span className="relative z-10 text-white pointer-events-none">Discover Our World</span>
            <ArrowRight size={14} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300 text-moss group-hover:text-white pointer-events-none" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
