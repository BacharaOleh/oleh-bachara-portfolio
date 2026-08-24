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
  const [currentText, setCurrentText] = useState(roles[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const targetRole = roles[roleIdx % roles.length];
    const typingSpeed = isDeleting ? 35 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setCurrentText(targetRole.slice(0, currentText.length + 1));
        if (currentText === targetRole) {
          // Pause at end of text
          setTimeout(() => setIsDeleting(true), 2400);
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
  }, [currentText, isDeleting, roleIdx, roles, mounted]);

  return (
    <div className="min-h-[38px] flex items-center">
      <span className="inline-flex items-center gap-1.5 font-mono text-indigo-300 font-semibold text-xs sm:text-sm bg-indigo-500/10 border border-indigo-500/25 px-3 py-1.5 rounded-lg shadow-inner">
        <span>{currentText || roles[0]}</span>
        <span className="w-1.5 h-3.5 bg-cyan-400 animate-pulse rounded-sm inline-block shrink-0" aria-hidden="true" />
      </span>
    </div>
  );
}
