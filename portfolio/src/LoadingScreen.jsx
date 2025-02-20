import React from "react";
import { useProgress } from "@react-three/drei";

const LoadingScreen = () => {
  const { progress } = useProgress(); // Track loading progress

  return (
    <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <p style={styles.loadingText}>Loading {Math.round(progress)}%</p>
    </div>
  );
};

// CSS Styles for Loading Screen
const styles = {
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.9)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid rgba(255, 255, 255, 0.3)",
    borderTop: "5px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    marginTop: "10px",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

// Add spinner animation
const styleTag = document.createElement("style");
styleTag.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleTag);

export default LoadingScreen;
