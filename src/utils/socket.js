import io from "socket.io-client";
import { BASE_BACKEND_URL } from "./mockData";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_BACKEND_URL);
  } else {
    /* return io("/", {path: "/api/socket-io"}) */
    return io(); //use same domain
  }
};
