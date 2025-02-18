import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CarModel from "./car";
import RoadModel from "./Roadmodel";  
import { Environment } from '@react-three/drei'
const Scene = () => {
    return (
        <Canvas camera={{ position: [1, 1, 1] }}>
            <Environment  files="./src/assets/venice_sunset_4k.hdr"  preset="sunset" background backgroundBlurriness={0.5} />
            <ambientLight />  
            <directionalLight intensity={1.5} position={[5, 5, 5]} />  
            <pointLight position={[5, 5, 5]} intensity={15} />
            
            <CarModel />
            <RoadModel />
            <OrbitControls />
        </Canvas>
    );
};

export default Scene;
