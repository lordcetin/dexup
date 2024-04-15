'use client'
import { useSocket } from "@/app/providers";
import { Badge } from "@/components/ui/badge";


export const SocketIndicator = () => {
  const { isConnected,glData} = useSocket();

  if(!isConnected){
    return (

      <Badge title="Fallback: Polling every 1s" variant="outline" className="bg-yellow-600 text-white border-none rounded-full p-1 text-xs animate-pulse cursor-pointer">
      </Badge>

    )
  }

  return (
    <Badge title="Live: Real-time updates" variant="outline" className="bg-emerald-600 text-white border-none rounded-full p-1 text-xs animate-pulse cursor-pointer">
    </Badge>
  )
}