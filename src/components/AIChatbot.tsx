import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, Loader2, Sparkles } from "lucide-react";
import { apiClient } from "../api/client";

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Hi! I'm Voyana, your personal travel assistant. What are you dreaming of doing on your next trip?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Expose a global method so the Boarding Pass form can send the prompt directly here
  useEffect(() => {
    (window as any).sendPromptToLLM = (message: string) => {
      setIsOpen(true);
      handleSend(message);
    };
    return () => {
      delete (window as any).sendPromptToLLM;
    };
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    
    const newMessages = [...messages, { role: 'user' as const, content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await apiClient.post('/ai/chat', { 
        message: text,
        history: messages 
      });
      setMessages([...newMessages, { role: 'ai', content: response.data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'ai', content: "Sorry, I'm having trouble connecting to my brain right now. Please check your API keys!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-disco-queen to-helio text-white rounded-full shadow-2xl z-50 flex items-center gap-2"
      >
        <Sparkles className="w-6 h-6" />
        <span className="font-bold hidden md:inline">Ask Voyana AI</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[380px] h-[550px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-soft-serve"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-disco-queen to-helio text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Voyana AI</h3>
                  <p className="text-xs text-white/80">Online & Ready to plan</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-soft-serve/10">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-disco-queen text-white rounded-br-none' 
                      : 'bg-white border border-soft-serve text-gray-800 rounded-bl-none shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-soft-serve p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2 text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin text-disco-queen" /> Thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-soft-serve bg-white">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2 relative"
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about destinations, budgets..."
                  className="w-full bg-soft-serve/30 border border-soft-serve rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-disco-queen transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-2 p-2 bg-disco-queen text-white rounded-full disabled:bg-gray-300 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
