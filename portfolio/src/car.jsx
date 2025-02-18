import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const CarModel = () => {
  const { scene, nodes } = useGLTF('/car/scene.gltf');  // Ensure the path is correct
  
  const carRef = useRef();
  return <primitive object={scene} ref={carRef} position={[0, 0, 0]} scale={1} />;
};

export default CarModel;
