import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { LostPunkLogo } from '../components/ui/LostPunkLogo';
import { Link } from 'react-router-dom';

export function ProjectShowcase() {
  return (
    <section id="project" className="relative py-24 z-10 border-t border-white/5 bg-darker/50 backdrop-blur-sm">
      <div className="container mx-auto px-8 lg:px-24 flex justify-end">
        <div className="w-full lg:w-[60%] flex flex-col items-center lg:items-end">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center lg:items-end text-center lg:text-right w-full"
          >
            <div className="flex flex-col items-center lg:items-end w-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-moss/50 lg:hidden" />
                <h3 className="font-mono text-[10px] tracking-[0.3em] text-moss uppercase">Our Current Project</h3>
                <div className="h-[1px] w-12 bg-moss/50" />
              </div>

              <LostPunkLogo className="mb-12 origin-right scale-75 md:scale-90 lg:scale-[0.85] mr-0 lg:mr-[-1rem] xl:mr-[-2rem]" />
            </div>

            <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed max-w-md mb-4 mt-8">
              A story of identity, friendship, and survival. <br/>
              A world rich in mystery, danger, and discovery.
            </p>

            <div className="flex gap-4 mt-8">
              <Link to="/discover" className="px-6 py-3 border border-white/20 hover:border-moss transition-colors font-mono text-[10px] uppercase tracking-widest flex items-center gap-3 group glass-panel overgrown-button w-max relative z-50 cursor-pointer">
                <span className="pointer-events-none">Uncover the Truth</span>
                <span className="group-hover:translate-x-1 transition-transform text-moss pointer-events-none">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
