import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { ServerSidebar } from "@/components/server/server-sidebar";


//Channels bar aka ServerSidebar
const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
        //serverId is the name of this folder, also appears in the url, as per nextJS routing
      id: params.serverId,
      members: {
        some: {
            //confirms that you actually are part of the server before giving you server info
          profileId: profile.id
        }
      }
    }
  });

  if (!server) {
      //if not part of server
    return redirect("/");
  }

  return ( 
    <div className="h-full">
      <div 
      //Space between the server list bar, and the server messages
      //ie the server sidebar, or channel list
      className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">
        {children}
      </main>
    </div>
   );
}
 
export default ServerIdLayout;