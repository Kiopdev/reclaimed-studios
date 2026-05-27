import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MediaConfig {
  mainTrailer: string;
  transmissionTrailer: string;
}

export function MediaShowcase() {
  const [config, setConfig] = useState<MediaConfig | null>(null);

  useEffect(() => {
    fetch('/config/media.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(console.error);
  }, []);

  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : '';
  };

  const videoId = config ? getYoutubeId(config.mainTrailer) : 'Skstk2ErxDU';

  return (
    <section id="media" className="relative py-24 z-10 bg-black">
      {/* Background glow coming from the video */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gold/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-8 lg:px-24">
        {/* Teaser Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-moss/30 text-moss font-mono text-[10px] tracking-[0.2em] uppercase rounded-full mb-6 bg-moss/5">
            <AlertCircle size={10} />
            Transmission Encrypted
          </div>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-white mb-4">
            TEASER
          </h2>
          <p className="font-mono text-gray-500 text-xs tracking-widest uppercase">
            First Look
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative w-full max-w-5xl mx-auto aspect-video border border-white/10 p-2 bg-white/5 glass-panel mb-32"
        >
          {/* Decorative Corner Brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-moss/50 -translate-x-[1px] -translate-y-[1px]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-moss/50 translate-x-[1px] -translate-y-[1px]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-moss/50 -translate-x-[1px] translate-y-[1px]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-moss/50 translate-x-[1px] translate-y-[1px]" />
          
          {videoId ? (
            <iframe 
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0&modestbranding=1&vq=hd1080`}
              title="Cinematic Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center opacity-50">
              <span className="w-12 h-12 rounded-full border border-moss/30 flex items-center justify-center mb-4 text-moss">
                <AlertCircle size={20} />
              </span>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-moss">
                Video Feed Offline
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
