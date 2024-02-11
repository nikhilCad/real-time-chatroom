import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { db } from "@/lib/db";

export const initialProfile = async () => {
    console.log(options)
    const session = await getServerSession(options)

    console.log("hi");

    //db is from prisma, hosted at Supabase for this project
  
    const profile = await db.profile.findUnique({
        where: {
          email: session?.user?.email || ""
        }
      })
      

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      name: session?.user?.email || "",
      imageUrl: session?.user?.image || "",
      email: session?.user?.email || ""
    }
  });

  console.log(newProfile)

  return newProfile;
};