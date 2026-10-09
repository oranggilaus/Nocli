import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContextWindow, ANIMATIONS } from '../types';

interface ContextWindowManagerProps {
  windows: ContextWindow[];
  onClose: (id: string) => void;
  onDrag: (id: string, position: { x: number; y: number }) => void;
}

const ContextWindow: React.FC<{
  window: ContextWindow;
  onClose: (id: string) => void;
  onDrag: (id: string, position: { x: number; y: number }) => void;
}> = ({ window, onClose, onDrag }) => {
  const handleDragEnd = (e: any, info: any) => {
    if (info.point) {
      onDrag(window.id, {
        x: info.point.x,
        y: info.point.y
      });
    }
  };

  return (
    <motion.div
      layout
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.02, zIndex: 50 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={ANIMATIONS.contextWindow.transition}
      className="relative bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4 cursor-grab active:cursor-grabbing shadow-lg"
      style={{
        position: 'absolute',
        x: window.position.x,
        y: window.position.y,
        zIndex: window.isActive ? 10 : 1
      }}
    >
      {/* Window Header */}
      <div className="flex items-center justify-between mb-3">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <span className="text-lg">📄</span>
          <h4 className="font-medium text-white">{window.title}</h4>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            onClose(window.id);
          }}
          className="p-1 rounded-full hover:bg-red-500/20 transition-colors"
        >
          <span className="text-red-400 text-sm">×</span>
        </motion.button>
      </div>

      {/* Window Content */}
      <div className="text-sm text-gray-300 leading-relaxed max-h-40 overflow-auto custom-scrollbar">
        {window.content}
      </div>

      {/* Resize Handle */}
      <div className="absolute bottom-2 right-2 w-4 h-4 bg-white/10 rounded-full cursor-se-resize hover:bg-white/20 transition-colors" />

      {/* Active Indicator */}
      {window.isActive && (
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-t-xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  );
};

const ContextWindowManager: React.FC<ContextWindowManagerProps> = ({
  windows,
  onClose,
  onDrag
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="relative flex-1 min-h-[200px] bg-white/5 rounded-xl overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
                            linear-gradient(-45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
                            linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.05) 75%),
                            linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.05) 75%)`,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Windows Container */}
      <div className="relative w-full h-full p-4">
        <AnimatePresence mode="popLayout">
          {windows.map((window) => (
            <ContextWindow
              key={window.id}
              window={window}
              onClose={onClose}
              onDrag={onDrag}
            />
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {windows.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center text-center"
          >
            <div className="flex flex-col items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="text-4xl"
              >
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  📊
                </span>
              </motion.div>
              <h3 className="text-lg font-semibold text-white">Tidak ada context window</h3>
              <p className="text-sm text-gray-400 max-w-xs">
                Klik tombol + untuk menambahkan context window baru yang dapat Anda seret dan atur posisinya
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Clear all windows
            windows.forEach(window => onClose(window.id));
          }}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 text-sm transition-colors"
        >
          <span>🗑️</span>
          <span>Hapus Semua</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Arrange windows in grid
            windows.forEach((window, index) => {
              const row = Math.floor(index / 2);
              const col = index % 2;
              onDrag(window.id, {
                x: col * 200,
                y: row * 150
              });
            });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-purple-400 text-sm transition-colors"
        >
          <span>📊</span>
          <span>Atur Grid</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ContextWindowManager;
