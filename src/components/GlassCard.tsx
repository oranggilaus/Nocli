"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  blurLevel?: "sm" | "md" | "lg" | "xl";
  borderGlow?: boolean;
  hoverEffect?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, blurLevel = "lg", borderGlow = false, hoverEffect = true, ...props }, ref) => {
    const blurClasses = {
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-md",
      lg: "backdrop-blur-lg",
      xl: "backdrop-blur-xl",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-3xl",
          "bg-white/5 border border-white/10",
          blurClasses[blurLevel],
          hoverEffect && "transition-all duration-300",
          className
        )}
        whileHover={hoverEffect ? { 
          scale: 1.02,
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
        } : {}}
        {...props}
      >
        {borderGlow && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute -inset-px bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 rounded-3xl" />
          </motion.div>
        )}
        
        {/* Content */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
