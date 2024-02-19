"use client";

import axios from "axios";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useModal } from "@/hooks/use-modal-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOrigin } from "@/hooks/use-origin";

//The other just have to paste the invite code in their browser, they will be joined

//File is same as Initial Modal.tsx with some differences, like the form is removed
export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  //gets the window url
  const origin = useOrigin();

    //from use-model-store.ts get the "invite", this "invite" string is passed as prop to the dropdown
    //and from there it finally reaches this file to be open the actual modal
  const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //invite code is in the server object
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    //copy to clipboard on clicking the copy button
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  //Generate new invite link
  const onNew = async () => {
    try {
      setIsLoading(true);
      //routing defined in invite-code/route.ts
      //also note that each server has ONLY ONE invite code
      //so if you recreate an invite code for a server using generate new button
      //and try to join server with the old invite code
      //it wont work as that old value no longer exists in the databse
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label
            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
          >
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button disabled={isLoading} onClick={onCopy} size="icon">
              {copied 
                ? <Check className="w-4 h-4" /> 
                : <Copy className="w-4 h-4" />
              }
            </Button>
          </div>
          <Button
            onClick={onNew}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}