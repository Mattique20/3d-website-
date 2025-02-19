import React from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

const CameraRig = ({ carRef }) => {
    const controlsRef = useRef();
  
    useFrame(({ camera }) => {
      if (!carRef.current || !controlsRef.current) return;
  
      const carPos = carRef.current.position;
  
      // Move the camera smoothly behind the car
      
  
      // Set OrbitControls target to the car's position
      controlsRef.current.target.lerp(carPos, 1);
      controlsRef.current.update();
    });
  
    return <OrbitControls ref={controlsRef} enableDamping={true} dampingFactor={0.05} />;
  };
  