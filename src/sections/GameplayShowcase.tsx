import { motion } from 'motion/react';
import { Play, Lock, AlertTriangle } from 'lucide-react';

const slots = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  title: `ARCHIVED_LOG_${i + 1}`,
  locked: true,
  duration: `--:--`
}));

export function GameplayShowcase() {
  return (
    <section id="gameplay" className="relative py-24 z-10 bg-darker border-y border-white/5">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-[0.02]" />

      <div className="container mx-auto px-8 lg:px-24">
        
        <div className="flex items-end justify-between border-b border-white/10 pb-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <h4 className="text-gold font-mono text-[9px] tracking-[0.2em] uppercase">Archive System</h4>
               <span className="w-1.5 h-1.5 rotate-45 border border-gold" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-white tracking-wide">
              LEAKED <span className="text-gray-500 italic">FOOTAGE</span>
            </h2>
          </div>
          <div className="font-mono text-[10px] text-red-500/80 uppercase tracking-widest hidden md:flex items-center gap-2">
            <AlertTriangle size={12} /> Unstable Connection
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {slots.map((slot, i) => (
            <motion.div 
              key={slot.id}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className={`relative overflow-hidden group border ${slot.locked ? 'border-white/5 bg-white/[0.01]' : 'border-gold/20 bg-darker hover:border-gold/50'} cursor-pointer aspect-video flex flex-col justify-end p-4 transition-all duration-500`}
            >
              {!slot.locked && (
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              )}
              
              {!slot.locked ? (
                <>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 scale-90 group-hover:scale-100">
                    <div className="w-12 h-12 rounded-full border border-gold bg-gold/10 flex items-center justify-center text-gold backdrop-blur-sm shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                      <Play className="opacity-100 ml-1" size={20} fill="currentColor" />
                    </div>
                  </div>
                  <div className="relative z-10 flex justify-between items-end w-full font-mono text-[9px] uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div>
                      <div className="text-gold mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">[DECRYPTED]</div>
                      {slot.title}
                    </div>
                    <div>{slot.duration}</div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20 font-mono text-[9px] tracking-widest uppercase transition-colors group-hover:text-white/40">
                  <Lock size={16} className="mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                  Signal Lost
                </div>
              )}
              
              {/* Scanline effect on hover */}
              {!slot.locked && (
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-full w-full -translate-y-full group-hover:animate-[scanline_2s_linear_infinite]" />
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
