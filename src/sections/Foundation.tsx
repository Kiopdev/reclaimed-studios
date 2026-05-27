import { motion } from 'motion/react';
import { Compass, Mountain, Users, Diamond, Play } from 'lucide-react';

const foundations = [
  {
    icon: Compass,
    title: "STORY DRIVEN",
    desc: "Meaningful narratives that connect and leave a lasting impact."
  },
  {
    icon: Mountain,
    title: "IMMERSIVE WORLDS",
    desc: "Detailed, living worlds built for exploration and wonder."
  },
  {
    icon: Users,
    title: "PLAYER FIRST",
    desc: "We respect your time and build experiences worth playing."
  },
  {
    icon: Diamond,
    title: "CRAFTED WITH CARE",
    desc: "Small team. Big ambition. Relentless attention to every detail."
  }
];

export function Foundation() {
  return (
    <section id="about" className="relative z-10 border-y border-white/5 bg-darker drop-shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 divide-y md:divide-y-0 lg:divide-x divide-white/5">
        
        {/* Foundation Header Block */}
        <div className="lg:col-span-1 p-8 lg:p-12 flex flex-col justify-center bg-white/[0.02]">
          <h4 className="text-moss font-mono text-[10px] tracking-widest mb-2 uppercase">Our</h4>
          <h3 className="text-white font-serif tracking-widest text-lg flex items-center gap-3">
            FOUNDATION <span className="w-2 h-2 rotate-45 border border-moss" />
          </h3>
          <p className="text-gray-500 text-xs mt-6 leading-relaxed max-w-[200px]">
            The principles that guide everything we create.
          </p>
        </div>

        {/* Feature Blocks */}
        {foundations.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="lg:col-span-1 p-8 lg:p-12 flex flex-col items-center justify-center text-center hover:bg-white/[0.02] transition-colors group"
          >
            <item.icon strokeWidth={1} className="w-8 h-8 text-moss/60 mb-6 group-hover:text-moss group-hover:scale-110 transition-all duration-500" />
            <h4 className="font-mono text-[11px] tracking-widest text-gray-300 mb-4 uppercase">{item.title}</h4>
            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
