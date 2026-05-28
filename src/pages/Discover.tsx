import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Artifact3D } from '../components/3d/Artifact3D';

export function Discover() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-16 px-8 lg:px-24">
      <Link 
        to="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-mono text-[10px] tracking-widest uppercase mb-12 transition-colors cyber-button px-4 py-2 bg-white/5 border border-white/10 relative z-50 hover:border-moss"
      >
        <ArrowLeft size={14} />
        Back to Hub
      </Link>

      <div className="max-w-4xl relative z-10">
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-moss/50" />
                <h3 className="font-mono text-[10px] tracking-[0.3em] text-moss uppercase">World Overview</h3>
                <div className="h-[1px] w-12 bg-moss/50" />
              </div>

              <h1 className="font-serif text-6xl md:text-8xl font-black mb-8 tracking-tighter text-glow drop-shadow-lg text-white mix-blend-screen leading-none overgrown-text">
                DISCOVER <br className="hidden md:block"/> THE WILDS
              </h1>
            </div>
            <div className="w-full lg:w-1/2 min-h-[300px]">
              <Artifact3D />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none text-gray-400 font-sans leading-relaxed"
        >
          <p className="text-xl md:text-2xl text-gray-300 font-serif mb-8 border-l-2 border-moss/50 pl-6">
            "The concrete empires of the old world have crumbled. Nature has reclaimed her throne, swallowing our greatest achievements beneath a sea of green."
          </p>

          <p className="mb-6">
            The world of <strong>Project: Reclaimed</strong> is one of savage beauty and forgotten history. Hundreds of years have passed since the Collapse. Once-great metropolises are now towering skeletons draped in dense foliage, vines, and moss. The remnants of humanity have splintered into nomadic tribes, outlaws, and resilient settlements fighting for a foothold in the wilderness.
          </p>

          <p className="mb-12">
            This is a land where the rust of ancient machines meets the untamed frontier. It's dangerous, uncharted, and brilliantly alive.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 perspective-1000">
            <motion.div 
              whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-8 border border-white/10 bg-darker/60 backdrop-blur-xl relative overflow-hidden group shadow-2xl glass-panel"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-moss/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out mix-blend-screen pulse-light" />
              <div 
                className="absolute top-0 right-0 w-16 h-16 bg-no-repeat bg-right-top opacity-50 transition-transform duration-700 group-hover:scale-125 group-hover:opacity-100" 
                style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"rgba(74,93,35,1)\"><path d=\"M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A13.89,13.89,0,0,0,20.25,11.05C20.87,10,21.5,8,21.5,8Z\"/><path d=\"M4,6A8.73,8.73,0,0,1,10.13,3.7c1.37-1.12,3.31-2.22,4.86-2-1.63,2-2.73,5.65-4.22,7.31A8.25,8.25,0,0,1,4,13.79c-.7,0-2-1.34-2-2.11C2,10.61,2.83,7.66,4,6Z\"/></svg>')" }}
              />
              <h4 className="font-mono text-xs tracking-widest text-moss uppercase mb-4 relative z-10 drop-shadow-[0_0_10px_rgba(95,122,67,0.8)]">Exploration</h4>
              <p className="text-sm relative z-10 text-gray-400 group-hover:text-white transition-colors duration-500">Traverse stunning overgrown environments. Scale crumbling skyscrapers reclaimed by the jungle, navigate treacherous wildlands, and uncover the truth about the world that came before.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-8 border border-white/10 bg-darker/60 backdrop-blur-xl relative overflow-hidden group shadow-2xl glass-panel"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out mix-blend-screen pulse-light" />
              <div 
                className="absolute top-0 right-0 w-16 h-16 bg-no-repeat bg-right-top opacity-50 -scale-x-100 transition-transform duration-700 group-hover:scale-125 group-hover:opacity-100" 
                style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"rgba(212,175,55,1)\"><path d=\"M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A13.89,13.89,0,0,0,20.25,11.05C20.87,10,21.5,8,21.5,8Z\"/><path d=\"M4,6A8.73,8.73,0,0,1,10.13,3.7c1.37-1.12,3.31-2.22,4.86-2-1.63,2-2.73,5.65-4.22,7.31A8.25,8.25,0,0,1,4,13.79c-.7,0-2-1.34-2-2.11C2,10.61,2.83,7.66,4,6Z\"/></svg>')" }}
              />
              <h4 className="font-mono text-xs tracking-widest text-gold uppercase mb-4 relative z-10 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">Survival</h4>
              <p className="text-sm relative z-10 text-gray-400 group-hover:text-white transition-colors duration-500">Resources are scarce. Hunt for food, craft makeshift weapons from scrap, and outsmart rival scavenger factions that want to take what's yours.</p>
            </motion.div>
          </div>

          {/* Cinematic Image Break */}
          <div className="w-full h-64 md:h-96 bg-cover bg-center border border-white/10 mb-12 relative overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop)' }}>
             <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent w-full" />
             <div className="absolute bottom-4 right-4 font-mono text-[8px] text-white/50 tracking-widest uppercase">Target Image: The Shaded Valley</div>
          </div>

          <h3 className="font-serif text-3xl font-bold text-white mb-6">The Outlaws & The Wild</h3>
          <p className="mb-8">
            You don't ride alone. Along your journey, you will meet frontiersmen, rogue drifters, and exiled visionaries. Uniting these factions is the key to surviving the harsh wilderness. But trust comes at a premium in a world where every bullet counts and the wild spares no one.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
