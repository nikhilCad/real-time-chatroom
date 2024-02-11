// import Image from "next/image";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Home() {

  const session = await getServerSession(options)
  return (
    <div>
    <p className="text-3xl font-bold text-indigo-500">
    Hi
    </p>
    <Button className={cn("bg-indigo-500", true&&"bg-red-500")}>
      This is ShadcnUI button ok
    </Button>
    <p>Hi {session?.user?.name}</p>
    <img src={session?.user?.image as string}></img>
    <ModeToggle></ModeToggle>
    </div>
  );
}
