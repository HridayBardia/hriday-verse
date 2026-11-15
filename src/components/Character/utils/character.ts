import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve) => {
      try {
        let character: THREE.Object3D;
        loader.load(
          "/models/character.glb",
          async (gltf) => {
            character = gltf.scene;
            try {
              await renderer.compileAsync(character, camera, scene);
            } catch (compileErr) {
              // Non-blocking compile fallback
            }
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });

            const footR =
              character.getObjectByName("footR") ||
              character.getObjectByName("foot.R");
            const footL =
              character.getObjectByName("footL") ||
              character.getObjectByName("foot.L");
            if (footR) footR.position.y = 3.36;
            if (footL) footL.position.y = 3.36;

            resolve(gltf);

            try {
              setCharTimeline(character, camera);
              setAllTimeline();
            } catch (tlErr) {
              console.warn("Timeline initialization notice:", tlErr);
            }

            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            resolve(null);
          }
        );
      } catch (err) {
        console.error("Failed to initialize character model loader:", err);
        resolve(null);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
