import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

function Monolith() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;

      // Glow effect on hover
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <octahedronGeometry args={[1.5, 0]} />
        <MeshDistortMaterial
          color={hovered ? "#d4af37" : "#0d0d0d"}
          emissive={hovered ? "#d4af37" : "#000000"}
          emissiveIntensity={hovered ? 0.8 : 0}
          roughness={0.1}
          metalness={0.9}
          distort={hovered ? 0.3 : 0.1}
          speed={hovered ? 5 : 1}
          wireframe={hovered}
        />
      </mesh>
    </Float>
  );
}

export function Artifact3D() {
  return (
    <div className="w-full h-full min-h-[400px] relative mt-12 mb-12">
      <div className="absolute inset-0 bg-gold/5 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <PresentationControls
          global
          rotation={[0.13, 0.1, 0]}
          polar={[-0.4, 0.2]}
          azimuth={[-1, 0.75]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          <Monolith />
        </PresentationControls>
      </Canvas>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.3em] text-gray-500 pointer-events-none text-center">
        Artifact // 001 <br />
        <span className="text-gold/50">Drag to observe</span>
      </div>
    </div>
  );
}
