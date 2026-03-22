import "./globals.css"
import Navbar from "@/components/core/navbar/navbar"
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/core/footer";
import { ThemeProvider } from "@/components/dark-mode-toggle/theme-provider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body className="bg-white dark:bg-black text-black dark:text-white">
        <ThemeProvider>
          <Navbar />
            {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
  title: "Erzan | Full Stack Developer",
  description: "Backend-focused developer building scalable systems",
}