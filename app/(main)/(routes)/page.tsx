// import Image from "next/image";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div>
    <p className="text-3xl font-bold text-indigo-500">
    Hi
    </p>
    <Button className={cn("bg-indigo-500", true&&"bg-red-500")}>
      This is ShadcnUI button ok
    </Button>
    <ModeToggle></ModeToggle>
    </div>
  );
}
