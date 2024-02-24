import { NextResponse } from "next/server";
import { Message } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const MESSAGES_BATCH = 10;

//Route for the messages in channels and DMs
export async function GET(
  req: Request
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    //cursor tells infiniteload to what messages to load from next batch of messages
    //as we only load certain messages from all the messages
    const cursor = searchParams.get("cursor");
    const channelId = searchParams.get("channelId");

    //null checks
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  
    if (!channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    let messages: Message[] = [];

    //if infiniteQuery generate a batch from the messages
    if (cursor) {
      messages = await db.message.findMany({
        //batch of 10
        take: MESSAGES_BATCH,
        //don't repeat the message the cursor is at
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          channelId,
        },
        //include the messages as well as the profile pic
        include: {
          member: {
            include: {
              profile: true,
            }
          }
        },
        //sorted by recent first
        orderBy: {
          createdAt: "desc",
        }
      })
    } else {
        //if we don't get the cursor from infiniteQuery
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        //no skips or cursor here
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            }
          }
        },
        orderBy: {
          createdAt: "desc",
        }
      });
    }

    let nextCursor = null;

    if (messages.length === MESSAGES_BATCH) {
        //the messages just oldest than the current batch
      nextCursor = messages[MESSAGES_BATCH - 1].id;
    }

    return NextResponse.json({
      items: messages,
      nextCursor
    });
  } catch (error) {
    console.log("[MESSAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}