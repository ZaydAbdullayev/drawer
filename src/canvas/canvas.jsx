import { useEffect, useRef, useState, memo } from "react";
import socket from "../socket.config";
import { useParams, useNavigate } from "react-router-dom";
import { cursors } from "../components/cursor/cursors";

const Canvas = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [persons, setPersons] = useState(0);
  const [color, setColor] = useState("#000");
  const { id: room, cursor } = useParams();
  const navigate = useNavigate();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth - 100;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctxRef.current = ctx;

    socket.emit("join-room", room);

    socket.on("load-canvas", (drawingData) => {
      if (drawingData) {
        const img = new Image();
        img.src = drawingData;
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
      }
    });

    socket.on("draw", ({ x, y, prevX, prevY, color }) => {
      drawLine(prevX, prevY, x, y, color);
    });

    socket.on("update-canvas", (drawingData) => {
      const img = new Image();
      img.src = drawingData;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
    });

    socket.on("clear", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    socket.on("room-count", (data) => {
      setPersons(data);
    });

    socket.on("change-color", (newColor) => {
      setColor(newColor);
      ctxRef.current.strokeStyle = newColor;
    });

    return () => {
      socket.off("draw");
      socket.off("clear");
      socket.off("update-canvas");
      socket.off("load-canvas");
      socket.off("change-color");
    };
  }, [room]);

  const startDrawing = (e) => {
    setDrawing(true);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!drawing) return;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const prevX = ctxRef.current.lastX || x;
    const prevY = ctxRef.current.lastY || y;

    drawLine(prevX, prevY, x, y, color);

    socket.emit("draw", { room, x, y, prevX, prevY, color });

    ctxRef.current.lastX = x;
    ctxRef.current.lastY = y;
  };

  const stopDrawing = () => {
    setDrawing(false);
    ctxRef.current.lastX = null;
    ctxRef.current.lastY = null;

    const drawingData = canvasRef.current.toDataURL();
    socket.emit("update-canvas", { room, drawingData });
  };

  const changeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    ctxRef.current.strokeStyle = newColor;
    socket.emit("change-color", newColor);
  };

  const leaveRoom = () => {
    socket.emit("leave-room", room);
    navigate("/");
  };

  const drawLine = (prevX, prevY, x, y, color) => {
    ctxRef.current.strokeStyle = color;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(prevX, prevY);
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };

  const handleMouseMove = (e) => {
    setCursorPosition({
      x: e.clientX - 20, // Adjust for cursor image size
      y: e.clientY - 20, // Adjust for cursor image size
    });
  };

  return (
    <div>
      <div
        className="w100 df aic jcsb gap-20"
        style={{ backdropFilter: "blur(20px)", padding: "10px 20px" }}
      >
        <h2>
          Room ID: {room}, Number of users in the room: {persons}{" "}
        </h2>
        <div className="df aic gap-10">
          <h3>Color:</h3>
          <span className="active-color" style={{ background: color }}></span>
          <input
            type="color"
            name="color"
            value={color}
            onChange={changeColor}
          />
        </div>
      </div>
      <div
        style={{ position: "relative" }}
        onMouseMove={handleMouseMove} // Capture mouse movement for custom cursor
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          style={{
            border: "2px solid black",
            background: "white",
            cursor: "none", // Hide default cursor
          }}
        />
        {/* Custom cursor */}
        <img
          src={cursors[cursor]?.icon}
          style={{
            position: "absolute",
            top: `${cursorPosition.y - cursors[cursor]?.y}px`,
            left: `${cursorPosition.x - cursors[cursor]?.x}px`,
            pointerEvents: "none", // Prevent cursor from interfering with canvas interaction
            zIndex: 99,
            width: "40px", // Adjust cursor size as needed
            height: "40px", // Adjust cursor size as needed
          }}
          alt="cursor"
        />
      </div>
      <br />
      <button className="button" onClick={leaveRoom}>
        Get out this room
      </button>
    </div>
  );
};

export default memo(Canvas);
