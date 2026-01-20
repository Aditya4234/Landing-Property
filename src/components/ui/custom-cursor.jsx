"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
      setIsVisible(true);
    };

    const mouseLeave = () => {
      setIsVisible(false);
    };

    const mouseEnter = () => {
      setIsVisible(true);
    };

    // Add event listeners
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseleave", mouseLeave);
    document.addEventListener("mouseenter", mouseEnter);

    // Add hover effects for different elements
    const handleMouseEnter = (e) => {
      const target = e.target;

      if (target.closest('button, a, [role="button"]')) {
        setCursorVariant("button");
      } else if (target.closest('input, textarea, select')) {
        setCursorVariant("input");
      } else if (target.closest('[data-cursor="text"]')) {
        setCursorVariant("text");
      } else if (target.closest('.property-card, .feature-card, .testimonial-card')) {
        setCursorVariant("card");
      } else {
        setCursorVariant("default");
      }
    };

    const handleMouseLeave = () => {
      setCursorVariant("default");
    };

    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseleave", mouseLeave);
      document.removeEventListener("mouseenter", mouseEnter);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: "rgba(197, 160, 89, 0.1)",
      borderColor: "rgba(197, 160, 89, 0.5)"
    },
    button: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5,
      backgroundColor: "rgba(197, 160, 89, 0.2)",
      borderColor: "rgba(197, 160, 89, 0.8)"
    },
    input: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.2,
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      borderColor: "rgba(59, 130, 246, 0.6)"
    },
    text: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.3,
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      borderColor: "rgba(16, 185, 129, 0.6)"
    },
    card: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.8,
      backgroundColor: "rgba(139, 69, 19, 0.1)",
      borderColor: "rgba(139, 69, 19, 0.7)"
    }
  };

  return (
    <>
      {/* Hide default cursor on larger screens */}
      <style jsx global>{`
        @media (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-[9999] hidden md:block"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-accent rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
          scale: cursorVariant === "default" ? 1 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 30
        }}
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}