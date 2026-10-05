export type NowTab = "cooking" | "learning" | "into";
export type NowItem = { title: string; status: "ongoing" | "live" | "queue" };

export const nowBlurbs: Record<NowTab, string> = {
  cooking: "Stuff I'm currently building or messing around with.",
  learning: "",
  into: "",
};

export const now: Record<NowTab, NowItem[]> = {
  cooking: [
    { title: "Portfolio revamp (this one)", status: "ongoing" },
    { title: "Personal docs on Docusaurus (already deployed)", status: "ongoing" },
    { title: "Blog section: self-hosted CMS with Supabase and Drizzle ORM", status: "ongoing" },
    { title: "Simple dev tools (experimenting)", status: "queue" },
    { title: "Side project: Product Inventory System ERP", status: "ongoing" },
    { title: "Side project: Laravel projects", status: "live" },
    { title: "Side project: ERP API", status: "live" },
  ],
  // TODO: copy the items from app/on-tabs/what-im-learning.tsx and what-im-into.tsx
  learning: [],
  into: [],
};