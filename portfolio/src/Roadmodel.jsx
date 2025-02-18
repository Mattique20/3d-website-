// RoadModel.jsx
import React from "react";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three";

const RoadModel = () => {
    const { scene } = useGLTF("./public/street_scene/scene.gltf");  // Path to your road model

    return <primitive object={scene}  position={[0, 0.25, 0]} scale={1} />;
};

export default RoadModel;
