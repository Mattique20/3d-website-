import React from "react";
import "./styles.css"; // Import CSS styles

const Controls = ({ setMoving, setTurning }) => {
  return (
    <div id="controls">
      <button
        onTouchStart={() => setTurning("left")}
        onTouchEnd={() => setTurning(null)}
      >
        ⬅️
      </button>
      <button
        onTouchStart={() => setMoving("w")}
        onTouchEnd={() => setMoving(null)}
      >
        ⬆️
      </button>
      <button
        onTouchStart={() => setMoving("s")}
        onTouchEnd={() => setMoving(null)}
      >
        ⬇️
      </button>
      <button
        onTouchStart={() => setTurning("right")}
        onTouchEnd={() => setTurning(null)}
      >
        ➡️
      </button>
    </div>
  );
};

export default Controls;
