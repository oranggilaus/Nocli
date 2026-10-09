"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  gradientColor?: string;
  glowColor?: string;
}

const MagicCard = React.forwardRef<HTMLDivElement, MagicCardProps>(
  ({ children, className, gradientColor = "from-purple-600 to-pink-600", glowColor = "purple" }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-lg border border-white/10",
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-10`} />
        
        {/* Glow Effect */}
        <motion.div
          className={`absolute inset-0 pointer-events-none`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div 
            className={`absolute -inset-20 bg-gradient-to-br ${gradientColor} rounded-3xl opacity-20 blur-3xl`}
          />
        </motion.div>
        
        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

MagicCard.displayName = "MagicCard";

export { MagicCard };
