import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatInterface from './components/ChatInterface';
import ModelSwitcher from './components/ModelSwitcher';
import ModeSelector from './components/ModeSelector';
import ContextWindowManager from './components/ContextWindowManager';
import { AIMode, ChatMessage, ContextWindow, DEFAULT_MODELS, AIModel } from './types';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState<AIMode>('default');
  const [currentModel, setCurrentModel] = useState<string>('nocli-standard');
  const [contextWindows, setContextWindows] = useState<ContextWindow[]>([]);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);

  const handleSend = useCallback((message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
      model: currentModel,
      mode: currentMode
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: uuidv4(),
        content: `Ini adalah respons dari Nocli AI menggunakan model ${currentModel} dengan mode ${currentMode}. Saya memahami pertanyaan Anda dan siap membantu!`,
        sender: 'ai',
        timestamp: new Date(),
        model: currentModel,
        mode: currentMode,
        tokens: Math.floor(Math.random() * 100) + 50
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  }, [currentModel, currentMode]);

  const handleModelChange = useCallback((modelId: string) => {
    setCurrentModel(modelId);
    const model = DEFAULT_MODELS.find(m => m.id === modelId);
    setSelectedModel(model || null);
  }, []);

  const handleModeChange = useCallback((mode: AIMode) => {
    setCurrentMode(mode);
  }, []);

  const addContextWindow = useCallback(() => {
    const newWindow: ContextWindow = {
      id: uuidv4(),
      title: `Context ${contextWindows.length + 1}`,
      content: `Ini adalah context window ${contextWindows.length + 1}. Anda dapat menarik dan meletakkan window ini.`,
      isActive: true,
      position: { x: 100 + contextWindows.length * 50, y: 100 + contextWindows.length * 50 }
    };
    setContextWindows(prev => [...prev, newWindow]);
  }, [contextWindows.length]);

  const closeContextWindow = useCallback((id: string) => {
    setContextWindows(prev => prev.filter(window => window.id !== id));
  }, []);

  const updateContextPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setContextWindows(prev => 
      prev.map(window => 
        window.id === id ? { ...window, position } : window
      )
    );
  }, []);

  const getCurrentModel = useCallback(() => {
    return DEFAULT_MODELS.find(model => model.id === currentModel) || DEFAULT_MODELS[0];
  }, [currentModel]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 40% 40%, rgba(120, 200, 255, 0.3) 0%, transparent 50%)`
        }} />
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-lg border-b border-white/10"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold"
            >
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                NOCLI
              </span>
            </motion.div>
            <span className="text-sm text-gray-400">AI with Custom Provider</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Current Mode Badge */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-${currentMode}-500 to-${currentMode}-600`}
              style={{
                background: `linear-gradient(135deg, ${getCurrentModel().performance === 'high' || getCurrentModel().performance === 'maximum' ? '#8b5cf6' : '#10b981'} 0%, ${getCurrentModel().performance === 'high' || getCurrentModel().performance === 'maximum' ? '#ec4899' : '#3b82f6'} 100%)`
              }}
            >
              Mode: {currentMode.toUpperCase()}
            </motion.div>
            
            {/* Current Model Badge */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm"
            >
              Model: {getCurrentModel().name}
            </motion.div>
          </div>
        </motion.header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - Model Switcher */}
          <motion.aside 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-64 bg-black/20 backdrop-blur-lg border-r border-white/10 p-4 flex flex-col"
          >
            <h2 className="text-lg font-semibold mb-4 text-purple-400">Model AI</h2>
            <ModelSwitcher 
              models={DEFAULT_MODELS} 
              currentModel={currentModel} 
              onModelChange={handleModelChange}
            />
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Chat Interface */}
            <div className="flex-1 overflow-auto p-4">
              <ChatInterface 
                messages={messages} 
                onSend={handleSend} 
                isLoading={isLoading} 
                currentModel={currentModel}
                currentMode={currentMode}
              />
            </div>

            {/* Mode Selector */}
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="p-4 bg-black/20 backdrop-blur-lg border-t border-white/10"
            >
              <ModeSelector 
                currentMode={currentMode} 
                onModeChange={handleModeChange}
              />
            </motion.div>
          </main>

          {/* Context Windows Sidebar */}
          <motion.aside 
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-80 bg-black/20 backdrop-blur-lg border-l border-white/10 p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-purple-400">Context Windows</h2>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={addContextWindow}
                className="p-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                <span className="text-white">+</span>
              </motion.button>
            </div>
            
            <ContextWindowManager
              windows={contextWindows}
              onClose={closeContextWindow}
              onDrag={updateContextPosition}
            />
          </motion.aside>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.2, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        onClick={addContextWindow}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-lg hover:shadow-purple-500/50 transition-shadow"
      >
        +
      </motion.button>
    </div>
  );
};

export default App;
