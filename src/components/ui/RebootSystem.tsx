import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Power, Radio } from 'lucide-react';

type RebootStage = 'idle' | 'init' | 'charging' | 'critical' | 'collapse' | 'rebirth';

export function RebootSystem() {
  const [stage, setStage] = useState<RebootStage>('idle');

  const triggerReboot = useCallback(() => {
    if (stage !== 'idle') return;

    // Web Audio Synthesizer
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new Ctx();

      // BASS DROP / BUILDUP
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(30, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 5);
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(50, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(15000, ctx.currentTime + 5);
      filter.Q.value = 15;
      
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.6, ctx.currentTime + 4.9);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 5.0);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 5.1);

      // SIREN / ALARM
      const alarm = ctx.createOscillator();
      const alarmGain = ctx.createGain();
      alarm.type = 'square';
      alarm.frequency.setValueAtTime(400, ctx.currentTime);
      
      // Make it oscillate
      for(let i=0; i<20; i++) {
        alarm.frequency.setValueAtTime(400, ctx.currentTime + i*0.25);
        alarm.frequency.linearRampToValueAtTime(600, ctx.currentTime + i*0.25 + 0.125);
        alarm.frequency.setValueAtTime(600, ctx.currentTime + i*0.25 + 0.125);
        alarm.frequency.linearRampToValueAtTime(400, ctx.currentTime + i*0.25 + 0.25);
      }

      alarmGain.gain.setValueAtTime(0.001, ctx.currentTime);
      alarmGain.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 2);
      alarmGain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 4.9);
      alarmGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 5.0);

      alarm.connect(alarmGain);
      alarmGain.connect(ctx.destination);
      alarm.start(ctx.currentTime);
      alarm.stop(ctx.currentTime + 5.1);

      // EXPLOSION / COLLAPSE
      const noiseBuff = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
      const output = noiseBuff.getChannelData(0);
      for (let i = 0; i < ctx.sampleRate * 4; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noiseOsc = ctx.createBufferSource();
      noiseOsc.buffer = noiseBuff;
      
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(2000, ctx.currentTime + 5);
      noiseFilter.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 8);
      noiseFilter.Q.value = 5;
      
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, ctx.currentTime + 4.9);
      noiseGain.gain.exponentialRampToValueAtTime(1, ctx.currentTime + 5.01);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 8.5);
      
      noiseOsc.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseOsc.start(ctx.currentTime + 5);

    } catch (e) {
      console.warn("AudioContext not supported or blocked", e);
    }

    // Sequence States
    setStage('init');
    document.body.classList.add('rebooting-init');

    setTimeout(() => {
      setStage('charging');
      document.body.classList.remove('rebooting-init');
      document.body.classList.add('rebooting-charging');
    }, 2000);

    setTimeout(() => {
      setStage('critical');
      document.body.classList.remove('rebooting-charging');
      document.body.classList.add('rebooting-critical');
    }, 4000);

    setTimeout(() => {
      setStage('collapse');
      document.body.classList.remove('rebooting-critical');
      document.body.classList.add('rebooting-collapse');
    }, 5000);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      setStage('rebirth');
      document.body.classList.remove('rebooting-collapse');
      document.body.classList.add('rebooting-rebirth');
    }, 6000);

    setTimeout(() => {
      setStage('idle');
      document.body.classList.remove('rebooting-rebirth');
    }, 10000);
  }, [stage]);

  // Clean up classes if unmounted
  useEffect(() => {
    return () => {
      document.body.classList.remove(
        'rebooting-init', 'rebooting-charging', 'rebooting-critical', 'rebooting-collapse', 'rebooting-rebirth'
      );
    }
  }, []);

  return (
    <>
      <div className="w-full flex justify-center py-24 relative z-50">
        <motion.button
          whileHover={{ scale: 1.05, textShadow: "0px 0px 8px rgb(212 175 55)" }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerReboot}
          disabled={stage !== 'idle'}
          className={`
            relative overflow-hidden group border border-white/10 px-12 py-6 
            bg-darker/80 backdrop-blur-md flex items-center justify-center gap-4
            transition-all duration-700 hover:border-gold/50 cursor-pointer
            ${stage !== 'idle' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
        >
          <div className="absolute inset-0 bg-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <Power className="w-6 h-6 text-gold relative z-10 group-hover:animate-pulse" />
          <span className="font-mono text-sm tracking-[0.4em] text-white/80 group-hover:text-white uppercase relative z-10 font-bold transition-colors">
            Reinitialize System
          </span>
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/50" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/50" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/50" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/50" />
        </motion.button>
      </div>

      {/* Cinematic Overlays based on state */}
      <AnimatePresence>
        {(stage === 'init' || stage === 'charging' || stage === 'critical') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="fixed inset-0 z-[9999] pointer-events-none flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Cinematic Letterboxing bars */}
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: "12vh" }}
              transition={{ duration: 0.8, ease: "anticipate" }}
              className="absolute top-0 left-0 w-full bg-black z-50"
            />
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: "12vh" }}
              transition={{ duration: 0.8, ease: "anticipate" }}
              className="absolute bottom-0 left-0 w-full bg-black z-50"
            />

            {/* Impact Lines / Speed Lines converging */}
            {(stage === 'charging' || stage === 'critical') && (
              <div className="absolute inset-0 anime-speed-lines mix-blend-screen opacity-50" />
            )}

            {/* Expanding central glowing energy orb */}
            {(stage === 'charging' || stage === 'critical') && (
               <motion.div 
                 initial={{ scale: 0, opacity: 0 }}
                 animate={{ scale: stage === 'critical' ? 5 : 2, opacity: stage === 'critical' ? 1 : 0.6 }}
                 transition={{ duration: stage === 'critical' ? 0.8 : 2, ease: "easeIn" }}
                 className="absolute inset-0 m-auto w-64 h-64 bg-gold/50 rounded-full blur-[60px] mix-blend-screen"
               />
            )}
            
            {(stage === 'critical') && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: [1, 2, 4, 10], opacity: [0.8, 1, 0.8, 0] }}
                transition={{ duration: 1, times: [0, 0.5, 0.8, 1], ease: "easeOut" }}
                className="absolute inset-0 m-auto w-32 h-32 bg-white rounded-full blur-[20px] mix-blend-screen"
              />
            )}

            {/* Inverted impact frames during critical */}
            {stage === 'critical' && (
              <div className="absolute inset-0 anime-impact-frames z-40 pointer-events-none mix-blend-difference" />
            )}

            {/* Anime-style text flashes */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-40">
              <AnimatePresence mode="wait">
                {stage === 'init' && (
                  <motion.div 
                    key="init-text"
                    initial={{ scale: 1.5, opacity: 0, letterSpacing: "1em" }}
                    animate={{ scale: 1, opacity: 1, letterSpacing: "0.2em" }}
                    exit={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="font-serif text-5xl md:text-7xl font-black text-white mix-blend-overlay uppercase text-center"
                  >
                    System Override
                  </motion.div>
                )}
                {stage === 'charging' && (
                  <motion.div 
                    key="charging-text"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: [0, 1, 0.5, 1] }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 2 }}
                    className="font-mono text-4xl md:text-6xl text-gold font-bold uppercase text-center text-shadow-glow"
                  >
                    WARNING
                    <div className="text-sm tracking-widest mt-4 animate-pulse">Energy Core Unstable</div>
                  </motion.div>
                )}
                {stage === 'critical' && (
                  <motion.div 
                    key="critical-text"
                    initial={{ scale: 2, opacity: 0, rotate: -5 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.1 }}
                    className="font-serif text-6xl md:text-8xl font-black text-red-500 uppercase text-center drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]"
                  >
                    P U R G E
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Energy gathering particles simulation */}
            <div className={`absolute inset-0 overflow-hidden mix-blend-screen animate-[spin_10s_linear_infinite] ${stage === 'critical' ? 'scale-50' : 'scale-150'} transition-transform duration-[2s]`}>
                 {/* CSS driven particle streaks inside index.css */}
                 <div className="energy-streak" style={{ transform: 'rotate(0deg)' }} />
                 <div className="energy-streak" style={{ transform: 'rotate(45deg)' }} />
                 <div className="energy-streak" style={{ transform: 'rotate(90deg)' }} />
                 <div className="energy-streak" style={{ transform: 'rotate(135deg)' }} />
                 <div className="energy-streak" style={{ transform: 'rotate(22.5deg)' }} />
                 <div className="energy-streak" style={{ transform: 'rotate(67.5deg)' }} />
            </div>

            {stage === 'critical' && (
               <div className="absolute inset-0 backdrop-blur-[4px] bg-red-900/20 mix-blend-color-burn" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
