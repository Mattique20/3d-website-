import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const CarModel = ({ carRef }) => {
    const { scene } = useGLTF('/car/scene.gltf');  
    const [moving, setMoving] = useState(false);
    const [turning, setTurning] = useState(null);

    // Movement & Turning Speed
    const speed = 0.1;
    const turnSpeed = 0.05;
    const maxWheelTurn = Math.PI / 9;

    useEffect(() => {
        if (!scene) return;

        const frontWheels = ["Object_11", "Object_12", "Object_88", "Object_89"];
        const allWheels = ["Object_9", "Object_12", "Object_8", "Object_11", "Object_88", "Object_89", "Object_117", "Object_118"];

        console.log("Scene loaded:", scene); // Log the entire scene

        // Check front wheels:
        console.log("Checking Front Wheels:");
        frontWheels.forEach(name => {
            const wheel = scene.getObjectByName(name);
            if (wheel) {
                console.log(`  Front wheel "${name}" found:`, wheel);
            } else {
                console.warn(`  Front wheel "${name}" NOT FOUND!`);
            }
        });

         // Check all wheels:
         console.log("Checking All Wheels:");
         allWheels.forEach(name => {
             const wheel = scene.getObjectByName(name);
             if (wheel) {
                 console.log(`  Wheel "${name}" found:`, wheel);
             } else {
                 console.warn(`  Wheel "${name}" NOT FOUND!`);
             }
         });


        // Adjust front wheels' default angles
        for (let name of frontWheels) {
            const wheel = scene.getObjectByName(name);
            if (wheel) {
                wheel.rotation.set(0, Math.PI * (16 / 180), Math.PI * (-10 / 180)); // Default angles\
                wheel.rotateX(0.1);
            }
        }

        // Keyboard event listeners
        const handleKeyDown = (event) => {
            const key = event.key.toLowerCase();
            if (key === "w" || key === "s") {
                setMoving(key); // "w" for forward, "s" for backward
            } 
            if (key === "a" || key === "d") {
                setTurning(key === "a" ? "left" : "right"); // Turn wheels even if car is still
            }
        };

        const handleKeyUp = (event) => {
            const key = event.key.toLowerCase();
            if (key === "w" || key === "s") {
                setMoving(false);
            } 
            if (key === "a" || key === "d") {
                setTurning(null); // Reset wheels when turn key is released
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
        if (!carRef.current || !scene) return;  // Ensure scene is loaded

        // 🚗 **Move Car**
        if (moving === "w") {
            carRef.current.position.z += speed * Math.cos(carRef.current.rotation.y);
            carRef.current.position.x += speed * Math.sin(carRef.current.rotation.y);
        } else if (moving === "s") {
            carRef.current.position.z -= speed * Math.cos(carRef.current.rotation.y);
            carRef.current.position.x -= speed * Math.sin(carRef.current.rotation.y);
        }

        // 🚗 **Only Rotate Car If Moving**
        if (moving && turning === "left") {
            carRef.current.rotation.y += turnSpeed;
        } else if (moving && turning === "right") {
            carRef.current.rotation.y -= turnSpeed;
        }

        // 🚗 **Rotate Wheels (Moving)**
        if (moving) {
            const wheelNames = ["Object_9", "Object_12", "Object_8", "Object_11", "Object_88", "Object_89", "Object_117", "Object_118"];
            for (let name of wheelNames) 
              {
                console.log(`Rotating wheel: ${name}`); 
                const wheel = scene.getObjectByName(name);
               
                if (wheel) {
                  const initialRotationX = wheel.rotation.x;
                    if (moving === "s") {
        
                        wheel.rotateX(-0.1); // Reverse rotation when going backward
                    } else {
                        wheel.rotateX(0.1);
                    }
                    console.log(`Wheel ${name} rotation X:`, wheel.rotation.x); //log the result
                    console.log(`Wheel ${name} rotation change:`, wheel.rotation.x - initialRotationX); 
                }
            }
        }

        // 🚗 **Turn Front Wheels When Pressing A/D**
        const frontWheels = ["Object_11", "Object_12", "Object_88", "Object_89"];
        for (let name of frontWheels) {
            const wheel = scene.getObjectByName(name);
            if (wheel) {
                if (turning === "left") {
                    wheel.rotation.set(0, Math.PI * (52 / 180), Math.PI * (-10 / 180)); // Turn left
                    wheel.rotateX(0.1);
                } else if (turning === "right") {
                    wheel.rotation.set(0, 0, 0); // Turn right
                    wheel.rotateX(0.1);
                    
                } else {
                    // Reset to default when no turn key is pressed
                    wheel.rotation.set(0, Math.PI * (16 / 180), Math.PI * (-10 / 180));
                }
            }
        }
    });

    return <primitive object={scene} ref={carRef} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={1} />;
};

export default CarModel;