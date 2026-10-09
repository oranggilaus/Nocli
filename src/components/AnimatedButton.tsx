"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AnimatedButtonProps extends ButtonProps {
  shimmerEffect?: boolean;
  glowEffect?: boolean;
  floatEffect?: boolean;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, shimmerEffect = false, glowEffect = false, floatEffect = false, ...props }, ref) => {
    return (
      <motion.div
        className="relative inline-flex"
        whileHover={floatEffect ? { y: -2 } : {}}
        whileTap={floatEffect ? { y: 0 } : {}}
      >
        {glowEffect && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.2 }}
          />
        )}
        
        {shimmerEffect && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        <Button
          ref={ref}
          className={cn(
            "relative z-10",
            className
          )}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };
