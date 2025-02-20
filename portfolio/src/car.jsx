import React, { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const CarModel = ({ carRef }) => {
    const { scene } = useGLTF("/car/scene.gltf");    
    const [moving, setMoving] = useState(false);
    const [turning, setTurning] = useState(null);

    // Movement & Turning Speed
    const speed = 0.1;
    const turnSpeed = 0.05;
  
    useEffect(() => {
        if (!scene) return;

        // Debugging: Log all objects in the scene
        scene.traverse((child) => console.log(child.name));

        const frontWheels = ["Object_11", "Object_12", "Object_88", "Object_89"];
        const allWheels = ["Object_9", "Object_12", "Object_8", "Object_11", "Object_88", "Object_89", "Object_117", "Object_118"];

        // Set default rotation for front wheels
        frontWheels.forEach(name => {
            const wheel = scene.getObjectByName(name);
            if (wheel) {
                wheel.rotation.set(0, Math.PI * (16 / 180), Math.PI * (-10 / 180));
            }
        });

        // Keyboard event listeners
        const handleKeyDown = (event) => {
            const key = event.key.toLowerCase();
            if (key === "w" || key === "s") {
                setMoving(key); 
            } 
            if (key === "a" || key === "d") {
                setTurning(key === "a" ? "left" : "right");
            }
        };

        const handleKeyUp = (event) => {
            const key = event.key.toLowerCase();
            if (key === "w" || key === "s") {
                setMoving(false);
            } 
            if (key === "a" || key === "d") {
                setTurning(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [scene]);

    useFrame(() => {
        if (!carRef.current || !scene) return;

        // 🚗 **Move Car**
        if (moving === "w") carRef.current.translateZ(speed);
        if (moving === "s") carRef.current.translateZ(-speed);

        // 🚗 **Rotate Car If Moving**
        if (moving && turning === "left") {
            carRef.current.rotation.y += turnSpeed;
        } else if (moving && turning === "right") {
            carRef.current.rotation.y -= turnSpeed;
        }

        // 🚗 **Rotate Wheels (Moving)**
        if (moving) {
            const wheelNames = ["Object_9", "Object_12", "Object_8", "Object_11", "Object_88", "Object_89", "Object_117", "Object_118"];
            wheelNames.forEach(name => {
                const wheel = scene.getObjectByName(name);
                if (wheel) {
                    wheel.rotation.x += moving === "s" ? -0.1 : 0.1;
                }
            });
        }

        // 🚗 **Turn Front Wheels When Pressing A/D**
        const frontWheels = ["Object_11", "Object_12", "Object_88", "Object_89"];
        frontWheels.forEach(name => {
            const wheel = scene.getObjectByName(name);
            if (wheel) {
                if (turning === "left") {
                    wheel.rotation.y = Math.PI * (52 / 180);
                } else if (turning === "right") {
                    wheel.rotation.y = Math.PI * (-16 / 180);
                } else {
                    wheel.rotation.y = Math.PI * (16 / 180);
                }
            }
        });
    });

    useEffect(() => {
        if (carRef) carRef.current = scene;
    }, [scene]);

    return <primitive object={scene} />;
};

export default CarModel;
