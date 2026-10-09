"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FloatingDockProps {
  children: React.ReactNode;
  className?: string;
}

const FloatingDock = React.forwardRef<HTMLDivElement, FloatingDockProps>(
  ({ children, className }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "fixed bottom-6 left-1/2 transform -translate-x-1/2",
          "flex gap-4 p-2 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10",
          "shadow-2xl",
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        {children}
      </motion.div>
    );
  }
);

FloatingDock.displayName = "FloatingDock";

export interface DockItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  tooltip?: string;
}

const DockItem = React.forwardRef<HTMLButtonElement, DockItemProps>(
  ({ children, onClick, className, tooltip }, ref) => {
    return (
      <motion.button
        ref={ref}
        onClick={onClick}
        className={cn(
          "relative flex flex-col items-center gap-1 p-2 rounded-xl",
          "hover:bg-white/10 transition-colors",
          className
        )}
        whileHover={{ y: -5, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {children}
        {tooltip && (
          <motion.span
            className="absolute -top-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="px-2 py-1 text-xs bg-black/80 backdrop-blur-lg rounded-lg text-white whitespace-nowrap">
              {tooltip}
            </span>
          </motion.span>
        )}
      </motion.button>
    );
  }
);

DockItem.displayName = "DockItem";

export { FloatingDock, DockItem };
