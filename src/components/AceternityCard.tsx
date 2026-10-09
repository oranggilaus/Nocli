"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AceternityCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
}

const AceternityCard = React.forwardRef<HTMLDivElement, AceternityCardProps>(
  ({ children, className, hoverEffect = true, glowEffect = true }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-3xl bg-black/20 backdrop-blur-lg border border-white/10",
          className
        )}
        whileHover={hoverEffect ? { 
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(139, 92, 246, 0.2)"
        } : {}}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {glowEffect && (
          <>
            {/* Glow Background */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.05, 0.15, 0.05] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute -inset-40 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-4xl opacity-20 blur-3xl" />
            </motion.div>
            
            {/* Floating Particles */}
            <motion.div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-white/20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </>
        )}
        
        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

AceternityCard.displayName = "AceternityCard";

export { AceternityCard };
