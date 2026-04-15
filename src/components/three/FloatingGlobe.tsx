import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Float } from "@react-three/drei";
import * as THREE from "three";

const Globe = () => {
  const ref = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    if (wireRef.current) wireRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group>
        <Sphere ref={ref} args={[2, 64, 64]}>
          <meshStandardMaterial
            color="#1a0a2e"
            transparent
            opacity={0.6}
            roughness={0.3}
            metalness={0.8}
          />
        </Sphere>
        <Sphere ref={wireRef} args={[2.02, 32, 32]}>
          <meshStandardMaterial
            color="#a855f7"
            wireframe
            transparent
            opacity={0.15}
          />
        </Sphere>
        {/* India highlight - approximate position */}
        <mesh position={[0.8, 0.7, 1.6]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={2} />
        </mesh>
        {/* Network lines */}
        {[
          [0.8, 0.7, 1.6, -1.5, 0.5, 1.2],
          [0.8, 0.7, 1.6, 0.3, -1.2, 1.5],
          [0.8, 0.7, 1.6, 1.8, -0.3, 0.8],
        ].map((coords, i) => (
          <mesh key={i} position={[coords[3] as number, coords[4] as number, coords[5] as number]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1.5} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

const FloatingGlobe = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#a855f7" />
        <pointLight position={[-3, -3, 5]} intensity={0.3} color="#2dd4bf" />
        <fog attach="fog" args={["#0d0a1a", 4, 12]} />
        <Globe />
      </Canvas>
    </div>
  );
};

export default FloatingGlobe;
