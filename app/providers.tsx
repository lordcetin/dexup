'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState
} from  'react';
import { io as ClientIO } from  "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
  glData: any | null,
}

const SocketContext = createContext<SocketContextType>({
  socket:null,
  isConnected: false,
  glData: null,
});

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider = ({ children }: {children:React.ReactNode}) => {
  const [socket,setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [glData, setData] = useState<any>();

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!,{
      path: "/api/socket/io",
      cors: {
        origin: "http://82.180.137.38:3000", // Bu satırı güvenlik için spesifik bir URL ile değiştirebilirsiniz.
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      },
      addTrailingSlash: false,
    });

    socketInstance.on("connect",()=>{
      setIsConnected(true);
    });

    // socketInstance.on('gainerslosers',(data:any) => {
    //   setData(data)
    // })

    socketInstance.on( "disconnect" ,()=>{
      setIsConnected(false);
    });

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect();
    }

  },[])

  return (
    <SocketContext.Provider value={{ socket,isConnected,glData }}>
      {children}
    </SocketContext.Provider>
  )
}