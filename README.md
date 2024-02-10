# real-time-chatroom
A real time chatroom built with MERN stack

to run -> 
```
npm run dev
```

localhost at port 3000

Next.JS -> Framework used with React

Shadcn UI -> Component library, can install only the components we need not entire library

Our Shadcn components/ui are present in the components directory, so if we want we can edit them unlike other component libraries

In libs/util, Shadcn has gives us a util called cn in div for styling

```
<Button className={cn("bg-indigo-500", true&&"bg-red-500")}>
    This is ShadcnUI button
</Button>
```

Use layout.tsx to change metadata info for your site

page.tsx in root app folder is the default page that opens on localhost

Routing in Next.js -> create folder "folderName: in app folder

Now make a "page.tsx" file in that folder

Now route visible at localhost:3000/folderName

Thus NextJS has very simple routing

To hide a page from this, name it "(folderName)" instead of "folderName" in app folder, but you can use its child folder if it does not have "()", very useful for organizing pages and their helper functions 

layout.tsx can also be overridden if in same folder as "()" for its sibling pages

Here the 2nd class took priority

TailwindCSS -> Use classname in UIs to apply pre-defined styles
Typescript is used

Main file -> Page.tsx
14:10