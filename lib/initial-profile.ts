import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    //function from clerk
    return redirectToSignIn();
  }

  //db initialized from our lib folder
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id
    }
  });


  //if profile exists, return that profile
  if (profile) {
    return profile;
  }

  //else create a new profile and return that
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  });

  return newProfile;
};