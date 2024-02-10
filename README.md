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

Here the 2nd class took priority

TailwindCSS -> Use classname in UIs to apply pre-defined styles
Typescript is used

Main file -> Page.tsx
14:10