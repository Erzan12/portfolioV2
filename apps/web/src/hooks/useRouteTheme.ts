"use client";

import { usePathname } from "next/navigation";
import { routeThemeConfig } from "@/lib/constants/themes";

export function useRouteTheme() {
  const pathname = usePathname();

  if (!pathname) return routeThemeConfig.default;

  const activeKey: keyof typeof routeThemeConfig =
    (Object.keys(routeThemeConfig) as Array<keyof typeof routeThemeConfig>).find(
      (route) => route !== "default" && pathname.startsWith(route)
    ) ?? "default";

  return routeThemeConfig[activeKey];
}