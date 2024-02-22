# real-time-chatroom
A real time chatroom

to run -> 
```
npm run dev
```

localhost at port 3000

Next.JS -> Framework used with React

Clerk -> User authentication

Shadcn UI -> Component library, can install only the components we need not entire library

Our Shadcn components/ui are present in the components directory, so if we want we can edit them unlike other component libraries

In libs/util, Shadcn has gives us a util called cn in div for styling

```
<Button className={cn("bg-indigo-500", true&&"bg-red-500")}>
    This is ShadcnUI button
</Button>
```

Supabase used as database host (Postgresql), mainly because it has a free tier :)

Prism used to define schema to be used in the application

Use layout.tsx to change metadata info for your site

page.tsx in root app folder is the default page that opens on localhost

Routing in Next.js -> create folder "folderName: in app folder

Now make a "page.tsx" file in that folder

Now route visible at localhost:3000/folderName

Thus NextJS has very simple routing

To hide a page from this, name it "(folderName)" instead of "folderName" in app folder, but you can use its child folder if it does not have "()", very useful for organizing pages and their helper functions 

layout.tsx can also be overridden if in same folder as "()" for its sibling pages

main default page.tsx is inside (main) folder, but since its just organizational it is picked up as default path by next js

[[...folder-Name]] used for Clerk to work for routing in NextJS

So in general -> app/(main)/(routes)/servers/[serverId]/channels/[channelId]/page.tsx

this points to the layout of the page at url -> localhost:3000//servers/[serverId]/channels/[channelId]

Here the 2nd class took priority

"use client"

both react and client components are server side rendering but this client is also rendered on the client -> can cause hydration errors. One state rendered on server, another state rendered on client


TailwindCSS -> Use classname in UIs to apply pre-defined styles
Typescript is used

UploadThing -> Big data server, for file uploads, upto 2GB overall

Axios -> Axios is a promise-based HTTP library that lets developers make requests to either their own or a third-party server to fetch data -> Used for CRUD operations

Zustand -> Global state management

SocketIO -> Used for real-time messages, "Bidirectional and low-latency communication for every platform"

**Commands after modifying prisma schema file, push data to db**
```
npx prisma generate
npx prisma db push
```

use ```npx prisma studio`` for debugging prisma


**To put in the .env file**

```
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (from clerk)
CLERK_SECRET_KEY

DATABASE_URL (for Prisma)

UPLOADTHING_SECRET (for uploadThing)
UPLOADTHING_APP_ID

NEXT_PUBLIC_SITE_URL = Put your deployed url here if you are deploying it,
else it defaults to localhost, so no need to add

```

For database, use prism init and provide the value to DATABASE_URL in .env file, this project uses Supabase

Main file -> Page.tsx
8:08:38