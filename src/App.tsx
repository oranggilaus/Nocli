"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "./components/GlassCard";
import { MagicCard } from "./components/MagicCard";
import { FloatingDock, DockItem } from "./components/FloatingDock";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { ScrollArea } from "./components/ui/scroll-area";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip";
import { AIMode, ChatMessage, ContextWindow, DEFAULT_MODELS, AIModel, MODE_CONFIG } from "./types";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState<AIMode>("default");
  const [currentModel, setCurrentModel] = useState<string>("nocli-standard");
  const [contextWindows, setContextWindows] = useState<ContextWindow[]>([]);
  const [inputValue, setInputValue] = useState("");

  const getCurrentModel = useCallback(() => {
    return DEFAULT_MODELS.find(model => model.id === currentModel) || DEFAULT_MODELS[0];
  }, [currentModel]);

  const handleSend = useCallback((message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      content: message,
      sender: "user",
      timestamp: new Date(),
      model: currentModel,
      mode: currentMode
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: uuidv4(),
        content: `Ini adalah respons canggih dari **Nocli AI** menggunakan model *${getCurrentModel().name}* dengan mode **${currentMode.toUpperCase()}**. \n\nSaya memahami konteks percakapan Anda dan siap membantu dengan berbagai fitur AI yang powerful! 🚀`,
        sender: "ai",
        timestamp: new Date(),
        model: currentModel,
        mode: currentMode,
        tokens: Math.floor(Math.random() * 200) + 50
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  }, [currentModel, currentMode, getCurrentModel]);

  const handleModelChange = useCallback((modelId: string) => {
    setCurrentModel(modelId);
  }, []);

  const handleModeChange = useCallback((mode: AIMode) => {
    setCurrentMode(mode);
  }, []);

  const addContextWindow = useCallback(() => {
    const newWindow: ContextWindow = {
      id: uuidv4(),
      title: `Context ${contextWindows.length + 1}`,
      content: `Ini adalah context window ${contextWindows.length + 1}. Seret untuk memindahkan!`,
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

  const modeConfig = MODE_CONFIG[currentMode];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="fixed inset-0 opacity-30">
          <div 
            className="absolute inset-0 bg-nocli-pattern"
            style={{
              backgroundSize: "100px 100px"
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col h-screen">
          {/* Header */}
          <motion.header 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex items-center justify-between p-6 bg-black/20 backdrop-blur-xl border-b border-white/10"
          >
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-xl font-bold">
                  N
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                  NOCLI AI
                </span>
              </motion.div>
              <Badge variant={currentMode} className="text-xs font-medium">
                {currentMode.toUpperCase()} Mode
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
                  >
                    <span className="text-sm font-medium">{getCurrentModel().name}</span>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <div>
                    <p className="font-semibold">{getCurrentModel().name}</p>
                    <p className="text-sm text-muted-foreground">{getCurrentModel().description}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </motion.header>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <motion.aside 
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-72 bg-black/20 backdrop-blur-xl border-r border-white/10 p-4 flex flex-col"
            >
              <h2 className="text-lg font-semibold mb-4 text-purple-400">Model AI</h2>
              <div className="flex flex-col gap-3">
                {DEFAULT_MODELS.map((model, index) => {
                  const isActive = currentModel === model.id;
                  return (
                    <motion.div
                      key={model.id}
                      onClick={() => handleModelChange(model.id)}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      animate={{ 
                        scale: isActive ? 1.02 : 1,
                        boxShadow: isActive ? "0 8px 25px rgba(139, 92, 246, 0.3)" : "none"
                      }}
                      className={cn(
                        "p-3 rounded-xl border-2 transition-all cursor-pointer",
                        isActive 
                          ? "border-purple-500 bg-gradient-to-r from-purple-600/20 to-pink-600/20 ring-2 ring-purple-500/30"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                            {model.icon}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white truncate">{model.name}</h4>
                          <p className="text-xs text-muted-foreground truncate">{model.description}</p>
                        </div>
                        <Badge variant={model.performance} className="text-xs">
                          {model.performance}
                        </Badge>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
              {/* Chat Area */}
              <ScrollArea className="flex-1 p-6">
                <div className="flex flex-col gap-6">
                  <AnimatePresence mode="wait">
                    {messages.length === 0 ? (
                      <motion.div
                        key="welcome"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-center h-full text-center"
                      >
                        <MagicCard className="p-8">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="flex flex-col items-center gap-6"
                          >
                            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-4xl">
                              🤖
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                              Selamat Datang di Nocli AI
                            </h1>
                            <p className="text-muted-foreground max-w-md">
                              Alat AI dengan provider sendiri. Mulai percakapan dengan AI untuk mendapatkan bantuan canggih!
                            </p>
                            <Button 
                              onClick={() => handleSend("Halo!")}
                              className="mt-4"
                            >
                              Coba Sekarang
                            </Button>
                          </motion.div>
                        </MagicCard>
                      </motion.div>
                    ) : (
                      messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, x: message.sender === 'user' ? 100 : -100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: message.sender === 'user' ? 100 : -100 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <GlassCard 
                            className={`max-w-[70%] ${message.sender === 'user' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-white/5'}`}
                            blurLevel="lg"
                          >
                            <CardHeader className="p-4 pb-2">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback className={cn(
                                    message.sender === 'user' ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-white/10',
                                    'text-white'
                                  )}>
                                    {message.sender === 'user' ? '👤' : '🤖'}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-sm">
                                    {message.sender === 'user' ? 'Anda' : 'Nocli AI'}
                                  </CardTitle>
                                  <CardDescription className="text-xs">
                                    {message.timestamp.toLocaleTimeString('id-ID', {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </CardDescription>
                                </div>
                                {message.sender === 'ai' && (
                                  <div className="flex gap-1 ml-auto">
                                    <Badge variant={message.mode || 'default'} className="text-xs">
                                      {message.mode?.toUpperCase()}
                                    </Badge>
                                    {message.tokens && (
                                      <Badge variant="green" className="text-xs">
                                        {message.tokens} tokens
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-2">
                              <div className="text-sm leading-relaxed markdown-content">
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                              </div>
                            </CardContent>
                          </GlassCard>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex justify-start"
                    >
                      <GlassCard className="max-w-[70%]">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <motion.div
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                              className="flex gap-1"
                            >
                              <span className="w-2 h-2 rounded-full bg-purple-500" />
                              <span className="w-2 h-2 rounded-full bg-pink-500" />
                              <span className="w-2 h-2 rounded-full bg-blue-500" />
                            </motion.div>
                            <span className="text-sm text-muted-foreground">AI sedang memproses...</span>
                          </div>
                        </CardContent>
                      </GlassCard>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6"
              >
                <GlassCard className="border-0" blurLevel="lg">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (inputValue.trim() && !isLoading) {
                        handleSend(inputValue);
                      }
                    }}
                    className="flex gap-4 items-end p-2"
                  >
                    <Input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={isLoading ? "Tunggu sebentar..." : "Ketik pesan Anda di sini..."}
                      disabled={isLoading}
                      className="flex-1 text-white placeholder:text-muted-foreground"
                    />
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button 
                        type="submit"
                        disabled={!inputValue.trim() || isLoading}
                        className="h-10 w-10 p-0"
                      >
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          whileHover={{ scale: 1.1 }}
                        >
                          <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
                        </motion.svg>
                      </Button>
                    </motion.div>
                  </form>
                </GlassCard>
              </motion.div>
            </main>

            {/* Context Windows Sidebar */}
            <motion.aside 
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-80 bg-black/20 backdrop-blur-xl border-l border-white/10 p-4 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-purple-400">Context Windows</h2>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={addContextWindow}
                      className="h-8 w-8"
                    >
                      <span className="text-xl">+</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tambah Context Window</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="relative min-h-[200px]">
                  <AnimatePresence mode="popLayout">
                    {contextWindows.map((window) => (
                      <motion.div
                        key={window.id}
                        layout
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.1}
                        onDragEnd={(e, info) => {
                          if (info.point) {
                            updateContextPosition(window.id, {
                              x: info.point.x,
                              y: info.point.y
                            });
                          }
                        }}
                        whileHover={{ scale: 1.02, zIndex: 50 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-3 cursor-grab active:cursor-grabbing shadow-lg"
                        style={{
                          x: window.position.x,
                          y: window.position.y,
                          zIndex: window.isActive ? 10 : 1
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white truncate">{window.title}</span>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              closeContextWindow(window.id);
                            }}
                            className="h-6 w-6"
                          >
                            <span className="text-red-400 text-xs">×</span>
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{window.content}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {contextWindows.length === 0 && (
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
                          className="text-3xl"
                        >
                          📊
                        </motion.div>
                        <p className="text-sm text-muted-foreground">
                          Tidak ada context window
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>
            </motion.aside>
          </div>
        </div>

        {/* Mode Selector */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="p-6 bg-black/20 backdrop-blur-xl border-t border-white/10"
        >
          <h3 className="text-lg font-semibold text-purple-400 mb-4">Pilih Mode AI</h3>
          <div className="relative flex gap-4 overflow-hidden">
            {/* Background Track */}
            <div className="absolute inset-0 h-full bg-white/5 rounded-2xl opacity-50" />
            
            {/* Active Mode Indicator */}
            <motion.div
              className="absolute h-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                x: ['default', 'low', 'lowfast', 'max', 'supermax'].indexOf(currentMode) * 108
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{
                width: 'calc(100% - 24px)',
                left: 6
              }}
            />

            {(['default', 'low', 'lowfast', 'max', 'supermax'] as AIMode[]).map((mode) => {
              const config = MODE_CONFIG[mode];
              const isActive = currentMode === mode;

              return (
                <motion.div
                  key={mode}
                  onClick={() => handleModeChange(mode)}
                  whileHover={{ scale: 1.05, y: -5, zIndex: 20 }}
                  whileTap={{ scale: 0.95 }}
                  whileDrag={{ scale: 1.1, zIndex: 50 }}
                  animate={{ 
                    scale: isActive ? 1.05 : 1
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={cn(
                    "relative z-10 flex-1 flex flex-col items-center justify-center p-4 rounded-2xl",
                    "border-2 transition-all cursor-pointer",
                    isActive 
                      ? "border-transparent bg-gradient-to-b from-purple-600/30 to-pink-600/30 ring-2 ring-purple-500/50"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  )}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl mb-2"
                  >
                    {config.icon}
                  </motion.div>
                  <span className="text-sm font-medium text-white">{config.label}</span>
                  <div className="mt-1 flex gap-1">
                    <Badge variant="purple" className="text-xs px-2 py-0.5">
                      {config.speed}
                    </Badge>
                    <Badge variant="pink" className="text-xs px-2 py-0.5">
                      {config.accuracy}
                    </Badge>
                  </div>
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
                <div className="text-2xl">{modeConfig.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">{modeConfig.label} Mode</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {modeConfig.speed} Speed • {modeConfig.accuracy} Accuracy • {modeConfig.resource} Resource
                  </p>
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Speed</span>
                      <span className="text-white">{modeConfig.speed}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1">
                      <motion.div
                        className="bg-gradient-to-r from-purple-400 to-pink-400 h-1 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: modeConfig.speed === 'High' ? '100%' :
                                  modeConfig.speed === 'Medium-High' ? '80%' :
                                  modeConfig.speed === 'Medium' ? '60%' :
                                  modeConfig.speed === 'Low' ? '30%' : '20%'
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Accuracy</span>
                      <span className="text-white">{modeConfig.accuracy}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1">
                      <motion.div
                        className="bg-gradient-to-r from-blue-400 to-cyan-400 h-1 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: modeConfig.accuracy === 'Maximum' ? '100%' :
                                  modeConfig.accuracy === 'Very High' ? '90%' :
                                  modeConfig.accuracy === 'High' ? '75%' :
                                  modeConfig.accuracy === 'Medium-Low' ? '40%' : '60%'
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Resource</span>
                      <span className="text-white">{modeConfig.resource}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1">
                      <motion.div
                        className="bg-gradient-to-r from-orange-400 to-red-400 h-1 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: modeConfig.resource === 'Maximum' ? '100%' :
                                  modeConfig.resource === 'High' ? '75%' :
                                  modeConfig.resource === 'Medium' ? '50%' : '25%'
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Floating Action Button */}
        <FloatingDock>
          <DockItem tooltip="Tambah Context" onClick={addContextWindow}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-lg">
              +
            </div>
          </DockItem>
          <DockItem tooltip="Model Saat Ini">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500">
                {getCurrentModel().icon}
              </AvatarFallback>
            </Avatar>
          </DockItem>
          <DockItem tooltip="Mode Saat Ini">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              {modeConfig.icon}
            </div>
          </DockItem>
        </FloatingDock>
      </div>
    </TooltipProvider>
  );
};

export default App;
