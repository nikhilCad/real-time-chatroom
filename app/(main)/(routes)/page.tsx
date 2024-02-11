// import Image from "next/image";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import { cn } from "@/lib/utils";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Home() {

  const session = await getServerSession(options)
  //This page will only show when logged in
  return (
    <div>
    <p className="text-3xl font-bold text-indigo-500">
    Hi
    </p>
    <Button className={cn("bg-indigo-500", true&&"bg-red-500")}>
      This is ShadcnUI button ok
    </Button>
    <ModeToggle></ModeToggle>
    
    <p>Hi {session?.user?.name}</p>
    <img src={session?.user?.image as string}></img>

    <Button> <Link href="/api/auth/signout">Sign Out</Link> </Button>
      
    
    </div>
  );
}
