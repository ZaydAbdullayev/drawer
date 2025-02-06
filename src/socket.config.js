// socket.js
import io from "socket.io-client";
const url = import.meta.env.VITE_API_SOCKET_BASE_URL;
const socket = io(url, {
  transportOptions: {
    polling: {
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    },
  },
  transports: ["websocket"],
});

export default socket;
