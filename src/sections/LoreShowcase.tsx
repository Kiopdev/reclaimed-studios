import { motion } from 'motion/react';
import { useState } from 'react';

const factions = [
  {
    id: '01',
    name: 'AETHERFALL',
    desc: 'Aetherfall was the city of ambition, distraction, and constant movement, designed to keep humanity focused on progress so people would never slow down long enough to confront the terrifying truths beneath reality. It looked like a normal modern metropolis filled with crowded streets, trains, glowing phones, overworked people, nightlife, noise, and endless motion, but beneath that surface it secretly functioned as one of the stabilizing pillars of civilization. The city pushed humanity forward technologically and socially, because stagnation and deep self-awareness once nearly destroyed the world.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '02',
    name: 'EIDOLON',
    desc: 'Eidolon was the city of memory, grief, and emotional consequence, preserving the emotional weight of civilization so humanity would not lose itself through forgetting. Unlike Aetherfall’s speed and chaos, Eidolon felt quiet, ancient, heavy, and deeply human, with old streets, memorial structures, and spaces that seemed haunted by the feelings of the people who once lived there. The city literally remembered emotional residue, allowing echoes of pain, betrayal, love, and loss to remain embedded in its architecture, forcing people to confront the truth that civilization is built not only on events, but on accumulated human suffering.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '03',
    name: 'SOL VEYR',
    desc: 'Sol Veyr was the hidden city of truth, concealment, and containment, created to guard the deepest and most dangerous knowledge about consciousness, reality, and the hidden weave beneath existence itself. It was not simply hidden geographically, but cognitively, existing behind layers of perception, memory distortion, and structural secrecy because humanity was not considered psychologically stable enough to survive learning the full truth all at once. Sol Veyr acted as the final lock holding civilization together, preserving forbidden knowledge while preventing another catastrophic collapse of reality and social coherence.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2000&auto=format&fit=crop'
  }
];

export function LoreShowcase() {
  const [active, setActive] = useState(factions[0]);

  return (
    <section id="lore" className="relative py-24 z-10 bg-darker overflow-hidden">
      {/* Background Image of the active faction */}
      <motion.div 
        key={active.id}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${active.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-darker via-darker/90 to-transparent" />

      <div className="container mx-auto px-8 lg:px-24 flex flex-col lg:flex-row relative z-10 gap-16">
        
        {/* Left Side Navigation */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-8">
             <span className="w-1.5 h-1.5 rotate-45 border border-moss" />
             <h4 className="text-moss font-mono text-[9px] tracking-[0.3em] uppercase">Uncharted Territories</h4>
          </div>

          <div className="flex flex-col gap-2">
            {factions.map((f) => (
              <button 
                key={f.id}
                onClick={() => setActive(f)}
                className={`text-left py-4 px-4 transition-all duration-300 group overgrown-button ${
                  active.id === f.id ? 'border-moss bg-moss/10' : 'border-white/10 hover:border-moss/30 hover:bg-moss/[0.05]'
                }`}
                style={{ borderLeftWidth: '2px' }}
              >
                <div className={`font-mono text-[9px] tracking-widest uppercase mb-1 ${active.id === f.id ? 'text-moss' : 'text-gray-500'}`}>
                  REGION {f.id}
                </div>
                <div className={`font-serif text-xl tracking-wide ${active.id === f.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                  {f.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side Content */}
        <div className="lg:w-2/3 flex flex-col justify-center min-h-[400px]">
           <motion.div
             key={`content-${active.id}`}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="max-w-2xl"
           >
             <div className="font-mono text-[12px] tracking-[0.4em] text-white/30 uppercase mb-4 mix-blend-screen text-glow">
               MAP ARCHIVE: {active.name.replace(/\s+/g, '_')}
             </div>
             <h2 className="font-serif font-black text-5xl md:text-7xl text-white mb-8 tracking-tighter uppercase leading-none drop-shadow-xl text-glow overgrown-text">
               {active.name}
             </h2>
             <p className="font-sans text-gray-400 leading-relaxed text-lg pb-8 border-b border-white/10">
               {active.desc}
             </p>

             <div className="mt-8 flex gap-8">
                <div>
                  <div className="font-mono text-[9px] text-gray-500 tracking-widest uppercase mb-1">Nature</div>
                  <div className="font-mono text-rust tracking-widest uppercase font-bold drop-shadow-md">
                    {active.id === '01' ? 'DISTRACTION' : active.id === '02' ? 'MEMORY' : 'CONCEALMENT'}
                  </div>
                 </div>
                 <div>
                  <div className="font-mono text-[9px] text-gray-500 tracking-widest uppercase mb-1">Architecture</div>
                  <div className="font-mono text-moss tracking-widest uppercase font-bold drop-shadow-md">
                    {active.id === '01' ? 'METROPOLIS' : active.id === '02' ? 'MEMORIALS' : 'CONTAINMENT'}
                  </div>
                 </div>
             </div>
           </motion.div>
        </div>

      </div>
    </section>
  );
}
