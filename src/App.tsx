import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Lights from "./components/Lights";
import { RaymarchedScene } from "./Raymarching/RaymarchedScene";
import "./styles.css";

export default function App() {
  return (
    <>
      <Canvas shadows>
        <OrbitControls makeDefault autoRotate />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />

        <Lights />

        <RaymarchedScene />
      </Canvas>
    </>
  );
}
