import { motion } from 'motion/react';
import { ArrowRight, Infinity as InfinityIcon, Gamepad2 } from 'lucide-react';

export function StudioSnapshot() {
  return (
    <section id="studio" className="relative z-10 border-b border-white/5 bg-darker">
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
        
        {/* Left Side - Snapshot Title */}
        <div className="lg:col-span-4 p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6 hidden md:flex">
             <h4 className="text-moss font-mono text-[9px] tracking-[0.2em] uppercase">Studio Snapshot</h4>
             <span className="w-1.5 h-1.5 rotate-45 border border-moss" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-300 tracking-wide">
            A SMALL TEAM.<br />
            <span className="text-moss text-glow">BOUNDLESS AMBITION.</span>
          </h2>
        </div>

        {/* Middle - Stats & Meet Team */}
        <div className="lg:col-span-5 flex flex-col justify-between p-8 lg:p-12">
          <p className="text-gray-500 font-sans text-xs leading-relaxed max-w-sm mb-12">
            Just 8 people with a shared dream to create unforgettable adventures that inspire, challenge, and endure.
          </p>
          
          <div className="flex items-end gap-12 text-center lg:text-left mb-12">
            <div>
              <div className="font-serif text-5xl text-white mb-2">8</div>
              <div className="font-mono text-[9px] tracking-widest text-moss uppercase">Members</div>
            </div>
            <div>
              <div className="font-serif text-5xl text-white mb-2">1</div>
              <div className="font-mono text-[9px] tracking-widest text-moss uppercase">Project</div>
            </div>
            <div>
              <div className="font-serif text-4xl text-white mb-3 flex justify-center"><InfinityIcon strokeWidth={1} size={40} /></div>
              <div className="font-mono text-[9px] tracking-widest text-moss uppercase">Passion</div>
            </div>
          </div>

          <button className="flex items-center justify-between w-max gap-8 px-6 py-3 border border-white/20 hover:border-moss transition-colors font-mono text-[9px] tracking-[0.2em] uppercase group glass-panel overgrown-button">
            Meet the Team
            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform text-white/50 group-hover:text-moss" />
          </button>
        </div>

        {/* Right Side - Newsletter/Loop */}
        <div className="lg:col-span-3 p-8 lg:p-12 border-l border-white/5 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542451313056-b7c8e626645f?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-1000" />
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
             <h4 className="text-moss font-mono text-[9px] tracking-[0.2em] uppercase">Stay in the Loop</h4>
             <span className="w-1.5 h-1.5 rotate-45 border border-moss" />
          </div>

          <p className="text-gray-400 font-sans text-xs leading-relaxed mb-6 relative z-10">
            Stories, devlogs, and updates from our journey.
          </p>

          <form className="flex border border-white/20 relative z-10 focus-within:border-moss transition-colors">
             <input type="email" placeholder="ENTER YOUR EMAIL" className="bg-transparent border-none outline-none text-xs font-mono px-4 py-3 w-full uppercase placeholder:text-gray-600 focus:ring-0" />
             <button type="submit" className="px-4 hover:bg-white/5 transition-colors border-l border-white/20 group-focus-within:border-moss">
               <ArrowRight size={14} className="text-gray-500 hover:text-moss transition-colors" />
             </button>
          </form>
        </div>

      </div>
    </section>
  );
}
