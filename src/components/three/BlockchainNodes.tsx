import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

const Node = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere ref={ref} args={[0.15, 16, 16]} position={position}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.9} />
      </Sphere>
      <Sphere args={[0.25, 16, 16]} position={position}>
        <meshStandardMaterial color={color} transparent opacity={0.1} />
      </Sphere>
    </Float>
  );
};

const Connections = ({ nodes }: { nodes: [number, number, number][] }) => {
  const lines = useMemo(() => {
    const result: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(
          (nodes[i][0] - nodes[j][0]) ** 2 +
          (nodes[i][1] - nodes[j][1]) ** 2 +
          (nodes[i][2] - nodes[j][2]) ** 2
        );
        if (dist < 4) {
          result.push([new THREE.Vector3(...nodes[i]), new THREE.Vector3(...nodes[j])]);
        }
      }
    }
    return result;
  }, [nodes]);

  return (
    <>
      {lines.map((line, i) => (
        <Line key={i} points={line} color="#a855f7" lineWidth={0.5} transparent opacity={0.2} />
      ))}
    </>
  );
};

const Scene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useMemo<[number, number, number][]>(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < 30; i++) {
      pts.push([
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
      ]);
    }
    return pts;
  }, []);

  const colors = ["#a855f7", "#2dd4bf", "#c084fc", "#5eead4", "#8b5cf6"];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Connections nodes={nodes} />
      {nodes.map((pos, i) => (
        <Node key={i} position={pos} color={colors[i % colors.length]} />
      ))}
    </group>
  );
};

const BlockchainNodes = () => {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <fog attach="fog" args={["#0d0a1a", 5, 15]} />
        <Scene />
      </Canvas>
    </div>
  );
};

export default BlockchainNodes;
