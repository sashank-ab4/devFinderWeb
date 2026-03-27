import io from "socket.io-client";
import { BASE_BACKEND_URL } from "./mockData";
export const createSocketConnection = () => {
  return io(BASE_BACKEND_URL, {
    withCredentials: true,
    transports: ["websocket", "polling"],
  });
};
