import { Environment, Float, Lightformer, Sky } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Lights() {
  const positions = [2, 0, 2, 0, 2, 0, 2, 0];

  const group = useRef();
  useFrame(
    (state, delta) =>
      (group.current.position.z += delta * 10) > 20 &&
      (group.current.position.z = -60)
  );

  return (
    <>
      <Environment
        frames={Infinity}
        background
        backgroundBlurriness={1}
        backgroundIntensity={0.1}
      >
        <Lightformer
          intensity={0.75}
          rotation-x={Math.PI / 2}
          position={[0, 5, -9]}
          scale={[10, 10, 1]}
        />
        <group rotation={[0, 0.5, 0]}>
          <group ref={group}>
            {positions.map((x, i) => (
              <Lightformer
                key={i}
                form="circle"
                intensity={2}
                rotation={[Math.PI / 2, 0, 0]}
                position={[x, 4, i * 4]}
                scale={[3, 1, 1]}
              />
            ))}
          </group>
        </group>
        {/* Sides */}
        <Lightformer
          intensity={4}
          rotation-y={Math.PI / 2}
          position={[-5, 1, -1]}
          scale={[20, 0.1, 1]}
        />
        <Lightformer
          rotation-y={Math.PI / 2}
          position={[-5, -1, -1]}
          scale={[20, 0.5, 1]}
        />
        <Lightformer
          rotation-y={-Math.PI / 2}
          position={[10, 1, 0]}
          scale={[20, 1, 1]}
        />
        {/* Accent (red) */}
        <Float speed={5} floatIntensity={2} rotationIntensity={2}>
          <Lightformer
            form="ring"
            color="red"
            intensity={1}
            scale={10}
            position={[-15, 4, -18]}
            target={[0, 0, 0]}
          />
        </Float>
      </Environment>
    </>
  );
}
