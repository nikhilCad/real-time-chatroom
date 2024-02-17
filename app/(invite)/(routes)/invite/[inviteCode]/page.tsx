import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

interface InviteCodePageProps {
  params: {
      //name of the parent folder, will give the current invite code automatically in nextjs
    inviteCode: string;
  };
};

const InviteCodePage = async ({
  params
}: InviteCodePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  //wrong invite code
  if (!params.inviteCode) {
    return redirect("/");
  }

  //now join
  //first check if user is member already in the server
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  //just redirect if already in that server
  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  //now join the server code
  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
          //add the user to the server
          //default role guest is given
        create: [
          {
            profileId: profile.id,
          }
        ]
      }
    }
  });

  //redirect after joining
  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  
  return null;
}
 
export default InviteCodePage;