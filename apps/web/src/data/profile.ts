// Everything the sidebar and CTAs show about you. Entries with an empty href are hidden.
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
    { label: "GitHub", handle: "Erzan12", href: "https://github.com/Erzan12" },
    { label: "LinkedIn", handle: "", href: "" }, // TODO
    { label: "Twitter", handle: "", href: "" }, // TODO
    { label: "Facebook", handle: "", href: "" }, // TODO
  ],
};

export const emailHref = profile.contacts.find((c) => c.label === "Email")?.href || "/about";