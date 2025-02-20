import React, { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

const CameraRig = ({ carRef, roadWidth = 100, roadLength = 10 }) => {
    const controlsRef = useRef();

    useFrame(({ camera }) => {
        if (!carRef?.current || !controlsRef?.current) return;

        const carPos = carRef.current.position.clone(); // Clone to prevent modifying original object

        // Offset the camera position (closer behind and slightly above the car)
        const cameraOffset = new Vector3(-5, 2, 0); // Adjusted for a closer view
        const targetPosition = carPos.clone().add(cameraOffset);

        // Smooth transition for a natural effect
        
        camera.position.lerp(targetPosition, .04); // Faster transition for a more responsive feel
        controlsRef.current.target.lerp(carPos, 0.001);
        controlsRef.current.update();
    });

    return <OrbitControls ref={controlsRef} enableDamping={true} dampingFactor={0.2} />;
};

export default CameraRig;
