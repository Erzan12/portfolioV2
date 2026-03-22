"use client";

import { Variants } from "framer-motion";
import { Server, Layout, Database, Terminal, } from "lucide-react";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiNestjs, SiPrisma, 
  SiPostgresql, SiDocker, SiTailwindcss, SiPhp, SiLaravel, 
  SiCodeigniter, SiNodedotjs, SiExpress, SiGit, SiFramer 
} from "react-icons/si";
import { ReactNode } from "react";
import SkillCard from "./skills/skill-card";

const item: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut"
    } 
  },
};

const techIcons: Record<string, { icon: ReactNode, color: string }> = {
  "React": { icon: <SiReact />, color: "#61DAFB" },
  "Next.js": { icon: <SiNextdotjs />, color: "#000000" },
  "NextJS": { icon: <SiNextdotjs />, color: "#000000" },
  "TypeScript": { icon: <SiTypescript />, color: "#3178C6" },
  "NestJS": { icon: <SiNestjs />, color: "#E0234E" },
  "Prisma": { icon: <SiPrisma />, color: "#2D3748" },
  "PostgreSQL": { icon: <SiPostgresql />, color: "#4169E1" },
  "Docker": { icon: <SiDocker />, color: "#2496ED" },
  "Tailwind CSS": { icon: <SiTailwindcss />, color: "#06B6D4" },
  "PHP": { icon: <SiPhp />, color: "#777BB4" },
  "Laravel": { icon: <SiLaravel />, color: "#FF2D20" },
  "CodeIgniter": { icon: <SiCodeigniter />, color: "#EE4323" },
  "Node.js": { icon: <SiNodedotjs />, color: "#339933" },
  "Express": { icon: <SiExpress />, color: "#000000" },
  "Git": { icon: <SiGit />, color: "#F05032" },
  "Framer Motion": { icon: <SiFramer />, color: "#0055FF" },
};

const skillData = [
  {
    category: "Backend Development",
    icon: <Server className="w-6 h-6 text-red-500" />,
    items: ["NestJS", "PHP", "Laravel", "CodeIgniter", "Node.js", "Express"],
    description: "Architecting scalable server-side systems and RESTful APIs with a focus on performance and clean code.",
    gridConfig: "md:col-span-7 lg:row-span-2", //large primary card
  },
  {
    category: "Frontend",
    icon: <Layout className="w-6 h-6 text-blue-500" />,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    description: "Building interactive, high-performance web interfaces.",
    gridConfig: "md:col-span-5 lg:row-span-1", //compact secondary card
  },
  {
    category: "DevOps",
    icon: <Terminal className="w-6 h-6 text-teal-500" />,
    items: ["Docker", "Linux", "Git", "Vercel", "CI/CD"],
    description: "Streamlining deployment workflows.",
    gridConfig: "md:col-span-5 lg:row-span-1", //fits under Frontend
  },
  {
    category: "Databases",
    icon: <Database className="w-6 h-6 text-indigo-500" />,
    items: ["PostgreSQL", "MySQL", "Prisma", "Redis"],
    description: "Relational modeling and query optimization.",
    gridConfig: "md:col-span-12 lg:row-span-1", //full widt footer card
  },
];

export default function Skills() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-4">
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight font-sans mb-4">Technical Stack</h2>
        <div className="h-1 w-20 bg-primary rounded-full" />
      </div>

      {/* bento grid 
         - 12 columns on desktop for maximum layout control.
         - grid-auto-rows-[minmax(180px,auto)] ensures cards have a base height 
           but can grow if needed.
      */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-fr">
        {skillData.map((skill, index) => (
          <SkillCard 
            key={skill.category} 
            skill={skill} 
            index={index} 
            className={skill.gridConfig} // pass the layout config here
          />
        ))}
      </div>
    </section>
  );
}