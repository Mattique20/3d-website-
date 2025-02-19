import React, { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const CameraRig = ({ carRef }) => {
    const controlsRef = useRef();

    useFrame(({ camera }) => {
        if (!carRef?.current || !controlsRef?.current) return;

        const carPos = carRef.current.position;

        // Smoothly move the camera behind the car
        controlsRef.current.target.lerp(carPos, 0.1);
        controlsRef.current.update();
    });

    return <OrbitControls ref={controlsRef} enableDamping={true} dampingFactor={0.05} />;
};

export default CameraRig;
