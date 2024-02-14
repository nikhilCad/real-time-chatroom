import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
//from uploadThing docs
const f = createUploadthing();
 
//get auth info from clerk
const handleAuth = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId: userId };
}

export const ourFileRouter = {
//uploading the server image
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
  //check authentication in "middle" of upload process
    .middleware(() => handleAuth())
    //dont do anything after upload yet
    .onUploadComplete(() => {}),
//uploading the message
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;