import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { RaymarchedStandardMaterial } from "./RaymarchedStandardMaterial";

export function RayMarchingMaterial() {
  const vertexShader = useMemo(() => /* glsl */ ``, []);

  const fragmentShader = useMemo(
    () => /* glsl */ `
    uniform float uTime;

    float smoothMin(float a, float b, float k) {
      float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
      return mix(b, a, h) - k * h * (1.0 - h);
    }

    float smoothSubtraction(float a, float b, float k) {
      return -smoothMin(-a, b, k);
    }

    float smoothSubtractionInverse(float a, float b, float k) {
      return smoothMin(a, -b, k);
    }

    float sdSphere(vec3 p, float s) {
      return length(p) - s;
    }

    float sdCylinder(vec3 p, vec2 c) {
      vec2 d = abs(vec2(length(p.xz), p.y)) - c;
      return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
    }

    float sdRoundedBox(vec3 p, vec3 b, float r) {
      vec3 q = abs(p) - b;
      return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
    }

    vec3 randPos(float seed) {
      return vec3(
        fract(sin(seed) * 43758.5453),
        fract(cos(seed) * 43758.5453),
        fract(tan(seed) * 43758.5453)
      );
    }

    float randFloat(float seed) {
      return fract(sin(seed) * 43758.5453);
    }

    float mapLinear(float value, float a1, float a2, float b1, float b2) {
      return b1 + (value - a1) * (b2 - b1) / (a2 - a1);
    }

    mat4 rotationMatrix(vec3 axis, float angle) {
        axis = normalize(axis);
        float s = sin(angle);
        float c = cos(angle);
        float oc = 1.0 - c;
        
        return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                    0.0,                                0.0,                                0.0,                                1.0);
    }

    vec3 rotate(vec3 v, vec3 axis, float angle) {
      mat4 m = rotationMatrix(axis, angle);
      return (m * vec4(v, 1.0)).xyz;
    }

    float getRaymarchedScene(vec3 p) {
      float d = sdSphere(p, 0.1);

      for (int i = 0; i < 20; i++) {
        vec3 rand = randPos(float(i))  * sin(uTime + float(i)) * 0.5;
        vec3 pos = p + rand;
        if(i % 2 == 0) {
          pos += vec3(
            sin(uTime + float(i)) * 0.1,
            0.0,
            0.0
          );
        } else {
          pos += vec3(
            0.0,
            sin(uTime + float(i)) * 0.1,
            0.0
          );
        }

        float size = randFloat(float(i));
        size = mapLinear(size, 0.0, 1.0, 0.05, 0.07);

        vec3 boxCoords = rotate(pos, vec3(1.0, 1.0, 1.0), uTime);
        float box = sdRoundedBox(boxCoords, vec3(size), 0.015);
        d = smoothMin(d, box, 0.1);
      }

      float sphere = sdSphere(p, 0.5);
      d = smoothMin(d, sphere, 0.1);
      
      return d;
    }
  `,
    []
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  const raymarchedMaterial = useMemo(
    () =>
      new RaymarchedStandardMaterial(vertexShader, fragmentShader, uniforms),
    [vertexShader, fragmentShader]
  );

  useEffect(() => () => raymarchedMaterial.dispose(), []);

  const matRef = useRef<RaymarchedStandardMaterial>(null!);

  useFrame(({ clock }) => {
    // @ts-ignore
    const parent = matRef.current.__r3f.parent.object;
    if (parent) {
      raymarchedMaterial.update(parent);
    }

    uniforms.uTime.value = clock.getElapsedTime();
  });

  return <primitive ref={matRef} object={raymarchedMaterial} />;
}
