import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';

export function BehindTheVision() {
  return (
    <section id="behind-the-vision" className="relative py-24 z-10 bg-darker">
      <div className="container mx-auto px-8 lg:px-24">
        {/* Behind The Vision Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-white mb-4">
            BEHIND THE VISION
          </h2>
          <p className="font-mono text-gray-500 text-xs tracking-widest uppercase">
            Coming Soon
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-4xl mx-auto aspect-video border border-white/10 p-2 bg-white/5 glass-panel flex flex-col items-center justify-center text-center"
        >
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-moss/50 -translate-x-[1px] -translate-y-[1px]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-moss/50 translate-x-[1px] -translate-y-[1px]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-moss/50 -translate-x-[1px] translate-y-[1px]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-moss/50 translate-x-[1px] translate-y-[1px]" />
          
           <div className="flex flex-col items-center gap-4 opacity-50">
            <span className="w-12 h-12 rounded-full border border-moss/30 flex items-center justify-center mb-4 text-moss">
              <AlertCircle size={20} />
            </span>
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-moss">
              Transmission Pending
            </div>
            <div className="font-serif text-2xl text-white">
              STAY TUNED
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
