import * as THREE from "three";

export const handleMouseMove = (
  event: MouseEvent,
  setMousePosition: (x: number, y: number) => void
) => {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  setMousePosition(mouseX, mouseY);
};

export const handleTouchMove = (
  event: TouchEvent,
  setMousePosition: (x: number, y: number) => void
) => {
  const mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
  setMousePosition(mouseX, mouseY);
};

export const handleTouchEnd = (
  setMousePosition: (
    x: number,
    y: number,
    interpolationX: number,
    interpolationY: number
  ) => void
) => {
  setTimeout(() => {
    setMousePosition(0, 0, 0.03, 0.03);
    setTimeout(() => {
      setMousePosition(0, 0, 0.1, 0.2);
    }, 1000);
  }, 2000);
};

export const handleHeadRotation = (
  headBone: THREE.Object3D,
  mouseX: number,
  mouseY: number,
  interpolationX: number,
  interpolationY: number,
  lerp: (x: number, y: number, t: number) => number
) => {
  if (!headBone) return;

  const maxRotation = Math.PI / 4;
  
  // More responsive to mouse movement
  const targetY = mouseX * maxRotation * 1.2;
  const targetX = -mouseY * maxRotation * 0.8;

  if (window.scrollY < 200) {
    // Smooth following of mouse
    headBone.rotation.y = lerp(headBone.rotation.y, targetY, interpolationY);
    headBone.rotation.x = lerp(headBone.rotation.x, targetX, interpolationX);
  } else {
    // When scrolled, look slightly forward and neutral
    const defaultY = 0;
    const defaultX = -0.15;
    headBone.rotation.x = lerp(headBone.rotation.x, defaultX, 0.03);
    headBone.rotation.y = lerp(headBone.rotation.y, defaultY, 0.03);
  }
};

// New function for color changes
export const handleModelColor = (
  model: THREE.Object3D,
  mouseX: number,
  mouseY: number
) => {
  if (!model) return;

  // Create color based on mouse position
  const hue = (mouseX + 1) / 2; // 0 to 1
  const saturation = 0.8;
  const lightness = 0.5;
  
  const color = new THREE.Color().setHSL(hue, saturation, lightness);

  // Apply color to all meshes in model
  model.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach((mat: any) => {
          if (mat.emissive) {
            mat.emissive = color;
            mat.emissiveIntensity = 0.3 + Math.abs(mouseY) * 0.3;
          }
        });
      } else {
        const mat = child.material as any;
        if (mat.emissive) {
          mat.emissive = color;
          mat.emissiveIntensity = 0.3 + Math.abs(mouseY) * 0.3;
        }
      }
    }
  });
};