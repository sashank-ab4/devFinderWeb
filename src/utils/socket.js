import io from "socket.io-client";

export const createSocketConnection = () => {
  const SOCKET_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:4444"
      : "https://www.devtribe.online";
  return io(SOCKET_URL, {
    withCredentials: true,
    transports: ["websocket", "polling"],
  });
};
