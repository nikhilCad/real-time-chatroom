import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import { Server, Member, Profile } from "@prisma/client"
import { Sidebar } from "lucide-react";


//used in server-Sidebar.tsx to pass adittional server info as props
export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

//custom response type to use inside io.ts
export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};