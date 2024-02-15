import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { InitialModal } from "@/components/modals/initial-modal";

const SetupPage = async () => {
  const profile = await initialProfile();

  //find the first server this profile is a member of
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
            //user has joined that server
          profileId: profile.id
        }
      }
    }
  });

  if (server) {
    //if user is in server, open that server
    return redirect(`/servers/${server.id}`);
  }

  //if not in server show this text
  // return <p>No server, seems pretty quite here</p>

  return <InitialModal />;
}
 
export default SetupPage;