import { useRef, useState } from "react";

export default function CustomCursorEditor({ onSave }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  const startDrawing = (e) => {
    setDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctxRef.current = ctx;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!drawing) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const saveCursor = () => {
    const dataURL = canvasRef.current.toDataURL();
    onSave(dataURL);
  };

  return (
    <div className="df fdc aic">
      <h3>Draw Your Custom Cursor</h3>
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        style={{
          border: "1px solid black",
          background: "white",
          cursor: "crosshair",
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
      />
      <button onClick={saveCursor} className="button">
        Save Cursor
      </button>
    </div>
  );
}
