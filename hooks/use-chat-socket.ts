import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Member, Message, Profile } from "@prisma/client";

import { useSocket } from "@/components/providers/socket-provider";

//This is the file where we finally define socket io to be used
//for real time messages instead of having to refresh page
//after each new message

type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
}

//from our Prisma schema
type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  }
}

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }

    //socket to watch message updates
    socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
          //check if our data is old enough to be updated
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        //if data should be updated
        const newData = oldData.pages.map((page: any) => {
          return {
              //existing items
            ...page,
            //new items
            items: page.items.map((item: MessageWithMemberWithProfile) => {
              if (item.id === message.id) {
                return message;
              }
              return item;
            })
          }
        });

        return {
            //existing data
          ...oldData,
          //new data
          pages: newData,
        }
      })
    });

    //socket to watch message additions
    socket.on(addKey, (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
          //same as above
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [{
              items: [message],
            }]
          }
        }

        const newData = [...oldData.pages];

        //first page of new data
        //else it would try to add all the data
        //which will be pretty slow
        newData[0] = {
          ...newData[0],
          items: [
            message,
            ...newData[0].items,
          ]
        };

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    }
  }, [queryClient, addKey, queryKey, socket, updateKey]);
}