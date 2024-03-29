"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";

//Ready to use upload zone provided by uploadthing library
import { UploadDropzone } from "@/lib/uploadthing";

//what does this component take -> interface
interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  //endpoint from core.ts 'ourFileRouter' for uploadthing
  //messageFile is basically attachments in chat
  //while serverImage is when user is creating a new server, for
  //profile picture
  endpoint: "messageFile" | "serverImage"
}

export const FileUpload = ({
  onChange,
  value,
  endpoint
}: FileUploadProps) => {
    //check filetype from the uploaded url
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
      //image, as only 2 types
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={value}
          alt="Upload"
          className="rounded-full"
        />
        <button
        //onChange argument is empty, ie delete
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  //Don't try to show a thumbnail for the pdf for now 
  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a 
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
          //prop function onchange
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  )
}