import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import CarModel from "./Car";
import RoadModel from "./RoadModel";
import CameraRig from "./Camera";
import LoadingScreen from "./LoadingScreen";

const Scene = () => {
  const carRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [mobileControls, setMobileControls] = useState({ forward: false, backward: false, left: false, right: false });

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
        <Environment files="/venice_sunset_4k.hdr" preset="sunset" background backgroundBlurriness={0.5} />
        <ambientLight />
        <directionalLight intensity={1.5} position={[5, 5, 5]} />
        <pointLight position={[5, 5, 5]} intensity={15} />

        <CarModel carRef={carRef} mobileControls={mobileControls} />

        {Array.from({ length: numberOfRoads }).map((_, i) => (
          <RoadModel key={i} position={[i * roadSpacing, 0.25, 0]} />
        ))}

        <CameraRig carRef={carRef} roadCount={numberOfRoads} roadSpacing={roadSpacing} />
      </Canvas>

      {/* 🚗 Mobile Controls UI */}
      <div className="controls">
        <button onTouchStart={() => setMobileControls({ ...mobileControls, forward: true })}
                onTouchEnd={() => setMobileControls({ ...mobileControls, forward: false })}>
          ▲
        </button>
        <div>
          <button onTouchStart={() => setMobileControls({ ...mobileControls, left: true })}
                  onTouchEnd={() => setMobileControls({ ...mobileControls, left: false })}>
            ◀
          </button>
          <button onTouchStart={() => setMobileControls({ ...mobileControls, right: true })}
                  onTouchEnd={() => setMobileControls({ ...mobileControls, right: false })}>
            ▶
          </button>
        </div>
        <button onTouchStart={() => setMobileControls({ ...mobileControls, backward: true })}
                onTouchEnd={() => setMobileControls({ ...mobileControls, backward: false })}>
          ▼
        </button>
      </div>

      {/* 💡 CSS for Mobile Controls */}
      <style>
        {`
          .controls {
            position: absolute;
            bottom: 10%;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }
          .controls div {
            display: flex;
            gap: 15px;
          }
          .controls button {
            width: 60px;
            height: 60px;
            font-size: 24px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export default Scene;
