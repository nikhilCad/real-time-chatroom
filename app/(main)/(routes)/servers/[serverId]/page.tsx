import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface ServerIdPageProps {
  params: {
    serverId: string;
  }
};

//Default page on entering a server

const ServerIdPage = async ({
  params
}: ServerIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        }
      }
    },
    include: {
      channels: {
        where: {
          name: "general"
        },
        orderBy: {
          createdAt: "asc"
        }
      }
    }
  })

  //default channel to redirect is general channel
  const initialChannel = server?.channels[0];

  //we cant remove general so this check is just for sanity
  if (initialChannel?.name !== "general") {
    return null;
  }

  //redirect to general
  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
}
 
export default ServerIdPage;