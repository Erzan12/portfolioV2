"use client";

import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

// Set NEXT_PUBLIC_CAL_LINK to "your-cal-username/event-slug", e.g. "earl/intro-call"
const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK;
const NAMESPACE = "intro";

export default function Scheduler() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Follow the site's light/dark toggle
  useEffect(() => {
    const el = document.documentElement;
    const read = () => setTheme(el.dataset.theme === "dark" ? "dark" : "light");
    read();
    const mo = new MutationObserver(read);
    mo.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    if (!CAL_LINK) return;
    let cancelled = false;
    getCalApi({ namespace: NAMESPACE }).then((cal) => {
      if (cancelled) return;
      cal("ui", {
        theme,
        layout: "month_view",
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          light: { "cal-brand": "#2340FF", "cal-brand-text": "#FFFFFF", "cal-bg": "#FFFBEF" },
          dark: { "cal-brand": "#D9FF1F", "cal-brand-text": "#000000", "cal-bg": "#121212" },
        },
      });
    });
    return () => { cancelled = true; };
  }, [theme]);

  if (!CAL_LINK) {
    return (
      <p className="text-lg">
        Booking isn&apos;t available right now. Send a message below and I&apos;ll get back to you.
      </p>
    );
  }

  return (
    <div className="min-h-[640px] w-full">
      <Cal
        namespace={NAMESPACE}
        calLink={CAL_LINK}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", theme }}
      />
    </div>
  );
}