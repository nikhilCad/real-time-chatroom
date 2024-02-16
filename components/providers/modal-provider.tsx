"use client";
//both react and client components are server side rendering
//but this client is also rendered on the client -> can cause
//hydration errors. One state rendered on server, another state rendered
//on client

import { useEffect, useState } from "react";

// import { EditServerModal } from "@/components/modals/edit-server-modal";
// import { InviteModal } from "@/components/modals/invite-modal";
import { CreateServerModal } from "@/components/modals/create-server-modal";
// import { MembersModal } from "@/components/modals/members-modal";
// import { CreateChannelModal } from "@/components/modals/create-channel-modal";
// import { LeaveServerModal } from "@/components/modals/leave-server-modal";
// import { DeleteServerModal } from "@/components/modals/delete-server-modal";
// import { DeleteChannelModal } from "@/components/modals/delete-channel-modal";
// import { EditChannelModal } from "@/components/modals/edit-channel-modal";
// import { MessageFileModal } from "@/components/modals/message-file-modal";
// import { DeleteMessageModal } from "@/components/modals/delete-message-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);


  //prevent modal to be rendered from server side
  //avoids hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      {/* <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
      <DeleteMessageModal /> */}
    </>
  )
}