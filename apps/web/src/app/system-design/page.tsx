"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Database, ShieldCheck, Box } from "lucide-react";

export default function SystemDesign() {

    //  const techColors: Record<string, string> = {
    //     React: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
    //     NextJS: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
    //     TypeScript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
    //     NestJS: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
    //     Prisma: "bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100",
    //     PostgreSQL: "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
    //     Docker: "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
    //     Docusaurus: "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50",
    //     Tailwind: "bg-sky-100 text-sky-800 dark:bg-sky-800 dark:text-sky-100",
    //     PHP: "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
    //     Laravel: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
    //     CodeIgniter: "bg-red-50 text-red-900 dark:bg-red-900 dark:text-red-50",
    // };
    
  const systems = [
    {
      title: "ERP Backend Architecture",
      description:
        "Deep dive into the architecture behind a scalable ERP backend. Includes database normalization, role-based access control (RBAC), and modular service design for enterprise resource planning.",
      stack: ["NestJS", "PostgreSQL", "Prisma", "JWT"],
      topics: ["RBAC", "REST APIs", "Modular"],
      link: "https://erzan-docs.vercel.app/docs/Case-studies/erp-backend-api",
      icon: <Database className="w-6 h-6 text-primary" />,
    },
    {
      title: "Authentication System",
      description:
        "A robust authentication flow utilizing JWT, refresh tokens, and a granular permission model. Designed to handle secure session management across multiple microservices.",
      stack: ["JWT", "NodeJS", "Redis"],
      topics: ["Security", "OAuth2", "Sessions"],
      link: "https://erzan-docs.vercel.app/docs/Case-studies/auth-flow",
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    },
    {
      title: "Portfolio Monorepo Design",
      description:
        "The architectural layout of a monorepo platform. Leverages shared UI components and centralized documentation to power a developer-centric portfolio and technical blog.",
      stack: ["Next.js", "Turborepo", "Tailwind"],
      topics: ["Monorepo", "Architecture", "CI/CD"],
      link: "https://erzan-docs.vercel.app/docs/Case-studies/portfolio-platform",
      icon: <Box className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <main className="min-h-screen pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section matching your style */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-card-foreground font-sans tracking-tight">
            System Design
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl font-sans leading-relaxed">
            Architectural thinking behind the systems I design and build. This section explores 
            backend structures, authentication models, and platform infrastructure 
            with a focus on scalability and clean code.
          </p>
        </div>

        {/* Grid Layout matching About Page grid behavior */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((system, index) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-[420px] flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-none transition-all duration-300 hover:border-primary/50 group">
                <CardHeader className="p-6 pb-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {system.icon}
                  </div>
                  <CardTitle className="text-xl font-bold font-sans text-card-foreground">
                    {system.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6 flex-1">
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed line-clamp-4">
                    {system.description}
                  </p>
                  
                  {/* Topics/Stack Badges matching About Me style */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {system.stack.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="rounded-full text-[10px] font-sans px-2.5 py-0.5"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <a 
                    href={system.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full"
                  >
                    <Button 
                      variant="outline" 
                      className="w-full rounded-full gap-2 font-sans border-border hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Read Case Study
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}