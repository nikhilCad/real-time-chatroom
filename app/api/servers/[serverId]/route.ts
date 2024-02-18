import { NextResponse } from "next/server";


//Used in Edit server modal

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

//Delete server as an admin
export async function DELETE(
  req: Request,
  //serverId is the name of the parent folder
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    //not logged in
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.delete({
      where: {
        id: params.serverId,
        //check if user is admin
        profileId: profile.id,
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

//PATCH REST API request
export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();

    //not logged in
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    //update server with the params
    const server = await db.server.update({
      where: {
        id: params.serverId,
        //only admin can modify server settings
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}