import { OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useControls, Leva, folder } from "leva";

// Rotating cylinder component with props
const RotatingCylinder = ({ radiusTop, radiusBottom, height, color, emissive }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[radiusTop, radiusBottom, height]} />
      <meshLambertMaterial color={color} emissive={emissive} />
      <Sparkles count={10} size={6} scale={1} speed={0.03} noise={0.2} color ="orange" />
    </mesh>
  );
};

// Main app with Leva controls
const App = () => {
  const {
    radiusTop,
    radiusBottom,
    height,
    color,
    emissive,
    lightColor,
    intensity
  } = useControls({
    Geometry: folder({
      radiusTop: { value: 1, min: 0.1, max: 5 },
      radiusBottom: { value: 1, min: 0.1, max: 5 },
      height: { value: 1, min: 0.1, max: 5 }
    }),
    Material: folder({
      color: '#468585',
      emissive: '#468585'
    }),
    'Light Settings': folder({
      lightColor: '#9CDBA6',
      intensity: { value: 1, min: 0, max: 10 }
    })
  });

  return (
    <>
      <Canvas style={{ height: "100vh", width: "100vw" }}>
        <OrbitControls enableZoom enablePan enableRotate />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[1, 1, 1]}
          intensity={intensity}
          color={lightColor}
        />
        <color attach="background" args={["#F0F0F0"]} />
        <RotatingCylinder
          radiusTop={radiusTop}
          radiusBottom={radiusBottom}
          height={height}
          color={color}
          emissive={emissive}
        />
      </Canvas>
      <Leva collapsed={false} />
    </>
  );
};

export default App;
