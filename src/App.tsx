import "./styles.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Lights from "./components/Lights";
import { RaymarchedScene } from "./Raymarching/RaymarchedScene";
import { RegularScene } from "./RegularScene";
import { UI } from "./UI";

export default function App() {
  return (
    <>
      <Canvas shadows>
        <OrbitControls makeDefault />
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />

        <Lights />

        <RaymarchedScene />
        <RegularScene />
      </Canvas>
      <UI />
    </>
  );
}
