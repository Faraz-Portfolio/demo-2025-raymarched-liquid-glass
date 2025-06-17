import * as THREE from "three";

function replaceAllExactly(str: string, find: string, replace: string) {
  return str.replace(new RegExp(`\\b${find}\\b`, "g"), replace);
}

export class RaymarchedStandardMaterial extends THREE.MeshPhysicalMaterial {
  uniforms = {
    uMatrixWorldInverse: { value: new THREE.Matrix4() },
  };

  constructor(vertexShader: string, fragmentShader: string, uniforms: any) {
    super({
      roughness: 0.2,
      transmission: 1,
      thickness: 1,
      transparent: true,
      // color: "#121212",
    });

    this.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        ...this.uniforms,
        ...uniforms,
      };

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <normal_fragment_begin>",
        replaceAllExactly(
          THREE.ShaderChunk.normal_fragment_begin,
          "vNormal",
          "csm_RayMarchNormals"
        )
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <normal_fragment_maps>",
        replaceAllExactly(
          THREE.ShaderChunk.normal_fragment_maps,
          "vNormal",
          "csm_RayMarchNormals"
        )
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <dithering_fragment>",
        `
          #include <dithering_fragment>
          gl_FragColor.a = csm_RayMarchAlpha;
        `
      );

      shader.vertexShader = shader.vertexShader.replace(
        "void main() {",
        `
          varying mat3 vNormalMatrix;
          varying vec3 vPosition;
          varying vec3 vCameraPosition;

          uniform mat4 uMatrixWorldInverse;

          ${vertexShader}

          void main() {
            vNormalMatrix = normalMatrix;
            vPosition = position;
            vCameraPosition = (uMatrixWorldInverse * vec4(cameraPosition, 1.0)).xyz;

            ${
              vertexShader.includes("vertexShaderMain")
                ? "vertexShaderMain();"
                : ""
            }
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "void main() {",

        `
          #define MAX_STEPS 100
          #define MAX_DIST 100.0
          #define SURF_DIST 0.001

          varying mat3 vNormalMatrix;
          varying vec3 vPosition;
          varying vec3 vCameraPosition;

          ${fragmentShader}

          vec3 getNormal(vec3 p) {
            vec2 e = vec2(0.01, 0.0);
            vec3 n = getRaymarchedScene(p) - vec3(
              getRaymarchedScene(p - e.xyy),
              getRaymarchedScene(p - e.yxy),
              getRaymarchedScene(p - e.yyx)
            );

            n = normalize(vNormalMatrix * n);

            return n;
          }

          float raymarch(vec3 ro, vec3 rd) {
            float dO = 0.0;
            float dS;

            for (int i = 0; i < MAX_STEPS; i++) {
              vec3 p = ro + rd * dO;
              dS = getRaymarchedScene(p);
              dO += dS;

              if (dS < SURF_DIST || dO > MAX_DIST) {
                break;
              }
            }

            return dO;
          }

          void main() {
            vec3 ro = vCameraPosition;
            vec3 rd = normalize(vPosition - vCameraPosition);

            float res = raymarch(ro, rd);

            vec3 csm_RayMarchNormals = vec3(0.0);
            float csm_RayMarchAlpha = 0.0;

            if (res < MAX_DIST) {
              vec3 p = ro + rd * res;
              vec3 normal = getNormal(p);

              csm_RayMarchNormals = normal;
              csm_RayMarchAlpha = 1.0;
            }
        `
      );
    };
  }

  update(mesh: THREE.Mesh) {
    this.uniforms.uMatrixWorldInverse.value.copy(mesh.matrixWorld).invert();
  }
}
