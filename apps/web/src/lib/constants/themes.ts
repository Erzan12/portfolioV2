export const routeThemeConfig = {
  "/blog": {
    accent: "orange",
    gradient: "from-orange-500/20 to-orange-400/5",
    ring: "ring-orange-500/20",
  },

  "/projects": {
    accent: "blue",
    gradient: "from-blue-500/20 to-blue-400/5",
    ring: "ring-blue-500/20",
  },

  "/about": {
    accent: "green",
    gradient: "from-green-500/20 to-green-400/5",
    ring: "ring-green-500/20",
  },

  "/system-design": {
    accent: "purple",
    gradient: "from-purple-500/20 to-purple-400/5",
    ring: "ring-purple-500/20",
  },

  default: {
    accent: "slate",
    gradient: "from-slate-500/20 to-slate-400/5",
    ring: "ring-slate-500/20",
  },
} as const;

export const accentStyles = {
  orange: {
    text: "hover:text-orange-600",
    border: "border-orange-500/20",
    bg: "bg-orange-500/10",
  },

  blue: {
    text: "hover:text-blue-600",
    border: "border-blue-500/20",
    bg: "bg-blue-500/10",
  },

  green: {
    text: "hover:text-green-600",
    border: "border-green-500/20",
    bg: "bg-green-400/10",
  },

  purple: {
    text: "hover:text-purple-600",
    border: "border-purple-500/20",
    bg: "bg-purple-500/10",
  },

  slate: {
    text: "hover:text-slate-600",
    border: "border-slate-500/20",
    bg: "bg-slate-500/10",
  },
} as const;