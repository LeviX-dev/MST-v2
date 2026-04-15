import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════
   Layer 1: Deep Space Starfield with Parallax + Gravitational Lensing
   ═══════════════════════════════════════════════════ */
const StarField = ({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) => {
  const layers = useMemo(() => [
    { count: 600, depth: 1, speed: 0.002, size: 0.015 },
    { count: 400, depth: 2, speed: 0.005, size: 0.025 },
    { count: 200, depth: 3, speed: 0.01, size: 0.04 },
  ], []);

  return (
    <>
      {layers.map((layer, li) => (
        <StarLayer key={li} {...layer} mousePos={mousePos} />
      ))}
    </>
  );
};

const StarLayer = ({
  count, depth, speed, size,
  mousePos,
}: {
  count: number; depth: number; speed: number; size: number;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}) => {
  const ref = useRef<THREE.Points>(null);

  // Store original positions for lensing
  const { geo, originals } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 25;
      const z = -Math.random() * 20 - 2;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { geo: g, originals: orig };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.x = Math.sin(t * speed * 10) * 0.1 + mousePos.current.x * depth * 0.3;
    ref.current.position.y = Math.cos(t * speed * 8) * 0.1 + mousePos.current.y * depth * 0.3;

    // Gravitational lensing — displace stars near torus center
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    const lensRadius = 3;
    const maxWarp = 0.02;

    for (let i = 0; i < count; i++) {
      const ox = originals[i * 3];
      const oy = originals[i * 3 + 1];
      const oz = originals[i * 3 + 2];
      const dist = Math.sqrt(ox * ox + oy * oy + oz * oz);

      if (dist < lensRadius && dist > 0.1) {
        const warpStrength = maxWarp * (1 / dist);
        positions[i * 3] = ox + (ox / dist) * warpStrength * (1 + Math.sin(t * 0.5) * 0.3);
        positions[i * 3 + 1] = oy + (oy / dist) * warpStrength * (1 + Math.sin(t * 0.5) * 0.3);
        positions[i * 3 + 2] = oz;
      } else {
        positions[i * 3] = ox;
        positions[i * 3 + 1] = oy;
        positions[i * 3 + 2] = oz;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color="#e2d5f0"
        size={size}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/* ═══════════════════════════════════════════════════
   Layer 2: The Breathing Torus Knot
   ═══════════════════════════════════════════════════ */
const BreathingTorus = ({
  assembled,
  emissiveBoostRef,
}: {
  assembled: boolean;
  emissiveBoostRef: React.MutableRefObject<number>;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const assemblyProgress = useRef(0);
  const currentColorRef = useRef(new THREE.Color("#a855f7"));

  const purple = useMemo(() => new THREE.Color("#a855f7"), []);
  const teal = useMemo(() => new THREE.Color("#2dd4bf"), []);
  const violet = useMemo(() => new THREE.Color("#f0abfc"), []);

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return;
    const t = state.clock.elapsedTime;

    if (assembled && assemblyProgress.current < 1) {
      assemblyProgress.current = Math.min(1, assemblyProgress.current + 0.008);
    }
    const prog = assemblyProgress.current;

    // Breathing: expand/contract on 4s cycle
    const breathe = 1 + Math.sin(t * (Math.PI / 2)) * 0.06 * prog;
    meshRef.current.scale.set(breathe, breathe, breathe);

    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.3 + 0.5;
    meshRef.current.rotation.y = t * 0.12;
    meshRef.current.rotation.z = Math.cos(t * 0.15) * 0.1;

    // Color shift: purple → teal → violet
    const colorT = (Math.sin(t * 0.4) + 1) / 2;
    const colorT2 = (Math.sin(t * 0.4 + 2) + 1) / 2;
    const c = new THREE.Color().copy(purple).lerp(teal, colorT).lerp(violet, colorT2 * 0.3);
    currentColorRef.current.copy(c);

    matRef.current.color.copy(c);
    matRef.current.emissive.copy(c);

    // Base emissive + mining boost spike
    const baseEmissive = 0.5 + Math.sin(t * 3) * 0.15;
    const boost = emissiveBoostRef.current;
    matRef.current.emissiveIntensity = baseEmissive + boost * 2.5;
    // Decay boost
    emissiveBoostRef.current = Math.max(0, boost - 0.02);

    // Wireframe flicker
    matRef.current.opacity = prog * (0.75 + Math.random() * 0.08);
  });

  return (
    <mesh ref={meshRef} visible={assembled}>
      <torusKnotGeometry args={[2.2, 0.35, 200, 32, 2, 3]} />
      <meshStandardMaterial
        ref={matRef}
        color="#a855f7"
        emissive="#a855f7"
        emissiveIntensity={0.6}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0}
        wireframe
      />
    </mesh>
  );
};

/* ═══════════════════════════════════════════════════
   Wormhole Tunnel — concentric rings inside torus
   ═══════════════════════════════════════════════════ */
const WormholeTunnel = ({ assembled }: { assembled: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);

  const rings = useMemo(() => {
    const arr: { z: number; scale: number; opacity: number }[] = [];
    for (let i = 0; i < 20; i++) {
      const t = i / 19;
      arr.push({
        z: -t * 6 - 0.5,
        scale: 1 - t * 0.7,
        opacity: 0.3 * (1 - t * 0.8),
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z = t * 0.15 + i * 0.1;
    });
  });

  if (!assembled) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {rings.map((ring, i) => (
        <mesh key={i} position={[0, 0, ring.z]} scale={ring.scale}>
          <ringGeometry args={[0.6, 0.75, 32]} />
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={ring.opacity}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

/* ═══════════════════════════════════════════════════
   Layer 4: Orbital Satellites — shared positions
   ═══════════════════════════════════════════════════ */
const SATELLITE_CONFIG = [
  { distance: 3.5, speed: 0.6, size: 0.12, color: "#a855f7", tilt: 0.3 },
  { distance: 4.2, speed: -0.4, size: 0.1, color: "#2dd4bf", tilt: -0.5 },
  { distance: 3.0, speed: 0.8, size: 0.08, color: "#f0abfc", tilt: 0.8 },
];

const OrbitalSatellites = ({
  assembled,
  satPositionsRef,
  satFlashRef,
}: {
  assembled: boolean;
  satPositionsRef: React.MutableRefObject<THREE.Vector3[]>;
  satFlashRef: React.MutableRefObject<number[]>;
}) => {
  return (
    <group visible={assembled}>
      {SATELLITE_CONFIG.map((sat, i) => (
        <Satellite
          key={i}
          {...sat}
          index={i}
          satPositionsRef={satPositionsRef}
          flashRef={satFlashRef}
        />
      ))}
    </group>
  );
};

const Satellite = ({
  distance, speed, size, color, tilt, index,
  satPositionsRef, flashRef,
}: {
  distance: number; speed: number; size: number; color: string; tilt: number; index: number;
  satPositionsRef: React.MutableRefObject<THREE.Vector3[]>;
  flashRef: React.MutableRefObject<number[]>;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const baseColor = useMemo(() => new THREE.Color(color), [color]);
  const white = useMemo(() => new THREE.Color("#ffffff"), []);

  useFrame((state) => {
    if (!ref.current || !matRef.current) return;
    const t = state.clock.elapsedTime;
    const angle = t * speed + index * (Math.PI * 2 / 3);

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance * Math.sin(tilt) * 0.5;
    const z = Math.sin(angle) * distance * Math.cos(tilt);

    ref.current.position.set(x, y, z);
    satPositionsRef.current[index].set(x, y, z);

    ref.current.rotation.x = t * 2;
    ref.current.rotation.y = t * 1.5;

    // Flash handling — satellite flashes white on synaptic arrival
    const flash = flashRef.current[index];
    if (flash > 0) {
      matRef.current.color.copy(baseColor).lerp(white, flash);
      matRef.current.emissive.copy(baseColor).lerp(white, flash);
      matRef.current.emissiveIntensity = 1.5 + flash * 4;
      flashRef.current[index] = Math.max(0, flash - 0.06);
    } else {
      matRef.current.color.copy(baseColor);
      matRef.current.emissive.copy(baseColor);
      matRef.current.emissiveIntensity = 1.5;
    }
  });

  return (
    <mesh ref={ref}>
      <tetrahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        ref={matRef}
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

/* ═══════════════════════════════════════════════════
   Block Mining Event — beam between satellites + cube spawn
   ═══════════════════════════════════════════════════ */
const BlockMining = ({
  assembled,
  satPositionsRef,
  emissiveBoostRef,
}: {
  assembled: boolean;
  satPositionsRef: React.MutableRefObject<THREE.Vector3[]>;
  emissiveBoostRef: React.MutableRefObject<number>;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const beamsRef = useRef<{
    line: THREE.Line;
    life: number;
    maxLife: number;
    fromIdx: number;
    toIdx: number;
  }[]>([]);
  const cubesRef = useRef<{
    mesh: THREE.Mesh;
    life: number;
    maxLife: number;
    target: THREE.Vector3;
    flashDone: boolean;
  }[]>([]);
  const lastMine = useRef(0);

  useFrame((state) => {
    if (!assembled || !groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Spawn mining beam every 4 seconds
    if (t - lastMine.current > 4) {
      lastMine.current = t;

      const fromIdx = Math.floor(Math.random() * 3);
      let toIdx = (fromIdx + 1 + Math.floor(Math.random() * 2)) % 3;

      const from = satPositionsRef.current[fromIdx].clone();
      const to = satPositionsRef.current[toIdx].clone();

      const geometry = new THREE.BufferGeometry().setFromPoints([from, to]);
      const material = new THREE.LineBasicMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        linewidth: 2,
      });
      const line = new THREE.Line(geometry, material);
      groupRef.current.add(line);

      beamsRef.current.push({ line, life: 0, maxLife: 0.6, fromIdx, toIdx });
    }

    // Animate beams
    for (let i = beamsRef.current.length - 1; i >= 0; i--) {
      const b = beamsRef.current[i];
      b.life += 0.016;
      const progress = b.life / b.maxLife;

      // Update beam positions to track moving satellites
      const from = satPositionsRef.current[b.fromIdx];
      const to = satPositionsRef.current[b.toIdx];
      b.line.geometry.dispose();
      b.line.geometry = new THREE.BufferGeometry().setFromPoints([from.clone(), to.clone()]);

      (b.line.material as THREE.LineBasicMaterial).opacity = progress < 0.5
        ? 0.9
        : 0.9 * (1 - (progress - 0.5) * 2);

      if (progress >= 1) {
        groupRef.current.remove(b.line);
        b.line.geometry.dispose();
        (b.line.material as THREE.LineBasicMaterial).dispose();
        beamsRef.current.splice(i, 1);

        // Spawn mined block cube at center
        const cubeMat = new THREE.MeshStandardMaterial({
          color: "#2dd4bf",
          emissive: "#2dd4bf",
          emissiveIntensity: 3,
          transparent: true,
          opacity: 1,
        });
        const cubeGeo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
        const cube = new THREE.Mesh(cubeGeo, cubeMat);
        cube.position.set(0, 0, 0);
        groupRef.current.add(cube);

        // Pick a point on the torus surface to float toward
        const angle = Math.random() * Math.PI * 2;
        const target = new THREE.Vector3(
          Math.cos(angle) * 2.2,
          Math.sin(angle) * 0.5,
          Math.sin(angle) * 2.2
        );

        cubesRef.current.push({ mesh: cube, life: 0, maxLife: 1.2, target, flashDone: false });

        // Trigger torus emissive boost
        emissiveBoostRef.current = 1;
      }
    }

    // Animate mined cubes
    for (let i = cubesRef.current.length - 1; i >= 0; i--) {
      const c = cubesRef.current[i];
      c.life += 0.016;
      const progress = c.life / c.maxLife;

      // Float toward torus
      c.mesh.position.lerpVectors(
        new THREE.Vector3(0, 0, 0),
        c.target,
        progress
      );

      // Shrink
      const scale = Math.max(0.01, 1 - progress);
      c.mesh.scale.set(scale, scale, scale);

      // Rotate
      c.mesh.rotation.x = t * 4;
      c.mesh.rotation.y = t * 3;

      // Pulse flash at end
      const mat = c.mesh.material as THREE.MeshStandardMaterial;
      if (progress > 0.8 && !c.flashDone) {
        mat.emissiveIntensity = 6;
        c.flashDone = true;
      }
      mat.opacity = progress > 0.7 ? 1 - ((progress - 0.7) / 0.3) : 1;

      if (progress >= 1) {
        groupRef.current.remove(c.mesh);
        c.mesh.geometry.dispose();
        (c.mesh.material as THREE.MeshStandardMaterial).dispose();
        cubesRef.current.splice(i, 1);
      }
    }
  });

  return <group ref={groupRef} />;
};

/* ═══════════════════════════════════════════════════
   Synaptic Data Streams — arcing paths between satellites
   ═══════════════════════════════════════════════════ */
const SynapticStreams = ({
  assembled,
  satPositionsRef,
  satFlashRef,
}: {
  assembled: boolean;
  satPositionsRef: React.MutableRefObject<THREE.Vector3[]>;
  satFlashRef: React.MutableRefObject<number[]>;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const dotsRef = useRef<{
    mesh: THREE.Mesh;
    fromIdx: number;
    toIdx: number;
    life: number;
    maxLife: number;
    curve: THREE.CatmullRomCurve3;
  }[]>([]);
  const lastSpawn = useRef(0);

  useFrame((state) => {
    if (!assembled || !groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Spawn a synaptic pulse every 2 seconds
    if (t - lastSpawn.current > 2) {
      lastSpawn.current = t;

      const fromIdx = Math.floor(Math.random() * 3);
      let toIdx = (fromIdx + 1 + Math.floor(Math.random() * 2)) % 3;

      const from = satPositionsRef.current[fromIdx].clone();
      const to = satPositionsRef.current[toIdx].clone();

      // Arc midpoint — lifted above the line between them
      const mid = from.clone().lerp(to, 0.5);
      const lift = new THREE.Vector3(0, 1.5 + Math.random(), 0);
      mid.add(lift);

      const curve = new THREE.CatmullRomCurve3([from, mid, to]);

      // Render the arc path
      const linePoints = curve.getPoints(40);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: "#a855f7",
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      line.userData.disposable = true;
      groupRef.current.add(line);

      // Traveling dot
      const dotGeo = new THREE.SphereGeometry(0.05, 8, 8);
      const dotMat = new THREE.MeshStandardMaterial({
        color: "#ffffff",
        emissive: "#ffffff",
        emissiveIntensity: 4,
        transparent: true,
        opacity: 1,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      groupRef.current.add(dot);

      dotsRef.current.push({
        mesh: dot, fromIdx, toIdx,
        life: 0, maxLife: 1.0,
        curve,
      });

      // Clean up arc line after a delay
      setTimeout(() => {
        if (groupRef.current) {
          groupRef.current.remove(line);
          lineGeo.dispose();
          lineMat.dispose();
        }
      }, 1200);
    }

    // Animate traveling dots
    for (let i = dotsRef.current.length - 1; i >= 0; i--) {
      const d = dotsRef.current[i];
      d.life += 0.016;
      const progress = Math.min(d.life / d.maxLife, 1);

      // Update curve endpoints to track satellites
      const from = satPositionsRef.current[d.fromIdx].clone();
      const to = satPositionsRef.current[d.toIdx].clone();
      const mid = from.clone().lerp(to, 0.5).add(new THREE.Vector3(0, 1.5, 0));
      d.curve.points[0].copy(from);
      d.curve.points[1].copy(mid);
      d.curve.points[2].copy(to);

      const pos = d.curve.getPoint(progress);
      d.mesh.position.copy(pos);

      if (progress >= 1) {
        // Flash destination satellite
        satFlashRef.current[d.toIdx] = 1;

        groupRef.current.remove(d.mesh);
        d.mesh.geometry.dispose();
        (d.mesh.material as THREE.MeshStandardMaterial).dispose();
        dotsRef.current.splice(i, 1);
      }
    }
  });

  return <group ref={groupRef} />;
};

/* ═══════════════════════════════════════════════════
   Radial Shockwave — expanding ring heartbeat
   ═══════════════════════════════════════════════════ */
const RadialShockwave = ({ assembled }: { assembled: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const wavesRef = useRef<{
    mesh: THREE.Mesh;
    life: number;
  }[]>([]);
  const lastPulse = useRef(0);

  useFrame((state) => {
    if (!assembled || !groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Spawn shockwave every 4 seconds
    if (t - lastPulse.current > 4) {
      lastPulse.current = t;

      // Color matches current torus color cycle
      const colorT = (Math.sin(t * 0.4) + 1) / 2;
      const purple = new THREE.Color("#a855f7");
      const teal = new THREE.Color("#2dd4bf");
      const c = purple.clone().lerp(teal, colorT);

      const geo = new THREE.RingGeometry(0.1, 0.2, 64);
      const mat = new THREE.MeshBasicMaterial({
        color: c,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      groupRef.current.add(mesh);

      wavesRef.current.push({ mesh, life: 0 });
    }

    // Animate shockwaves
    for (let i = wavesRef.current.length - 1; i >= 0; i--) {
      const w = wavesRef.current[i];
      w.life += 0.016;
      const progress = w.life / 1.2; // 1.2 seconds duration

      const scale = progress * 8;
      w.mesh.scale.set(scale, scale, scale);
      (w.mesh.material as THREE.MeshBasicMaterial).opacity = 0.6 * (1 - progress);

      if (progress >= 1) {
        groupRef.current.remove(w.mesh);
        w.mesh.geometry.dispose();
        (w.mesh.material as THREE.MeshBasicMaterial).dispose();
        wavesRef.current.splice(i, 1);
      }
    }
  });

  return <group ref={groupRef} />;
};

/* ═══════════════════════════════════════════════════
   Entry: Particle Explosion → Assembly
   ═══════════════════════════════════════════════════ */
const EntryParticle = ({ onExplode }: { onExplode: () => void }) => {
  const ref = useRef<THREE.Mesh>(null);
  const [phase, setPhase] = useState<"falling" | "exploding" | "done">("falling");
  const startTime = useRef<number | null>(null);
  const explodeParticlesRef = useRef<THREE.Points>(null);

  const explodeGeo = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const sp = 2 + Math.random() * 4;
      vel[i * 3] = Math.sin(phi) * Math.cos(theta) * sp;
      vel[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * sp;
      vel[i * 3 + 2] = Math.cos(phi) * sp;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.userData.velocities = vel;
    return g;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (startTime.current === null) startTime.current = t;
    const elapsed = t - startTime.current;

    if (phase === "falling" && ref.current) {
      const progress = Math.min(elapsed / 1.2, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      ref.current.position.y = 8 - eased * 8;
      ref.current.scale.setScalar(0.08 + eased * 0.04);

      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1 + eased * 3;

      if (progress >= 1) {
        setPhase("exploding");
        onExplode();
        startTime.current = t;
      }
    }

    if (phase === "exploding" && explodeParticlesRef.current) {
      const ep = Math.min((t - (startTime.current || 0)) / 0.8, 1);
      const positions = explodeParticlesRef.current.geometry.attributes.position.array as Float32Array;
      const velocities = explodeParticlesRef.current.geometry.userData.velocities as Float32Array;

      for (let i = 0; i < 300; i++) {
        positions[i * 3] = velocities[i * 3] * ep;
        positions[i * 3 + 1] = velocities[i * 3 + 1] * ep;
        positions[i * 3 + 2] = velocities[i * 3 + 2] * ep;
      }
      explodeParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      (explodeParticlesRef.current.material as THREE.PointsMaterial).opacity = 1 - ep;

      if (ep >= 1) setPhase("done");
    }
  });

  if (phase === "done") return null;

  return (
    <>
      {phase === "falling" && (
        <mesh ref={ref} position={[0, 8, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={2}
            transparent
            opacity={0.9}
          />
        </mesh>
      )}
      {phase === "exploding" && (
        <points ref={explodeParticlesRef} geometry={explodeGeo}>
          <pointsMaterial
            color="#a855f7"
            size={0.06}
            transparent
            opacity={1}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      )}
    </>
  );
};

/* ═══════════════════════════════════════════════════
   Layer 5: Mouse-reactive scene wrapper
   ═══════════════════════════════════════════════════ */
const ReactiveScene = ({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [assembled, setAssembled] = useState(false);

  // Shared state between satellites and other systems
  const satPositionsRef = useRef<THREE.Vector3[]>([
    new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(),
  ]);
  const satFlashRef = useRef<number[]>([0, 0, 0]);
  const emissiveBoostRef = useRef(0);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetRotY = mousePos.current.x * 0.087;
    const targetRotX = -mousePos.current.y * 0.087;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
  });

  const handleExplode = useCallback(() => {
    setTimeout(() => setAssembled(true), 200);
  }, []);

  return (
    <group ref={groupRef}>
      <StarField mousePos={mousePos} />
      <EntryParticle onExplode={handleExplode} />
      <BreathingTorus assembled={assembled} emissiveBoostRef={emissiveBoostRef} />
      <WormholeTunnel assembled={assembled} />
      <OrbitalSatellites
        assembled={assembled}
        satPositionsRef={satPositionsRef}
        satFlashRef={satFlashRef}
      />
      <BlockMining
        assembled={assembled}
        satPositionsRef={satPositionsRef}
        emissiveBoostRef={emissiveBoostRef}
      />
      <SynapticStreams
        assembled={assembled}
        satPositionsRef={satPositionsRef}
        satFlashRef={satFlashRef}
      />
      <RadialShockwave assembled={assembled} />
    </group>
  );
};

/* ═══════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════ */
const TorusEnergyRing = () => {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={["#0d0a1a"]} />
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#a855f7" />
        <pointLight position={[-5, -3, 3]} intensity={0.5} color="#2dd4bf" />
        <pointLight position={[0, 3, 4]} intensity={0.3} color="#f0abfc" />
        <fog attach="fog" args={["#0d0a1a", 8, 25]} />
        <ReactiveScene mousePos={mousePos} />
      </Canvas>
    </div>
  );
};

export default TorusEnergyRing;
