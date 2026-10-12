// Everything the sidebar, About page and CTAs show about you. Entries with an empty href are hidden.
export const profile = {
  name: "Earl Jan Do",
  handle: "Erzan",
  role: "Full-stack developer",
  location: "Philippines",
  photo: "/images/earl.jpg", // TODO: point this at your photo in /public
  bio: "Backend-focused full-stack developer. I care about scalability, performance, and clean architecture.",
  available: true,
  now: "Avega Bros. Shipping Integrated Corp",
  experience: "4 years",
  contacts: [
    { label: "Email", handle: "", href: "" }, // TODO: "mailto:you@example.com" + a visible handle
    { label: "Resume", handle: "PDF", href: "https://orgfmizyhreotvshajda.supabase.co/storage/v1/object/public/my_documents/Earl-Jan-Do-CV.pdf" },
    { label: "GitHub", handle: "Erzan12", href: "https://github.com/Erzan12" },
    { label: "LinkedIn", handle: "ej-do", href: "https://www.linkedin.com/in/ej-do/" },
    { label: "Twitter", handle: "", href: "" }, // TODO
    { label: "Facebook", handle: "erjan.do.7", href: "https://www.facebook.com/erjan.do.7" },
  ],
};

const find = (label: string) => profile.contacts.find((c) => c.label === label)?.href;
export const hasEmail = !!find("Email");
export const emailHref = find("Email") || "/about#contact";
export const resumeHref = find("Resume") || "";