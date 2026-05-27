import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { motion } from 'motion/react';

function AtmosphericDust() {
  const ref = useRef<THREE.Points>(null);
  const sphere = useMemo(() => {
    const coords = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const r = 20 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      coords[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      coords[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      coords[i * 3 + 2] = r * Math.cos(phi);
    }
    return coords;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 50;
      ref.current.rotation.y -= delta / 75;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#d4af37"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

function GlobalIllumination() {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 5;
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.2) * 5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight ref={lightRef} color="#fca311" intensity={2} distance={30} decay={2} position={[0, 5, 0]} />
      <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" castShadow />
    </>
  );
}

export function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-darker overflow-hidden">
      {/* Background Image Behind 3D Elements */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542451313056-b7c8e626645f?q=80&w=2000&auto=format&fit=crop')" }}
      />
      
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} className="absolute inset-0 mix-blend-screen">
        <GlobalIllumination />
        <AtmosphericDust />
        <Sparkles count={200} scale={15} size={2} speed={0.4} opacity={0.2} color="#ffffff" />
        <Environment preset="city" />
        
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
          <Noise opacity={0.035} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
      
      {/* CSS overlay for cinematic color grading and lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-darker/60 via-darker/30 to-darker/90 mix-blend-multiply" />
      <div className="absolute top-0 left-1/4 w-[50vw] h-[50vh] bg-gold/10 blur-[150px] rounded-full mt-[-20vh] mix-blend-screen" />
    </div>
  );
}
