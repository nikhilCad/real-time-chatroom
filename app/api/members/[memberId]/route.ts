import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

//Kicks user out of the server
export async function DELETE(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");

    //check if we have all the info
    if (!profile) {
      return new NextResponse("Unauthorized" ,{ status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    if (!params.memberId) {
      return new NextResponse("Member ID missing", { status: 400 });
    }

    //this operation only performed by admin
    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
        //delete the specified member from the database of server
          deleteMany: {
            id: params.memberId,
            //admin cant kick out themselves
            //even though we already check it in frontend
            //this additional checks protects us from future attacks
            profileId: {
              not: profile.id
            }
          }
        }
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          }
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[MEMBER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

//update roles from the manage members modal
export async function PATCH(
  req: Request,
  //memberId from folder name
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    //get the url of the request
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();

    const serverId = searchParams.get("serverId");

    //not logged in
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    //wrong server
    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    if (!params.memberId) {
      return new NextResponse("Member ID missing", { status: 400 });
    }

    //add member to server database
    //this operation is done by the admin only
    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              //user should not update their own, only admin can change it
              //and admin cant change their own role
              profileId: {
                not: profile.id
              }
            },
            //updates the role
            data: {
              role
            }
          }
        }
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc"
          }
        }
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[MEMBERS_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}