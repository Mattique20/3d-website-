import React from "react";
import { useGLTF } from "@react-three/drei";

const RoadModel = ({ position = [0, 0, 0] }) => {
    const { scene } = useGLTF("/street_scene/scene.gltf"); 
    const clonedScene = scene.clone(); // Clone the scene for independent instances
    
    return <primitive object={clonedScene} position={position} scale={1} />;
};

export default RoadModel;
