import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";


//util to return the current logged in profile

export const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  //get logged in profile
  const profile = await db.profile.findUnique({
    where: {
      userId
    }
  });

  return profile;
}