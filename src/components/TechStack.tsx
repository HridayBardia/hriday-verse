import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

const techList = [
  { name: "React", img: "/images/react2.webp", color: "#61dafb" },
  { name: "Next.js", img: "/images/next2.webp", color: "#ffffff" },
  { name: "TypeScript", img: "/images/typescript.webp", color: "#3178c6" },
  { name: "Node.js", img: "/images/node2.webp", color: "#68a063" },
  { name: "Express", img: "/images/express.webp", color: "#ffffff" },
  { name: "MongoDB", img: "/images/mongo.webp", color: "#47a248" },
  { name: "MySQL", img: "/images/mysql.webp", color: "#00758f" },
  { name: "JavaScript", img: "/images/javascript.webp", color: "#f7df1e" },
];

const textureLoader = new THREE.TextureLoader();
const sphereGeometry = new THREE.SphereGeometry(1, 24, 24);

interface SphereData {
  pos: [number, number, number];
  basePos: THREE.Vector3;
  velocity: THREE.Vector3;
  scale: number;
  textureIndex: number;
  phase: number;
  speed: number;
}

function InteractiveSphere({
  data,
  textures,
  mousePos,
  isHovered,
}: {
  data: SphereData;
  textures: THREE.Texture[];
  mousePos: React.MutableRefObject<THREE.Vector3>;
  isHovered: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentPos = useRef(new THREE.Vector3(...data.pos));

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const clampedDelta = Math.min(delta, 0.05);

    // Natural floating motion
    const floatY = Math.sin(time * data.speed + data.phase) * 0.8;
    const floatX = Math.cos(time * data.speed * 0.7 + data.phase) * 0.6;
    const floatZ = Math.sin(time * data.speed * 0.5 + data.phase) * 0.5;

    const target = data.basePos.clone().add(new THREE.Vector3(floatX, floatY, floatZ));

    // Interactive mouse repulsion
    if (isHovered) {
      const distToMouse = target.distanceTo(mousePos.current);
      if (distToMouse < 6) {
        const repulsion = target
          .clone()
          .sub(mousePos.current)
          .normalize()
          .multiplyScalar((6 - distToMouse) * 1.8);
        target.add(repulsion);
      }
    }

    // Smooth lerp to target
    currentPos.current.lerp(target, 4 * clampedDelta);
    meshRef.current.position.copy(currentPos.current);

    // Gentle rotation
    meshRef.current.rotation.y += 0.4 * clampedDelta;
    meshRef.current.rotation.x += 0.2 * clampedDelta;
  });

  const texture = textures[data.textureIndex % textures.length];

  return (
    <mesh
      ref={meshRef}
      scale={data.scale}
      geometry={sphereGeometry}
      castShadow={false}
      receiveShadow={false}
    >
      <meshStandardMaterial
        map={texture}
        roughness={0.3}
        metalness={0.2}
        emissive="#1a102f"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function SphereScene({ isActive }: { isActive: boolean }) {
  const { viewport } = useThree();
  const mousePos = useRef(new THREE.Vector3(0, 0, 0));
  const [isHovered, setIsHovered] = useState(false);

  const textures = useMemo(() => {
    return techList.map((t) => textureLoader.load(t.img));
  }, []);

  // Generate 16 balanced floating spheres
  const spheres = useMemo<SphereData[]>(() => {
    const list: SphereData[] = [];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 4 + (i % 3) * 2.5;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
      const y = Math.sin(angle) * (radius * 0.6) + (Math.random() - 0.5) * 2;
      const z = (Math.random() - 0.5) * 6;
      const scale = 0.85 + (i % 4) * 0.15;

      list.push({
        pos: [x, y, z],
        basePos: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(0, 0, 0),
        scale,
        textureIndex: i % techList.length,
        phase: Math.random() * Math.PI * 2,
        speed: 0.8 + Math.random() * 0.6,
      });
    }
    return list;
  }, []);

  const handlePointerMove = (e: any) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mousePos.current.set(
      (x * viewport.width) / 2,
      (y * viewport.height) / 2,
      0
    );
    setIsHovered(true);
  };

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [viewport]);

  if (!isActive) return null;

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#c2a4ff" />

      {spheres.map((s, idx) => (
        <InteractiveSphere
          key={idx}
          data={s}
          textures={textures}
          mousePos={mousePos}
          isHovered={isHovered}
        />
      ))}
    </>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const target = document.querySelector(".techstack");
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsActive(entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <Canvas
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          depth: true,
        }}
        camera={{ position: [0, 0, 18], fov: 35, near: 0.1, far: 50 }}
        className="tech-canvas"
      >
        <SphereScene isActive={isActive} />
      </Canvas>
    </div>
  );
};

export default TechStack;
