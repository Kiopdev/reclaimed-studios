import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function AtmosphereSystem() {
  const [motes, setMotes] = useState<Array<{ id: number; left: string; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Generate dust motes
    const generatedMotes = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 20, // 20s to 40s
      delay: Math.random() * -40, // Negative delay to start immediately
    }));
    setMotes(generatedMotes);
  }, []);

  return (
    <>
      {/* Dynamic Cinematic Cinematic Lighting */}
      <div className="ambient-light-pulse bg-moss" style={{ width: '60vw', height: '60vh', top: '-10%', left: '-10%' }} />
      <div className="ambient-light-pulse bg-gold" style={{ width: '40vw', height: '40vh', bottom: '-10%', right: '-5%', animationDelay: '-5s' }} />
      
      {/* Multi-layered Volumetric Fog */}
      <div className="fixed inset-0 pointer-events-none z-[15] overflow-hidden mix-blend-screen opacity-60 transition-opacity duration-1000">
        <div className="fog-layer-1" />
        <div className="fog-layer-2" />
        <div className="fog-layer-3" />
      </div>

      {/* Floating Dust / Ash Particles */}
      <div className="particles-layer">
        {motes.map((mote) => (
          <div
            key={mote.id}
            className="dust-mote"
            style={{
              left: mote.left,
              width: `${mote.size}px`,
              height: `${mote.size}px`,
              animationDuration: `${mote.duration}s`,
              animationDelay: `${mote.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Extreme Cinematic Vignette */}
      <div className="fixed inset-0 pointer-events-none z-[80] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,3,3,0.85)_100%)] mix-blend-multiply" />
      
      {/* Subtle Screen Distortion/Glitch map */}
      <div className="fixed inset-0 pointer-events-none z-[90] opacity-[0.015] mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop')] bg-cover filter blur-[1px]" />
    </>
  );
}
