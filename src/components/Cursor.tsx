"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 22, stiffness: 280, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on desktop devices with a fine pointer
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", onMove);

    const interactables = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, label"
    );
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full border border-slate-400/30 hidden lg:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 40 : 28,
          height: isHovering ? 40 : 28,
          borderColor: isHovering ? "rgba(37,99,235,0.4)" : "rgba(15,23,42,0.2)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 6 : 5,
          height: isHovering ? 6 : 5,
          backgroundColor: isHovering ? "#2563eb" : "#0f172a",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
