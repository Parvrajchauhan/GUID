import React, { useState, useRef, useEffect } from "react";

const Cube = () => {
  const [rot, setRot] = useState({ x: -20, y: 30 });

  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e) => {
    if (!dragging.current) return;

    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;

    setRot((r) => ({
      x: r.x - dy * 0.4,
      y: r.y + dx * 0.4,
    }));

    last.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    dragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const faces = [
    { t: "translateZ(50px)", label: "GUID" },
    { t: "rotateY(180deg) translateZ(50px)", label: "" },
    { t: "rotateY(-90deg) translateZ(50px)", label: "" },
    { t: "rotateY(90deg) translateZ(50px)", label: "" },
    { t: "rotateX(90deg) translateZ(50px)", label: "" },
    { t: "rotateX(-90deg) translateZ(50px)", label: "" },
  ];

  return (
    <div
      onMouseDown={onMouseDown}
      className={`flex flex-col items-center justify-center gap-3 mt-8 ${
        dragging.current ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <div className="[perspective:600px]">
        <div
          className={`w-[100px] h-[100px] relative transform-style-3d ${
            dragging.current ? "" : "transition-transform duration-150 ease-out"
          }`}
          style={{
            transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {faces.map((f, i) => (
            <div
              key={i}
              className="absolute w-[100px] h-[100px] flex items-center justify-center 
              rounded-md border border-[#5F819059] bg-[#5F819040]"
              style={{ transform: f.t }}
            >
              {f.label && (
                <span className="text-[#E2F0F0] font-mono text-lg font-bold tracking-widest opacity-80">
                  {f.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs font-mono text-[#5F819066]">
        drag to rotate
      </p>
    </div>
  );
};

export default Cube;