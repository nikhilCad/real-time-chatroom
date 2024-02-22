import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "../components/providers/theme-provider"
import "./globals.css";
import { cn } from "@/lib/utils";

import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Real Time Chatroom",
  description: "A chatroom like Discord and Slack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, "bg-white dark:bg-[#313338]")}>
          <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                //forcedTheme="dark"
                enableSystem={false}
                storage-key="discord-theme"
                disableTransitionOnChange
              >
                <SocketProvider>
                  <ModalProvider/>
                  {children}
                </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
