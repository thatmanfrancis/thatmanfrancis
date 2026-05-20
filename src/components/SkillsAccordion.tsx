"use client";

import { useState } from "react";

type SkillCategory = {
  category: string;
  skills: string[];
};

type SkillsAccordionProps = {
  coreSkills: SkillCategory[];
};

export default function SkillsAccordion({ coreSkills }: SkillsAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item expanded by default

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3.5">
      {coreSkills.map((category, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={category.category}
            className={`border rounded-md overflow-hidden transition-all duration-300 ${
              isOpen
                ? "border-gray-100 bg-white"
                : "border-gray-200 bg-zinc-50/40 hover:border-zinc-200 hover:bg-white"
            }`}
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full px-6 py-4.5 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="text-[11px] font-black uppercase tracking-widest text-zinc-900 group-hover:text-zinc-600 transition-colors">
                {category.category}
              </span>
              <div className="h-6 w-6 rounded-full bg-zinc-50 flex items-center justify-center transition-colors group-hover:bg-zinc-100">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`text-zinc-500 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? "max-h-[400px] border-t border-zinc-100" : "max-h-0"
              }`}
            >
              <ul className="p-6 space-y-3 bg-zinc-50/20">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-3 font-medium"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
