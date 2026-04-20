"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { caseStudies, caseStudyCategories } from "@/data/caseStudies";
import FilterTabs from "./FilterTabs";
import CaseStudyCard from "./CaseStudyCard";

export default function CaseStudyGrid() {
  const [activeFilter, setActiveFilter] = useState("all");
  const prefersReducedMotion = useReducedMotion();

  const filtered =
    activeFilter === "all"
      ? caseStudies
      : caseStudies.filter((s) => s.category === activeFilter);

  return (
    <>
      <FilterTabs
        categories={caseStudyCategories}
        active={activeFilter}
        onChange={setActiveFilter}
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((study) => (
            <motion.div
              key={study.id}
              layout={!prefersReducedMotion}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            >
              <CaseStudyCard study={study} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
