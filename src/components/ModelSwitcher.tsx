import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIModel, ANIMATIONS } from '../types';

interface ModelSwitcherProps {
  models: AIModel[];
  currentModel: string;
  onModelChange: (modelId: string) => void;
}

const ModelSwitcher: React.FC<ModelSwitcherProps> = ({
  models,
  currentModel,
  onModelChange
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);

  const currentModelData = models.find(model => model.id === currentModel) || models[0];

  const handleModelSelect = (model: AIModel) => {
    setSelectedModel(model);
    onModelChange(model.id);
    setExpanded(false);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, model: AIModel) => {
    e.dataTransfer.setData('text/plain', model.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const modelId = e.dataTransfer.getData('text/plain');
    const model = models.find(m => m.id === modelId);
    if (model) {
      handleModelSelect(model);
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Current Model Display */}
      <motion.div
        onClick={toggleExpand}
        whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(0,0,0,0.3)' }}
        whileTap={{ scale: 0.98 }}
        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
          expanded 
            ? 'border-purple-400 bg-gradient-to-r from-purple-600/20 to-pink-600/20' 
            : 'border-white/10 bg-white/5 hover:bg-white/10'
        }`}
      >
        <div className="flex items-center gap-4">
          <motion.span
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            className="text-3xl"
          >
            {currentModelData.icon}
          </motion.span>
          <div className="flex-1">
            <h3 className="font-semibold text-white">{currentModelData.name}</h3>
            <p className="text-sm text-gray-400 truncate">{currentModelData.description}</p>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-400"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Model List */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {models.map((model, index) => (
                <motion.div
                  key={model.id}
                  variants={ANIMATIONS.message}
                  initial="initial"
                  animate="animate"
                  custom={index}
                  transition={{ delay: index * 0.1 }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, model)}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => handleModelSelect(model)}
                  whileHover={{ 
                    scale: 1.02, 
                    x: 5,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)' 
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 rounded-xl border transition-all cursor-grab active:cursor-grabbing ${
                    currentModel === model.id
                      ? 'border-purple-400 bg-purple-600/10 ring-2 ring-purple-400/50'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{model.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white truncate">{model.name}</h4>
                      <p className="text-xs text-gray-400 truncate">{model.description}</p>
                    </div>
                    <div className="flex gap-1">
                      {model.capabilities.slice(0, 2).map((cap, capIndex) => (
                        <span 
                          key={capIndex}
                          className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                    {/* Performance Indicator */}
                    <div className={`w-3 h-3 rounded-full ${
                      model.performance === 'high' || model.performance === 'maximum' 
                        ? 'bg-gradient-to-r from-orange-400 to-red-400'
                        : model.performance === 'medium'
                          ? 'bg-blue-400'
                          : 'bg-green-400'
                    }`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drag Instruction */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.3 }}
            className="text-xs text-gray-500 text-center italic"
          >
            Tarik dan lepas model untuk mengganti
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-3 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
      >
        <div className="text-xs text-gray-400 mb-2">Model Stats</div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-white">Performance</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            currentModelData.performance === 'high' || currentModelData.performance === 'maximum'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
              : currentModelData.performance === 'medium'
                ? 'bg-blue-500/20 text-blue-400'
                : 'bg-green-500/20 text-green-400'
          }`}>
            {currentModelData.performance.toUpperCase()}
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-1 mt-2">
          <motion.div
            className="bg-gradient-to-r from-purple-400 to-pink-400 h-1 rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: currentModelData.performance === 'maximum' ? '100%' :
                      currentModelData.performance === 'high' ? '75%' :
                      currentModelData.performance === 'medium' ? '50%' : '25%'
            }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ModelSwitcher;
