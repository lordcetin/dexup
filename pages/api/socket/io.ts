import { Server as NetServer,Socket } from 'net'
import { NextApiRequest } from 'next'
import { Server as ServerIO } from 'socket.io';

import { NextApiResponseServerIo } from '@/lib/types';

export const config = {
  api:{
    bodyParser:false,
  }
}
export function broadcastData(io:any, data:any) {
  io.emit('updateData', data);
}
const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if(!res.socket.server.io){
    console.log('Setting up WebSocket server...');
    const path = "/api/socket/io";

    const httpServer: NetServer = res.socket.server as any
    //@ts-ignore
    const io = new ServerIO(httpServer, {
      path: path,
      cors: {
        origin: "https://dexup.io", // Bu satırı güvenlik için spesifik bir URL ile değiştirebilirsiniz.
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      },
      //@ts-ignore
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    // //Veri güncelleme olayını dinleme
    // io.on('connection',(socket:any) => {
    //   console.log('WebSocket client connected');

    //   // Örnek olarak bağlantı kurulduğunda veri gönder
    //   // Gerçek kullanımda bu, veri güncellendiğinde tetiklenmelidir.
    //   socket.on('requestUpdate',() => {
    //     // Bu fonksiyon, API'den güncel veri çekip bunu yayınlayacak
    //     const data = { message: 'Hello World' };  // Örnek veri
    //     broadcastData(io, data);
    //   });

    //   socket.on('disconnect', () => {
    //     console.log('WebSocket client disconnected');
    //   })
    // })

  }


  res.end();
}

export default ioHandler;