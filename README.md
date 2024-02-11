# real-time-chatroom
A real time chatroom built with MERN stack

to run -> 
```
npm run dev
```

localhost at port 3000

Next.JS -> Framework used with React

Next-Auth -> Used for user authentication

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

Here the 2nd class took priority

TailwindCSS -> Use classname in UIs to apply pre-defined styles
Typescript is used


**To put in the .env file**

Use 
```
openssl rand -base64 32 
```
To create a key for environment variable, set it for NEXTAUTH_SECRET environment variable

For database, use prism init and provide the value to DATABASE_URLin .env file, this project uses Supabase

Main file -> Page.tsx
1:00:00