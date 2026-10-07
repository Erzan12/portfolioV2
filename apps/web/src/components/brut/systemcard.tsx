"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Badge } from "./badge";
import { ExternalLink, Github } from "lucide-react";
import { getRelativeTime } from "@/lib/helper/date-format.helper";
import { formatCommitDate } from "@/lib/helper/format-commit-date.helper";
import { Button } from "./button";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

type Props = {
  title: string;
  description: string;
  stack?: string[];
  topics?: string[];
  stars?: number;
  forks?: number;
  language?: string | null;
  last_update?: string;
  link?: string;
  showArchitectureLink?: boolean;
  showRepositoryLink?: boolean;
  techColors?: Record<string, string>;
  icon?: React.ReactNode;
};

export default function SystemCard({
  title,
  description,
  topics,
  language,
  stars,
  forks,
  last_update,
  link,
  showArchitectureLink = true,
  showRepositoryLink = true,
  techColors = {},
  icon,
}: Props) {
  return (
    <motion.div
      whileHover={{
        x: -4,
        y: -6,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      className="h-full"
    >
      <Card
        className="
          group
          h-[480px]
          flex flex-col
          overflow-hidden
          rounded-none
          border-2
          border-ink
          bg-surface
          text-ink
          shadow-hard
          transition-colors
          duration-150
          hover:bg-paper
        "
      >
        <CardHeader className={icon ? "p-6 pb-0" : "p-6 pb-2"}>
          {icon && (
            <div
              className="
                w-12 h-12
                flex items-center justify-center
                mb-4
                border-2 border-ink
                bg-spark
                text-on-spark
                shadow-hard-sm
                transition-transform
                duration-100
                group-hover:-translate-x-1
                group-hover:-translate-y-1
              "
            >
              {icon}
            </div>
          )}

          <CardTitle
            className="
              text-xl
              font-black
              font-sans
              uppercase
              tracking-tight
              text-ink
            "
          >
            {title}
          </CardTitle>

          {(stars !== undefined ||
            forks !== undefined ||
            language) && (
            <div
              className="
                flex
                items-center
                gap-3
                mt-3
                text-xs
                font-mono
                font-bold
                uppercase
                text-ink
              "
            >
              {language && (
                <span className="bg-accent text-on-accent px-1.5 py-0.5 border border-ink">
                  {language}
                </span>
              )}

              {stars !== undefined && (
                <span>★ {stars}</span>
              )}

              {forks !== undefined && (
                <span>⑂ {forks}</span>
              )}
            </div>
          )}
        </CardHeader>

        <CardContent className="p-6 flex-1 flex flex-col">
          <p
            className="
              text-sm
              font-sans
              font-medium
              leading-relaxed
              text-ink/80
              line-clamp-4
              mb-4
            "
          >
            {description}
          </p>

          <motion.div
            className="flex flex-wrap gap-2 mt-auto"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {topics?.map((tech, i) => (
              <motion.div
                key={tech}
                variants={item}
                whileHover={{
                  x: -2,
                  y: -2,
                }}
                transition={{
                  duration: 0.1,
                  delay: i * 0.05,
                }}
              >
                <Badge
                  variant="secondary"
                  className={`
                    rounded-none
                    border-2
                    border-ink
                    px-2.5
                    py-1
                    text-[10px]
                    font-mono
                    font-bold
                    uppercase
                    shadow-hard-sm
                    ${
                      techColors[tech] ||
                      "bg-spark text-on-spark"
                    }
                  `}
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex flex-col gap-3">
          {last_update && (
            <div
              className="
                w-full
                flex flex-col
                mb-1
                text-[10px]
                font-mono
                font-bold
                uppercase
                text-ink/70
              "
            >
              <span>
                Updated {getRelativeTime(last_update)}
              </span>

              <span className="text-ink/50">
                Last commit: {formatCommitDate(last_update)}
              </span>
            </div>
          )}

          <div className="flex gap-3 w-full">
            {showArchitectureLink && link && (
              <Button
                // asChild
                // variant="outline"
                // size="sm"
                // className="
                //   flex-1
                //   rounded-none
                //   border-2
                //   border-ink
                //   bg-surface
                //   text-ink
                //   shadow-hard-sm
                //   font-mono
                //   text-xs
                //   font-bold
                //   uppercase
                //   transition-all
                //   hover:-translate-x-0.5
                //   hover:-translate-y-0.5
                //   hover:bg-spark
                //   hover:text-on-spark
                //   hover:shadow-hard
                //   active:translate-x-1
                //   active:translate-y-1
                //   active:shadow-none
                // "
              >
                <Link href={link} target="_blank">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Case Study
                </Link>
              </Button>
            )}

            {showRepositoryLink && link && (
              <Button
                // asChild
                // size="sm"
                // className="
                //   flex-1
                //   rounded-none
                //   border-2
                //   border-ink
                //   bg-accent
                //   text-on-accent
                //   shadow-hard-sm
                //   font-mono
                //   text-xs
                //   font-bold
                //   uppercase
                //   transition-all
                //   hover:-translate-x-0.5
                //   hover:-translate-y-0.5
                //   hover:shadow-hard
                //   active:translate-x-1
                //   active:translate-y-1
                //   active:shadow-none
                // "
              >
                <Link href={link} target="_blank">
                  <Github className="w-3.5 h-3.5" />
                  Repo
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
