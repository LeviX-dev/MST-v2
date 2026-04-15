import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const Token = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref}>
        <torusGeometry args={[1.5, 0.5, 32, 64]} />
        <MeshDistortMaterial
          color="#a855f7"
          emissive="#7c3aed"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.8}
          distort={0.15}
          speed={2}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#2dd4bf"
          emissive="#14b8a6"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
};

const FloatingToken = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#a855f7" />
        <pointLight position={[-5, -5, 5]} intensity={0.4} color="#2dd4bf" />
        <Token />
      </Canvas>
    </div>
  );
};

export default FloatingToken;
