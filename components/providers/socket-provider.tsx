"use client";

import { 
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { io as ClientIO } from "socket.io-client";

//Using socket io for real time messaging

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

//create the context for socket io
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

//hook to use this object
export const useSocket = () => {
  return useContext(SocketContext);
};

//the actual socket provider
export const SocketProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  //socket instance
    const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  //runs on startup
  useEffect(() => {
      //NEXT_PUBLIC_SITE_URL is localhost by default
      //when deployed, changed to deployed url
    const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}