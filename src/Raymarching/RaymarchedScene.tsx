import { RayMarchingMaterial } from "./RayMarchingMaterial";

export function RaymarchedScene() {
  return (
    <>
      <mesh position={[0, 0, 0]} scale={2} frustumCulled={false}>
        <boxGeometry args={[3, 3, 3]} />
        <RayMarchingMaterial />
      </mesh>
    </>
  );
}
