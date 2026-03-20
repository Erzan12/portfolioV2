"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Layout, Database, Terminal, Code2, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

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
      ease: "easeOut" //TypeScript now knows this is a valid Easing string
    } 
  },
};

const techColors: Record<string, string> = {
  NestJS: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
  PHP: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
  Laravel: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
  React: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  "Next.js": "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
  TypeScript: "bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400",
  PostgreSQL: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400",
  Docker: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400",
};

const skillData = [
  {
    category: "Backend Development",
    icon: <Server className="w-6 h-6 text-red-500" />,
    items: ["NestJS", "PHP", "Laravel", "CodeIgniter", "Node.js", "Express"],
    description: "Architecting scalable server-side systems and RESTful APIs with a focus on performance and clean code.",
    className: "lg:col-span-3 lg:row-span-2", // The Hero Card
  },
  {
    category: "Frontend",
    icon: <Layout className="w-6 h-6 text-blue-500" />,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    description: "Building interactive, high-performance web interfaces.",
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    category: "DevOps",
    icon: <Terminal className="w-6 h-6 text-teal-500" />,
    items: ["Docker", "Linux", "Git", "Vercel", "CI/CD"],
    description: "Streamlining deployment workflows.",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    category: "Databases",
    icon: <Database className="w-6 h-6 text-indigo-500" />,
    items: ["PostgreSQL", "MySQL", "Prisma", "Redis"],
    description: "Relational modeling and query optimization.",
    className: "lg:col-span-1 lg:row-span-1",
  },
];

export default function Skills() {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  // const item = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  // };

  return (
    <section className="py-20 max-w-6xl mx-auto px-1">
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight font-sans mb-4">Technical Stack</h2>
        <div className="h-1 w-20 bg-primary rounded-full" />
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 auto-rows-[180px]"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skillData.map((skill) => (
          <motion.div 
            key={skill.category} 
            variants={item} 
            className={cn("flex", skill.className)}
          >
            <Card className="group relative w-full h-full overflow-hidden border-border bg-card/50 backdrop-blur-sm rounded-3xl shadow-none hover:border-primary/40 transition-all duration-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold font-sans tracking-tight">
                  {skill.category}
                </CardTitle>
                <div className="p-2 rounded-2xl bg-muted group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                  {skill.icon}
                </div>
              </CardHeader>
              
              <CardContent className="flex flex-col justify-between h-[calc(100%-70px)]">
                <p className="text-sm text-muted-foreground font-sans line-clamp-2 group-hover:line-clamp-none transition-all">
                  {skill.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {skill.items.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className={cn(
                        "rounded-full px-3 py-0.5 font-sans text-[10px] font-semibold border-none transition-transform hover:scale-105",
                        techColors[tech] || "bg-muted text-muted-foreground"
                      )}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}