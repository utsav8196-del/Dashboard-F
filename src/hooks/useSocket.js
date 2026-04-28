import { useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext.jsx";

export default function useSocket() {
  const { token } = useAuth();

  const socket = useMemo(() => {
    if (!token) {
      return null;
    }

    return io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
      auth: { token },
      transports: ["websocket"],
    });
  }, [token]);

  useEffect(() => {
    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  return socket;
}
