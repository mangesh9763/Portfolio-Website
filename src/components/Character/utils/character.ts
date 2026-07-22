import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";
import { getPublicAssetUrl } from "../../../utils/publicAsset";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(getPublicAssetUrl("/draco/"));
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = (): Promise<GLTF | null> => {
    return new Promise((resolve) => {
      const finalize = (gltf: GLTF | null) => {
        resolve(gltf);
        dracoLoader.dispose();
      };

      decryptFile(getPublicAssetUrl("/models/character.enc"), "Character3D#@").then(
        (encryptedBlob) => {
          const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

          loader.load(
            blobUrl,
            async (gltf) => {
              const character = gltf.scene;
              await renderer.compileAsync(character, camera, scene);
              character.traverse((child: THREE.Object3D) => {
                if ("isMesh" in child && child.isMesh) {
                  const mesh = child as THREE.Mesh;
                  child.castShadow = true;
                  child.receiveShadow = true;
                  mesh.frustumCulled = true;
                }
              });
              setCharTimeline(character, camera);
              setAllTimeline();
              const footR = character.getObjectByName("footR");
              const footL = character.getObjectByName("footL");
              if (footR) footR.position.y = 3.36;
              if (footL) footL.position.y = 3.36;
              finalize(gltf);
            },
            undefined,
            (error) => {
              console.error("Error loading GLTF model:", error);
              finalize(null);
            }
          );
        }
      ).catch((error) => {
        console.error("Error loading encrypted character model:", error);
        finalize(null);
      });
    });
  };

  return { loadCharacter };
};

export default setCharacter;
