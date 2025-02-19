import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import CarModel from "./car";
import RoadModel from "./Roadmodel";
import CameraRig from "./Camera.jsx";

const Scene = () => {
  const carRef = useRef();
  
  // Adjust the number and spacing of road segments
  const numberOfRoads = 5; // Change this to add more roads
  const roadSpacing = 85;  // Adjust spacing between each road
  
  return (
    <Canvas>
      <Environment
        files="./public/venice_sunset_4k.hdr"
        preset="sunset"
        background
        backgroundBlurriness={0.5}
      />
      <ambientLight />
      <directionalLight intensity={1.5} position={[5, 5, 5]} />
      <pointLight position={[5, 5, 5]} intensity={15} />

      <CarModel carRef={carRef} roadCount={numberOfRoads} roadSpacing={roadSpacing} />

      {/* Render multiple roads */}
      {Array.from({ length: numberOfRoads }).map((_, i) => (
        <RoadModel key={i} position={[i * roadSpacing, 0.25, 0]} /> // Placing roads in front of each other
      ))}

      <CameraRig carRef={carRef} />
    </Canvas>
  );
};

export default Scene;
