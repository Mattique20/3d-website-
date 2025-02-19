import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const CarModel = ({ carRef }) => {
  const { scene } = useGLTF('/car/scene.gltf');  // Ensure the path is correct
  useEffect(() => {
    if (!scene) return;
    // Front wheels that need rotation adjustment
    const frontWheels = ["Object_11", "Object_12", "Object_88", "Object_89"]; 

    frontWheels.forEach(name => {
      const wheel = scene.getObjectByName(name);
      if (wheel) {
        wheel.rotation.set(0, Math.PI * (16 / 180), Math.PI * (-10 / 180)); 
      }
    });

  }, [scene]);
  
  useFrame(() => {
    if (!carRef.current) return;

    // Move the car forward
      carRef.current.position.x += 0.05;
    // Adjust rotation so the car faces forward
    carRef.current.rotation.y = Math.PI / 2;
    // Rotate wheels
    const wheelNames = ["Object_9", "Object_12", "Object_8", "Object_11", "Object_88", "Object_89", "Object_117", "Object_118"];
    wheelNames.forEach(name => {
      const wheel = scene.getObjectByName(name);
       if (wheel) wheel.rotateX(0.1);
    });
  });

  return <primitive object={scene} ref={carRef} position={[0, 0, 0]} scale={1} />;
};

export default CarModel;
