import { accentStyles, routeThemeConfig } from "../constants/themes";

export function getRouteTheme(pathname: string) {
    const activeKey = 
        (Object.keys(routeThemeConfig) as Array<
            keyof typeof routeThemeConfig
        >).find(
            (route) => route !== "default" && pathname.startsWith(route)
        ) ?? "default";

        const theme = routeThemeConfig[activeKey];

    return {
        theme,
        styles: accentStyles[theme.accent],
    };
}