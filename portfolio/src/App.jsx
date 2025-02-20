import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import CarModel from "./car";
import RoadModel from "./Roadmodel";
import CameraRig from "./Camera.jsx";
import LoadingScreen from "./LoadingScreen"; // Import loading component

const Scene = () => {
  const carRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const numberOfRoads = 5;
  const roadSpacing = 85;

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Canvas onCreated={() => setIsLoading(false)}>
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

        {Array.from({ length: numberOfRoads }).map((_, i) => (
          <RoadModel key={i} position={[i * roadSpacing, 0.25, 0]} />
        ))}

        <CameraRig carRef={carRef} roadCount={numberOfRoads} roadSpacing={roadSpacing} />

      </Canvas>
    </>
  );
};

export default Scene;
