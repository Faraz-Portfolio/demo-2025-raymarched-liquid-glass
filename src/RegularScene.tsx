import { Sphere, Text } from "@react-three/drei";

export function RegularScene() {
  return (
    <>
      <Text
        position={[-1.2, 1.25, 0]}
        material-depthTest={false}
        fontSize={0.2}
      >
        Vanilla
      </Text>

      <Sphere position={[-1.2, 0, 0]}>
        <meshPhysicalMaterial roughness={0.5} metalness={1} clearcoat={1} />
      </Sphere>
    </>
  );
}
