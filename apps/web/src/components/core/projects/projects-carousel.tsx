"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./project-card";
import { Project } from "@/lib/types/project";

type Props = {
  projects: Project[];
  repos: any;
};

export default function ProjectsCarousel({ projects, repos }: Props) {
  const [index, setIndex] = useState(0);

  const CARD_WIDTH = 340; // width of each card
  const SPACING = 20; // spacing between cards
  const VISIBLE_CARDS = 3; // number of cards visible at a time

  const prev = () => {
    setIndex((i) => (i - 1 + projects.length) % projects.length);
  };

  const next = () => {
    setIndex((i) => (i + 1) % projects.length);
  };

  // Calculate x position relative to center
  const getPosition = (i: number) => {
    const diff = i - index;

    if (diff === 0) return { x: 0, scale: 1, opacity: 1, zIndex: 10 };
    if (diff === 1) return { x: CARD_WIDTH + SPACING, scale: 0.8, opacity: 0.6, zIndex: 5 };
    if (diff === -1 || diff === projects.length - 1) return { x: -(CARD_WIDTH + SPACING), scale: 0.8, opacity: 0.6, zIndex: 5 };

    return { x: 0, scale: 0.6, opacity: 0, zIndex: 0 };
  };

  return (
    <div className="relative w-full max-w-[1200px] mx-auto h-[420px] flex items-center justify-center">
      {/* LEFT ARROW */}
      <button
        onClick={prev}
        className="absolute left-2 z-20 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        <ChevronLeft size={28} />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={next}
        className="absolute right-2 z-20 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        <ChevronRight size={28} />
      </button>

      {/* CARDS */}
      <div className="relative w-full flex justify-center items-center">
        {projects.map((project, i) => {
          const pos = getPosition(i);

          return (
            <motion.div
              key={project.title}
              animate={pos}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="absolute w-[340px]"
              style={{ zIndex: pos.zIndex }}
            >
              <ProjectCard {...project} repos={repos} />
            </motion.div>
          );
        })}
      </div>

      {/* DOTS */}
      <div className="absolute bottom-4 z-30 flex gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === index ? "bg-blue-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}