"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";

//At the top of channel, it says 'Search'
//This file handles on click of that, as well as the modal functionality

interface ServerSearchProps {
  data: {
    label: string;
    //can either search channel or members
    type: "channel" | "member",
    data: {
      icon: React.ReactNode;
      name: string;
      id: string;
    }[] | undefined
  }[]
}

export const ServerSearch = ({
  data
}: ServerSearchProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {

    //Ctrl K shortcut
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        //reverse the current state
        setOpen((open) => !open);
      }
    }

    document.addEventListener("keydown", down);

    //return to prevent overflows
    return () => document.removeEventListener("keydown", down)
  }, []);

  const onClick = ({ id, type }: { id: string, type: "channel" | "member"}) => {
    //close the modal
    setOpen(false);

    if (type === "member") {
      // go/redirect to member search result
      return router.push(`/servers/${params?.serverId}/conversations/${id}`)
    }

    if (type === "channel") {
      // go/redirect to channel
      return router.push(`/servers/${params?.serverId}/channels/${id}`)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
      >
        {/* Search ICON not search bar */}
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p
          className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition"
        >
          Search
        </p>
        {/* Keyboard element */}
        <kbd
          className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
        >
          <span className="text-xs">CTRL K</span>
        </kbd>
      </button>


      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList>
          {/* Show this if empty */}
          <CommandEmpty>
            No Results found
          </CommandEmpty>

          {/* The search functionality from the params */}
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            //if data length > 0
            return (

              <CommandGroup key={label} heading={label}>
                  {data?.map(({ id, icon, name }) => {
                    return (
                      //Call the onClick when you press on this command item
                      <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                        {icon}
                        <span>{name}</span>
                      </CommandItem>
                    )
                  })}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}