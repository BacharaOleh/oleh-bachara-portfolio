"use client";

import { useRef } from "react";
import { useInView as useFramerInView } from "framer-motion";

export function useInView(options?: { threshold?: number; once?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(ref, {
    amount: options?.threshold ?? 0.15,
    once: options?.once ?? true,
  });
  return { ref, isInView };
}
