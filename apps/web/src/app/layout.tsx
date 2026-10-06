import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { PersonaChat } from "@/components/core/personal-chat/persona-chat";
import { Nav } from "@/components/nav";
import Sidebar from "@/components/sidebar";
import { SiteShell } from "@/components/siteshell";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "Erzan | Full Stack Developer",
  description: "Backend-focused developer building scalable systems",
  icons: { icon: "/favicon-light.ico" },
};

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

// Sets the theme before first paint so there is no light/dark flash.
const themeInit = `try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bricolage.variable} ${jetbrains.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeInit }} /></head>
      <body>
        <Providers>
          <Nav />
          <SiteShell sidebar={<Sidebar />}>{children}</SiteShell>
          <PersonaChat />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}