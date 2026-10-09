import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ChatMessage, AIMode, ANIMATIONS } from '../types';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSend: (message: string) => void;
  isLoading: boolean;
  currentModel: string;
  currentMode: AIMode;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSend,
  isLoading,
  currentModel,
  currentMode
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSend(inputValue);
      setInputValue('');
      setIsTyping(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e as any);
    }
  };

  const getModeColor = () => {
    const modeColors: Record<AIMode, string> = {
      default: 'bg-blue-500/20 text-blue-400',
      low: 'bg-green-500/20 text-green-400',
      lowfast: 'bg-purple-500/20 text-purple-400',
      max: 'bg-orange-500/20 text-orange-400',
      supermax: 'bg-red-500/20 text-red-400'
    };
    return modeColors[currentMode] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Messages Container */}
      <div className="flex-1 overflow-auto pr-4 custom-scrollbar">
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
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="text-6xl mb-4"
              >
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  🤖
                </span>
              </motion.div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                Selamat Datang di Nocli AI
              </h1>
              <p className="text-gray-400 max-w-md">
                Alat AI dengan provider sendiri. Mulai chat dengan AI untuk mendapatkan bantuan!
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mt-6 p-4 bg-white/5 backdrop-blur-lg rounded-lg border border-white/10"
              >
                <p className="text-sm text-gray-300">
                  <strong>Mode saat ini:</strong> {currentMode.toUpperCase()}
                </p>
                <p className="text-sm text-gray-300">
                  <strong>Model:</strong> {currentModel}
                </p>
              </motion.div>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={message.id}
                custom={index}
                variants={ANIMATIONS.message}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-6 py-4 relative ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                      : 'bg-white/5 backdrop-blur-lg border border-white/10'
                  }`}
                >
                  {/* Message Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">
                      {message.sender === 'user' ? '👤 User' : '🤖 AI'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {message.timestamp.toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    {message.sender === 'ai' && (
                      <>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getModeColor()}`}>
                          {message.mode?.toUpperCase()}
                        </span>
                        {message.model && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                            {message.model}
                          </span>
                        )}
                        {message.tokens && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                            {message.tokens} tokens
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="text-sm leading-relaxed">
                    <ReactMarkdown>
                      {message.content}
                    </ReactMarkdown>
                  </div>

                  {/* Decorative Elements */}
                  {message.sender === 'user' && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-500 rounded-full opacity-50" />
                  )}
                  {message.sender === 'ai' && (
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-50" />
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
        
        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-start mb-4"
          >
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4 max-w-[80%]">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex gap-1"
                >
                  <span className="text-purple-400">●</span>
                  <span className="text-pink-400">●</span>
                  <span className="text-blue-400">●</span>
                </motion.div>
                <span className="text-sm text-gray-300">AI sedang memproses...</span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex gap-4 items-end bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10"
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={isLoading ? "Tunggu sebentar..." : "Ketik pesan Anda di sini..."}
          disabled={isLoading}
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-sm resize-none max-h-32 overflow-auto custom-scrollbar"
        />
        
        <motion.button
          type="submit"
          disabled={!isTyping || isLoading}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-3 rounded-xl transition-colors ${
            isTyping && !isLoading
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
              : 'bg-gray-600 cursor-not-allowed'
          }`}
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
            className="text-white"
          >
            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
          </motion.svg>
        </motion.button>
      </motion.form>
    </div>
  );
};

export default ChatInterface;
