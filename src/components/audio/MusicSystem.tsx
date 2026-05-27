import { motion, useDragControls } from 'motion/react';
import { Play, Disc3, Volume2, VolumeX, GripVertical } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function MusicSystem() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('lps_volume');
    return saved ? parseFloat(saved) : 0;
  });
  const [audioUrl, setAudioUrl] = useState('/music/ambient.mp3');
  const audioRef = useRef<HTMLAudioElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    fetch('/config/audio.json')
      .then(res => res.json())
      .then(data => {
        if(data.ambientTrack) setAudioUrl(data.ambientTrack);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    localStorage.setItem('lps_volume', volume.toString());
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        if (volume === 0) setVolume(0.3);
        audioRef.current.play().catch(e => console.log("Audio play blocked by browser."));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div 
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      style={{ touchAction: 'none' }}
      className="fixed bottom-6 left-6 z-40 flex flex-col gap-2 group"
    >
      <div className="flex items-center gap-4 glass-panel pl-2 pr-4 py-2 rounded shadow-2xl">
        {/* DRAG HANDLE */}
        <div 
          onPointerDown={(e) => dragControls.start(e)}
          className="cursor-grab active:cursor-grabbing text-white/20 hover:text-gold transition-colors p-2"
        >
          <GripVertical size={16} />
        </div>

        {/* Hidden Audio Element */}
        <audio 
          ref={audioRef} 
          src={audioUrl} 
          loop 
          autoPlay
          onPlay={() => setIsPlaying(true)}
        />

        <button onClick={togglePlay} className="text-gold hover:text-white transition-colors">
          <Disc3 size={18} className={isPlaying ? "animate-spin" : ""} style={{ animationDuration: '3s' }} />
        </button>

        <div className="flex flex-col gap-1 w-24">
          <div className="font-mono text-[8px] tracking-[0.2em] text-white uppercase truncate">
            {isPlaying ? "OST_RECLAIMED_PLAYING" : "OST_RECLAIMED_PAUSED"}
          </div>
          
          {/* Fake Visualizer */}
          <div className="flex items-center gap-[2px] h-3">
            {[...Array(12)].map((_, i) => (
              <motion.div 
                key={i}
                className="w-1 bg-gold/50"
                animate={{ 
                  height: isPlaying ? ['20%', '80%', '30%', '100%', '40%'] : '10%',
                  opacity: isPlaying ? [0.5, 1, 0.5] : 0.3
                }}
                transition={{
                  duration: Math.random() * 0.5 + 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <button onClick={() => setVolume(volume > 0 ? 0 : 0.3)}>
            {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 px-2 pb-2">
        <input 
          type="range" 
          min="0" max="1" step="0.05"
          value={volume}
          onPointerDown={(e) => e.stopPropagation()}
          onChange={(e) => {
            setVolume(parseFloat(e.target.value));
            if (!isPlaying && parseFloat(e.target.value) > 0) {
              setIsPlaying(true);
              audioRef.current?.play();
            }
          }}
          className="w-full accent-gold h-1 appearance-none bg-white/10 rounded cursor-pointer"
        />
      </div>
    </motion.div>
  );
}
