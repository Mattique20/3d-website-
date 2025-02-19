import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const CameraRig = ({ carRef }) => {
  const controlsRef = useRef();

  useFrame(({ camera }) => {
    if (!carRef.current || !controlsRef.current) return;

    const carPos = carRef.current.position;

    // Smoothly follow the car while keeping OrbitControls active
    controlsRef.current.target.lerp(carPos, 0.1);
    controlsRef.current.update();
  });

  return <OrbitControls ref={controlsRef} enableDamping={true} dampingFactor={0.05} />;
};

export default CameraRig;
