import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket.config";
import { cursors } from "../components/cursor/cursors";

export const App = () => {
  const [room, setRoom] = useState("");
  const [roomIds, setRoomIds] = useState([]);
  const [cursor, setCursor] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("room-ids", (ids) => {
      setRoomIds(ids);
    });

    return () => {
      socket.off("room-ids");
    };
  }, []);

  const visitRoom = () => {
    const randomRoom = roomIds[Math.floor(Math.random() * roomIds.length)];
    navigate(`room/${randomRoom}/${cursor}`);
  };

  return (
    <div className="w100 df fdc aic jcc gap-20 contents">
      <div className="df fdc aic gap-10">
        <h1>Welcome! Please select cursor or draw your custom cursor</h1>
        <div className="w100 df aic jcc gap-20 cursor-options">
          {cursors?.map((item, index) => {
            return (
              <div
                className={`df aic jcc cursor ${cursor === index && "active"}`}
                key={index}
                onClick={() => {
                  setCursor(index);
                }}
              >
                <img src={item.icon} alt="icon" />
              </div>
            );
          })}
          <div
            className={`df aic jcc cursor ${cursor === "new" && "active"}`}
            onClick={() => setCursor("new")}
          >
            new
          </div>
        </div>
        <h1>
          You can create a new room or randomly join one of the existing rooms.
        </h1>
        <label className="df gap-10 input-label">
          <input
            type="text"
            placeholder="Write a room id"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={() => navigate(`room/${room}/${cursor}`)}>
            Submit
          </button>
        </label>
        <button className="button" onClick={visitRoom}>
          Visit random room
        </button>
      </div>
    </div>
  );
};
