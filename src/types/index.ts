// AI Mode Types
export type AIMode = 'default' | 'low' | 'lowfast' | 'max' | 'supermax';

// Model Types
export interface AIModel {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  performance: 'low' | 'medium' | 'high' | 'maximum';
  icon: string;
}

// Message Types
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  model?: string;
  mode?: AIMode;
  tokens?: number;
}

// Context Types
export interface ContextWindow {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
  position: { x: number; y: number };
}

// Configuration Types
export interface AppConfig {
  currentMode: AIMode;
  currentModel: string;
  contextWindows: ContextWindow[];
  chatHistory: ChatMessage[];
  isAnimating: boolean;
}

// Animation Types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string;
}

// API Response Types
export interface AIResponse {
  response: string;
  model: string;
  mode: AIMode;
  processingTime: number;
  tokensUsed: number;
}

// Props Types
export interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSend: (message: string) => void;
  isLoading: boolean;
  currentModel: string;
  currentMode: AIMode;
}

export interface ModelSwitcherProps {
  models: AIModel[];
  currentModel: string;
  onModelChange: (modelId: string) => void;
}

export interface ModeSelectorProps {
  modes: AIMode[];
  currentMode: AIMode;
  onModeChange: (mode: AIMode) => void;
}

export interface ContextWindowProps {
  window: ContextWindow;
  onClose: (id: string) => void;
  onDrag: (id: string, position: { x: number; y: number }) => void;
}

// Mode Configuration
export const MODE_CONFIG: Record<AIMode, {
  label: string;
  color: string;
  speed: string;
  accuracy: string;
  resource: string;
  icon: string;
}> = {
  default: {
    label: 'Default',
    color: '#3b82f6',
    speed: 'Medium',
    accuracy: 'High',
    resource: 'Medium',
    icon: '⚡'
  },
  low: {
    label: 'Low',
    color: '#10b981',
    speed: 'Low',
    accuracy: 'Medium',
    resource: 'Low',
    icon: '🐢'
  },
  lowfast: {
    label: 'LowFast',
    color: '#8b5cf6',
    speed: 'High',
    accuracy: 'Medium-Low',
    resource: 'Low',
    icon: '⚡'
  },
  max: {
    label: 'Max',
    color: '#f59e0b',
    speed: 'Medium-High',
    accuracy: 'Very High',
    resource: 'High',
    icon: '🔥'
  },
  supermax: {
    label: 'SuperMax',
    color: '#ef4444',
    speed: 'High',
    accuracy: 'Maximum',
    resource: 'Maximum',
    icon: '🚀'
  }
};

// Default Models
export const DEFAULT_MODELS: AIModel[] = [
  {
    id: 'nocli-standard',
    name: 'Nocli Standard',
    description: 'Model standar untuk sebagian besar tugas',
    capabilities: ['Chat', 'Analysis', 'Coding', 'General Knowledge'],
    performance: 'medium',
    icon: '🤖'
  },
  {
    id: 'nocli-fast',
    name: 'Nocli Fast',
    description: 'Model cepat untuk respons instan',
    capabilities: ['Quick Responses', 'Simple Tasks', 'Prototyping'],
    performance: 'high',
    icon: '⚡'
  },
  {
    id: 'nocli-advanced',
    name: 'Nocli Advanced',
    description: 'Model advanced untuk tugas kompleks',
    capabilities: ['Deep Analysis', 'Complex Problem Solving', 'Advanced Coding'],
    performance: 'high',
    icon: '🧠'
  },
  {
    id: 'nocli-creative',
    name: 'Nocli Creative',
    description: 'Model kreatif untuk konten kreatif',
    capabilities: ['Content Generation', 'Creative Writing', 'Ideation'],
    performance: 'medium',
    icon: '🎨'
  }
];

// Animation Presets
export const ANIMATIONS = {
  drag: {
    initial: { scale: 1, zIndex: 1 },
    whileDrag: { scale: 1.1, zIndex: 50, boxShadow: '0 10px 25px rgba(0,0,0,0.3)' },
    onDragEnd: { scale: 1, zIndex: 1 }
  },
  contextWindow: {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.9 },
    transition: { type: 'spring', damping: 25, stiffness: 300 }
  },
  message: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { type: 'spring', stiffness: 400, damping: 30 }
  },
  modeSwitch: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.3 }
  }
};
