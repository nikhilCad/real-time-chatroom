import { db } from "@/lib/db";

//use find or create conversation depending on if conversation already exists or not
export const getOrCreateConversation = async (memberOneId: string, memberTwoId: string) => {
    //try finding in both orders
  let conversation = await findConversation(memberOneId, memberTwoId) || await findConversation(memberTwoId, memberOneId);

  //else create a new conversation
  if (!conversation) {
    conversation = await createNewConversation(memberOneId, memberTwoId);
  }

  return conversation;
}

//check if a conversation between these users already exists
const findConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.conversation.findFirst({
      where: {
          //find conversation between these two member ids
        AND: [
          { memberOneId: memberOneId },
          { memberTwoId: memberTwoId },
        ]
      },
      //include everything about member like name and image
      //show that we can display it
      include: {
        memberOne: {
          include: {
            profile: true,
          }
        },
        memberTwo: {
          include: {
            profile: true,
          }
        }
      }
    });
  } catch {
    return null;
  }
}

//each conversation needs to be initiated, there is no default like #general channel
const createNewConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          }
        },
        memberTwo: {
          include: {
            profile: true,
          }
        }
      }
    })
  } catch {
    return null;
  }
}