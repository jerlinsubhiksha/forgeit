import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { apiClient as api } from "../api/client";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hi! I'm Voyana AI. I can help you plan your trip, find restaurants, or build a daily itinerary. What are you dreaming of?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Expose function globally so the Planning Form can auto-fill and submit
  useEffect(() => {
    (window as any).sendPromptToLLM = (prompt: string) => {
      setIsOpen(true);
      handleSend(prompt);
    };
    return () => { delete (window as any).sendPromptToLLM; };
  }, [messages]); // Dependency needed so handleSend has fresh state if necessary

  const handleSend = async (textToSubmit: string = input) => {
    if (!textToSubmit.trim()) return;

    const userMessage = { id: Date.now().toString(), role: 'user' as const, content: textToSubmit };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Build history context for the backend
      const history = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const response = await api.post('/ai/chat', { 
        message: textToSubmit,
        history 
      });

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.reply
      }]);
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Sorry, I encountered an error. (${error.uiMessage || error.message})`
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-[#7C3DB8] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-[400px] h-[600px] bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl flex flex-col z-50 transition-all duration-300 origin-bottom-right border border-gray-100 dark:border-slate-800 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#EAE4FC] dark:bg-slate-800 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-[#7C3DB8] dark:text-white" />
            </div>
            <div>
              <h3 className="font-bold text-[#1B2430] dark:text-white leading-tight">Voyana AI</h3>
              <p className="text-xs text-[#5B5346] dark:text-slate-400 font-medium">Travel Designer</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-gray-50/50 dark:bg-slate-900/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'assistant' 
                  ? 'bg-[#EAE4FC] dark:bg-slate-800 text-[#7C3DB8] dark:text-white' 
                  : 'bg-[#1B2430] dark:bg-slate-700 text-white'
              }`}>
                {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                msg.role === 'assistant' 
                  ? 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-[#1B2430] dark:text-slate-200 shadow-sm rounded-tl-none whitespace-pre-wrap' 
                  : 'bg-[#1B2430] dark:bg-slate-700 text-white rounded-tr-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EAE4FC] dark:bg-slate-800 text-[#7C3DB8] dark:text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-tl-none">
                <Loader2 className="w-4 h-4 animate-spin text-[#7C3DB8]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-b-[2rem]">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Voyana anything..."
              className="w-full bg-gray-50 dark:bg-slate-800 dark:text-white border-none py-4 pl-5 pr-14 rounded-xl outline-none focus:ring-2 focus:ring-[#EAE4FC] dark:focus:ring-slate-700 transition-shadow text-sm"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="absolute right-2 p-2 bg-[#7C3DB8] dark:bg-[#EAE4FC] text-white dark:text-[#7C3DB8] rounded-lg disabled:opacity-50 hover:bg-purple-800 dark:hover:bg-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
