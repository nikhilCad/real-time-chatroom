import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "../components/providers/theme-provider"
import "./globals.css";
import { cn } from "@/lib/utils";

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
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "bg-white dark:bg-[#313338]")}>
        <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              storage-key="discord-theme"
              disableTransitionOnChange
            >
              {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
