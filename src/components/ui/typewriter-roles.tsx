"use client";

import { useEffect, useState } from "react";
import { type Lang } from "@/data/portfolio-data";

interface TypewriterRolesProps {
  lang: Lang;
}

export function TypewriterRoles({ lang }: TypewriterRolesProps) {
  const roles = lang === "pl"
    ? [
        "Web Developer & Architekt Stron",
        "Specjalista Technical Marketing",
        "Inżynier PHP & WordPress",
        "Magister Zarządzania & Inż. Informatyki",
      ]
    : [
        "Web Developer & Systems Architect",
        "Technical Marketing Specialist",
        "PHP & WordPress Engineer",
        "M.Sc. Management & B.Sc. CompSci",
      ];

  const [roleIdx, setRoleIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetRole = roles[roleIdx % roles.length];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setCurrentText(targetRole.slice(0, currentText.length + 1));
        if (currentText === targetRole) {
          // Pause at end of text
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        // Deleting backward
        setCurrentText(targetRole.slice(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setRoleIdx((prev) => prev + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, roleIdx, roles]);

  return (
    <span className="inline-flex items-center gap-1 font-mono text-indigo-400 font-semibold text-sm sm:text-base bg-indigo-500/10 border border-indigo-500/25 px-3 py-1 rounded-lg shadow-inner">
      <span>{currentText}</span>
      <span className="w-2 h-4 bg-cyan-400 animate-pulse rounded-sm inline-block" />
    </span>
  );
}
