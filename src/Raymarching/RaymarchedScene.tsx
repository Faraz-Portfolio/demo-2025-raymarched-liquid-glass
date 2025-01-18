import { Text } from "@react-three/drei";
import { RayMarchingMaterial } from "./RayMarchingMaterial";

export function RaymarchedScene() {
  return (
    <>
      <Text position={[1.2, 1.25, 0]} material-depthTest={false} fontSize={0.2}>
        Raymarched
      </Text>

      <mesh position={[1.2, 0, 0]} scale={2} frustumCulled={false}>
        <boxGeometry args={[3, 3, 3]} />
        <RayMarchingMaterial />
      </mesh>
    </>
  );
}
