// import Image from "next/image";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import { cn } from "@/lib/utils";
import { db } from "@/lib/db";
//import { options } from "@/app/api/auth/[...nextauth]/options";
//import { getServerSession } from "next-auth";
// import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const Home =  async() => {

  //const session = await getServerSession(options)

  console.log("hi")

  const profile: any =  await initialProfile;

  console.log(profile)

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  //This page will only show when logged in
  return (
    <div>
    <p className="text-3xl font-bold text-indigo-500">
    Hi
    </p>
    <Button className={cn("bg-indigo-500", true&&"bg-red-500")}>
      This is ShadcnUI button Ok
    </Button>
    <ModeToggle></ModeToggle>
    
    <p>Hi {profile?.name}</p>
    {/* <img src={profile?.imageUrl}></img> */}

    <Button> <Link href="/api/auth/signout">Sign Out</Link> </Button>
      
    
    </div>
  );
}

export default Home;
