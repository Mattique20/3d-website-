import React, { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

const CameraRig = ({ carRef, roadCount=5, roadSpacing, roadWidth = 100 }) => {
    const controlsRef = useRef();

    useFrame(({ camera }) => {
        if (!carRef?.current || !controlsRef?.current) return;

        const carPos = carRef.current.position.clone(); // Clone car position

        // Calculate total road length dynamically
        const roadLength = roadCount * roadSpacing;

        // Offset the camera (behind and slightly above the car)
        const cameraOffset = new Vector3(-5, 3, 0);
        let targetPosition = carPos.clone().add(cameraOffset);

        // Clamp camera within full road boundaries
        const minX = -roadWidth / 2;
        const maxX = roadWidth / 2;
        const minZ = -roadLength / 2;
        const maxZ = roadLength / 2;

        //targetPosition.x = Math.max(minX, Math.min(maxX, targetPosition.x));
        //targetPosition.z = Math.max(minZ, Math.min(maxZ, targetPosition.z));

        // Smoothly move the camera without getting stuck
        camera.position.lerp(targetPosition, 0.1);

        // Ensure camera always follows the car
        controlsRef.current.target.copy(carPos);
        controlsRef.current.update();
    });

    return (
        <OrbitControls
            ref={controlsRef}
            enableDamping={true}
            dampingFactor={0.2}
            maxPolarAngle={Math.PI / 2.2} // Prevents camera from looking under the car
        />
    );
};

export default CameraRig;
