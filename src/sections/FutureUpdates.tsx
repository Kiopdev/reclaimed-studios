import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { BatteryCharging, Clock, Rocket } from 'lucide-react';

interface Update {
  title: string;
  status: string;
  description: string;
}

export function FutureUpdates() {
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    fetch('/data/future-updates.json')
      .then(res => res.json())
      .then(setUpdates)
      .catch(console.error);
  }, []);

  const getStatusIcon = (status: string) => {
    switch(status.toLowerCase()) {
      case 'in progress': return <Clock size={14} className="text-moss animate-pulse" />;
      case 'testing': return <BatteryCharging size={14} className="text-rust" />;
      case 'planned': return <Rocket size={14} className="text-gray-500" />;
      default: return <Clock size={14} />;
    }
  };

  return (
    <section className="relative py-24 z-10 bg-darker border-t border-white/5" id="updates">
      <div className="container mx-auto px-8 lg:px-24">
        <div className="flex items-center gap-3 mb-12">
            <h4 className="text-moss font-mono text-[9px] tracking-[0.2em] uppercase">Development Roadmap</h4>
            <span className="w-1.5 h-1.5 rotate-45 border border-moss" />
            <div className="flex-1 h-[1px] bg-gradient-to-r from-moss/20 to-transparent" />
        </div>

        <h2 className="font-serif text-3xl md:text-5xl text-white tracking-wide mb-12">
          FUTURE <span className="text-gray-500 italic">UPDATES</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.map((update, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-moss/30 transition-all duration-300 p-8 flex flex-col gap-4 group overgrown-button"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-2">
                <div className="font-mono text-[9px] uppercase tracking-widest text-gray-400 group-hover:text-moss transition-colors">
                  LOG_ENTRY_{100 + i}
                </div>
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-white/70">
                  {getStatusIcon(update.status)}
                  {update.status}
                </div>
              </div>
              <h3 className="font-sans text-lg text-white font-medium">{update.title}</h3>
              <p className="font-sans text-xs text-gray-400 leading-relaxed">
                {update.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
