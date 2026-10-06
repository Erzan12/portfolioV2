"use client";
import { usePathname } from "next/navigation";

// Routes that render without the sidebar. Edit to match your admin/auth routes.
const NO_SIDEBAR = ["/admin", "/login", "/dashboard", "/styleguide"];

export function SiteShell({ sidebar, children }: { sidebar: React.ReactNode; children: React.ReactNode }) {
  const path = usePathname();
  if (NO_SIDEBAR.some((p) => path === p || path.startsWith(p + "/"))) return <>{children}</>;
  return (
    <div className="lg:grid lg:grid-cols-[minmax(20rem,30%)_1fr]">
      {sidebar}
      <div className="min-w-0">{children}</div>
    </div>
  );
}