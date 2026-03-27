import React from "react";

export default function SpaceBackdrop() {
  return (
    <div className="space-backdrop" aria-hidden="true">
      <div className="starfield starfield-far"></div>
      <div className="starfield starfield-mid"></div>
      <div className="nebula nebula-a"></div>
      <div className="nebula nebula-b"></div>

      <div className="solar-system-core">
        <span className="sun-core"></span>
        <span className="orbit orbit-1">
          <span className="planet planet-1"></span>
        </span>
        <span className="orbit orbit-2">
          <span className="planet planet-2"></span>
        </span>
        <span className="orbit orbit-3">
          <span className="planet planet-3"></span>
        </span>
      </div>
    </div>
  );
}
