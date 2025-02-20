import React, { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const CarModel = ({ carRef, mobileControls }) => {
    const { scene } = useGLTF("/car/scene.gltf");
    const [moving, setMoving] = useState(false);
    const [turning, setTurning] = useState(null);

    // Movement & Turning Speed
    const speed = 0.1;
    const turnSpeed = 0.05;

    useEffect(() => {
        if (!scene) return;

        scene.traverse((child) => console.log(child.name));

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

        // 🚗 **Mobile Controls Handling**
        if (mobileControls.forward) setMoving("w");
        else if (mobileControls.backward) setMoving("s");
        else setMoving(false);

        if (mobileControls.left) setTurning("left");
        else if (mobileControls.right) setTurning("right");
        else setTurning(null);

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

        // 🚗 **Turn Front Wheels When Pressing A/D or Mobile Buttons**
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
