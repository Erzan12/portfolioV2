export type NowTab = "cooking" | "learning" | "into";
export type NowItem = { title: string; status: "onhold" | "ongoing" | "live" | "queue" | "hobby" | "onbreak" | "onstreak" };

export const nowBlurbs: Record<NowTab, string> = {
  cooking: "Stuff I'm currently building or messing around with.",
  learning: "Currently leveling up these skills",
  into: "My interest",
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
  learning: [
    { title: "Backend architecture with NestJS", status: "ongoing" },
    { title: "Performance optimization techniques", status: "ongoing" },
    { title: "NextJS framework", status: "ongoing" },
    { title: "CI/CD workflows", status: "ongoing" },
    { title: "Advanced system design", status: "onhold" },
    { title: "Building developer tools", status: "onhold" },
  ],
  into: [
    { title: "Mobile Development", status: "onstreak" },
    { title: "Late night building sessions", status: "onbreak" },
    { title: "Contributing to Open Source Projects", status: "hobby" },
    { title: "Practicing my muscle memory to cast down Invoker spells effeciently", status: "hobby" },
    { title: "Lifting weights", status: "hobby" } 
  ],
};