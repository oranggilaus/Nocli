import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIMode, MODE_CONFIG, ANIMATIONS } from '../types';

interface ModeSelectorProps {
  currentMode: AIMode;
  onModeChange: (mode: AIMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  const modes: AIMode[] = ['default', 'low', 'lowfast', 'max', 'supermax'];
  const [dragPosition, setDragPosition] = React.useState<number | null>(null);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleDragStart = (mode: AIMode) => {
    setIsDragging(true);
    setDragPosition(modes.indexOf(mode));
  };

  const handleDragEnd = (mode: AIMode) => {
    setIsDragging(false);
    setDragPosition(null);
    if (dragPosition !== null) {
      onModeChange(mode);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, modeIndex: number) => {
    e.preventDefault();
    if (isDragging && dragPosition !== null) {
      // Visual feedback - could implement reordering here
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, mode: AIMode) => {
    e.preventDefault();
    if (isDragging) {
      onModeChange(mode);
      setIsDragging(false);
      setDragPosition(null);
    }
  };

  // Calculate position for drag animation
  const getPosition = (index: number) => {
    if (dragPosition === null) return 0;
    if (dragPosition === index) return 5;
    return 0;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-purple-400">Mode AI</h3>
        <motion.span
          whileHover={{ scale: 1.1 }}
          className="text-xs text-gray-400"
        >
          Tarik untuk ganti mode
        </motion.span>
      </div>

      <div 
        ref={containerRef}
        className="relative flex gap-3 overflow-hidden"
      >
        {/* Background Track */}
        <div className="absolute inset-0 h-full bg-white/5 rounded-2xl opacity-50" />
        
        {/* Active Mode Indicator */}
        <motion.div
          className="absolute h-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            x: modes.indexOf(currentMode) * 100 + modes.indexOf(currentMode) * 12
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            width: 'calc(100% - 12px * 4)',
            left: modes.indexOf(currentMode) * 12
          }}
        />

        {modes.map((mode, index) => {
          const config = MODE_CONFIG[mode];
          const isActive = currentMode === mode;
          const position = getPosition(index);

          return (
            <motion.div
              key={mode}
              draggable
              onDragStart={() => handleDragStart(mode)}
              onDragEnd={() => handleDragEnd(mode)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, mode)}
              onClick={() => onModeChange(mode)}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                zIndex: 20
              }}
              whileTap={{ scale: 0.95 }}
              whileDrag={{ 
                scale: 1.1, 
                zIndex: 50,
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
              }}
              animate={{ 
                x: position,
                scale: isActive ? 1.05 : 1
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`
                relative z-10 flex-1 flex flex-col items-center justify-center 
                p-4 rounded-2xl border-2 cursor-grab active:cursor-grabbing
                transition-all duration-200
                ${
                  isActive 
                    ? 'border-transparent bg-gradient-to-b from-purple-600/20 to-pink-600/20 ring-2 ring-purple-400/50'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }
              `}
              style={{
                background: isActive 
                  ? `linear-gradient(135deg, ${config.color}33 0%, ${config.color}22 100%)`
                  : ''
              }}
            >
              {/* Mode Icon */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="text-3xl mb-2"
              >
                {config.icon}
              </motion.div>

              {/* Mode Label */}
              <span className="text-sm font-medium text-white">
                {config.label}
              </span>

              {/* Mode Stats */}
              <div className="mt-2 flex gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-gray-300">
                  {config.speed}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-gray-300">
                  {config.accuracy}
                </span>
              </div>

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeMode"
                  className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {/* Drag Handle */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white/30 rounded-full" />
            </motion.div>
          );
        })}
      </div>

      {/* Mode Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-4 p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
        >
          <div className="flex items-start gap-4">
            <div className="text-2xl">{MODE_CONFIG[currentMode].icon}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-white mb-1">{MODE_CONFIG[currentMode].label} Mode</h4>
              <p className="text-sm text-gray-400 mb-3">
                {MODE_CONFIG[currentMode].speed} Speed • {MODE_CONFIG[currentMode].accuracy} Accuracy • {MODE_CONFIG[currentMode].resource} Resource
              </p>
              <div className="w-full space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Speed</span>
                  <span className="text-white">{MODE_CONFIG[currentMode].speed}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1">
                  <motion.div
                    className="bg-gradient-to-r from-purple-400 to-pink-400 h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: MODE_CONFIG[currentMode].speed === 'High' ? '100%' :
                              MODE_CONFIG[currentMode].speed === 'Medium-High' ? '80%' :
                              MODE_CONFIG[currentMode].speed === 'Medium' ? '60%' :
                              MODE_CONFIG[currentMode].speed === 'Low' ? '30%' : '20%'
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="text-white">{MODE_CONFIG[currentMode].accuracy}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1">
                  <motion.div
                    className="bg-gradient-to-r from-blue-400 to-cyan-400 h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: MODE_CONFIG[currentMode].accuracy === 'Maximum' ? '100%' :
                              MODE_CONFIG[currentMode].accuracy === 'Very High' ? '90%' :
                              MODE_CONFIG[currentMode].accuracy === 'High' ? '75%' :
                              MODE_CONFIG[currentMode].accuracy === 'Medium-Low' ? '40%' : '60%'
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Resource</span>
                  <span className="text-white">{MODE_CONFIG[currentMode].resource}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1">
                  <motion.div
                    className="bg-gradient-to-r from-orange-400 to-red-400 h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: MODE_CONFIG[currentMode].resource === 'Maximum' ? '100%' :
                              MODE_CONFIG[currentMode].resource === 'High' ? '75%' :
                              MODE_CONFIG[currentMode].resource === 'Medium' ? '50%' : '25%'
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ModeSelector;
