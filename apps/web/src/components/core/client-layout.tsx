"use client";

import Navbar from "@/components/core/navbar/navbar";
import Footer from "@/components/core/footer";
import { ThemeProvider } from "@/components/dark-mode-toggle/theme-provider";
import Providers from "@/components/providers";
import { usePathname } from "next/navigation";
import { accentStyles, routeThemeConfig } from "@/lib/constants/themes";
import { cn } from "@/lib/utils";
import { useRouteTheme } from "@/hooks/useRouteTheme";
import { getRouteTheme } from "@/lib/helper/get-route-theme";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const theme = useRouteTheme();
  const styles = accentStyles[theme.accent];

  // const themeClass = routeThemeConfig[activeKey].split(" ")[0];

  return (
    <div className={cn("transition-colors duration-500 min-h-screen", styles.bg)}>
      <ThemeProvider>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </ThemeProvider>
    </div>
  );
}