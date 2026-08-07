"use client";

import { useRef, useState, useCallback, type MouseEvent } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  scale?: number;
  spotlightColor?: string;
}

export function TiltCard({
  children,
  className = "",
  tiltMaxAngleX = 12,
  tiltMaxAngleY = 12,
  scale = 1.02,
  spotlightColor = "rgba(99, 102, 241, 0.15)",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles relative to center
      const rotY = ((x - centerX) / centerX) * tiltMaxAngleY;
      const rotX = -((y - centerY) / centerY) * tiltMaxAngleX;

      setRotateX(rotX);
      setRotateY(rotY);
      setSpotlightPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    },
    [tiltMaxAngleX, tiltMaxAngleY]
  );

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="perspective-1000"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? scale : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.5,
        }}
        style={{ transformStyle: "preserve-3d" }}
        className={`relative overflow-hidden ${className}`}
      >
        {/* Spotlight Follower */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${spotlightColor}, transparent 70%)`,
          }}
        />

        {/* 3D Glass Surface Shine */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-20 h-full">{children}</div>
      </motion.div>
    </div>
  );
}
