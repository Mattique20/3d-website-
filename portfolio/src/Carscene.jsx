import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const CarScene = ({ moving, turning }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 🏎 **Create Car & Wheels**
    const car = new THREE.Group();
    const wheels = [];

    for (let i = 0; i < 4; i++) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32), new THREE.MeshBasicMaterial({ color: 0x000000 }));
      scene.add(wheel);
      wheels.push(wheel);
    }

    scene.add(car);
    camera.position.z = 5;

    // 🎮 **Animation Loop**
    const animate = () => {
      requestAnimationFrame(animate);

      // 🏎 **Wheel Rotation (Move Forward/Backward)**
      wheels.forEach((wheel) => {
        if (moving === "w") wheel.rotation.x += 0.05;
        if (moving === "s") wheel.rotation.x -= 0.05;
      });

      // 🛞 **Steering (Left/Right)**
      wheels.forEach((wheel) => {
        if (turning === "left") wheel.rotation.z = THREE.MathUtils.lerp(wheel.rotation.z, 0.5, 0.1);
        else if (turning === "right") wheel.rotation.z = THREE.MathUtils.lerp(wheel.rotation.z, -0.5, 0.1);
        else wheel.rotation.z = THREE.MathUtils.lerp(wheel.rotation.z, 0, 0.1);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => mountRef.current.removeChild(renderer.domElement);
  }, [moving, turning]);

  return <div ref={mountRef} />;
};

export default CarScene;
