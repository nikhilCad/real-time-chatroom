"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "@/components/ui/badge";

//Shows if we are connected to socket or not in UI

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
      //Not connected badge, not real-time
    return (
      <Badge 
        variant="outline" 
        className="bg-yellow-600 text-white border-none"
      >
        Fallback: Polling every 1s
      </Badge>
    )
  }

  return (
      //Else status is ok
    <Badge 
      variant="outline" 
      className="bg-emerald-600 text-white border-none"
    >
      Live: Real-time updates
    </Badge>
  )
}