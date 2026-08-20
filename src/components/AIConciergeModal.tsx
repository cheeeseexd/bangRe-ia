import React, { useState, useEffect, useRef } from 'react';
import { askAIConcierge, ChatMessage } from '../services/aiConciergeService';
import { Send, X, AlertTriangle, Shield } from 'lucide-react';

interface AIConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onSelectNodeInTree?: (nodeId: string) => void;
}

export const AIConciergeModal: React.FC<AIConciergeModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  onSelectNodeInTree
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: "Hello. I am the Bang Design AI Concierge. I can help you assess technical fit for your hardware or digital growth project, explore relevant case studies, or schedule a Strategy Call.\n\nWhat are you currently developing or improving?",
      timestamp: 'just now',
      suggestions: [
        "Explain the two primary offers",
        "I have a medical diagnostic device",
        "I need industrial robotics engineering",
        "I need high-volume consumer hardware",
        "How does the 2+2 venture model work?"
      ]
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSend(initialQuery);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await askAIConcierge(query);
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: 'just now',
        suggestions: response.suggestions,
        handoffTriggered: response.handoffTriggered,
        recommendedNodes: response.recommendedNodes
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: "I encountered a transient processing error. You can immediately connect with a Bang Design partner via the Strategy Call booking form.",
        timestamp: 'just now',
        suggestions: ["Book a Strategy Call"]
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-none flex items-center justify-end">
      {/* Right Slide-over Drawer */}
      <div className="bg-white border-l border-black w-full max-w-xl h-full flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#E5E5E5] bg-[#FAFAFA] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 bg-black" />
            <div>
              <div className="text-xs font-bold text-black">
                bang ai concierge // 2026 engine
              </div>
              <div className="text-[11px] text-[#737373]">
                zero hallucinations • grounded in approved specs & proof
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-black hover:text-white border border-[#E5E5E5] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Governance & Privacy Notice */}
        <div className="px-4 py-2 bg-neutral-100 border-b border-[#E5E5E5] flex items-center justify-between text-[11px] text-[#525252]">
          <div className="flex items-center space-x-1.5">
            <Shield className="w-3 h-3 text-black" />
            <span>strict human review for all proposals & commercial terms</span>
          </div>
          <span className="text-[#737373]">nda safe</span>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="text-[10px] text-[#A3A3A3] mb-1">
                {msg.sender === 'user' ? '// you' : '// bang ai concierge'} • {msg.timestamp}
              </div>

              <div
                className={`p-3.5 max-w-[90%] leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-black text-white'
                    : 'bg-[#FAFAFA] border border-[#E5E5E5] text-[#222222]'
                }`}
              >
                {msg.text}
              </div>

              {/* Handoff Notice Banner if triggered */}
              {msg.handoffTriggered && (
                <div className="mt-2 p-2.5 bg-amber-50 border border-amber-300 text-amber-900 text-[11px] flex items-start space-x-2 max-w-[90%]">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">commercial governance handoff:</span>
                    binding estimates and custom contracts are reviewed manually by a partner to maintain commercial integrity.
                  </div>
                </div>
              )}

              {/* Suggestions / Prompt Chips */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                  {msg.suggestions.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(sug)}
                      className="text-[11px] text-left px-2 py-1 bg-white border border-[#E5E5E5] hover:border-black text-[#525252] hover:text-black transition-colors"
                    >
                      + {sug.toLowerCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex flex-col items-start">
              <div className="text-[10px] text-[#A3A3A3] mb-1">
                // bang ai concierge
              </div>
              <div className="p-3 bg-[#FAFAFA] border border-[#E5E5E5] text-xs text-[#737373] animate-pulse">
                synthesizing verified engineering specs...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-[#E5E5E5] bg-[#FAFAFA]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="ask about capabilities, case studies, dfm tooling, or book a call..."
              className="flex-1 p-2.5 bg-white border border-[#E5E5E5] focus:border-black text-xs focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-4 py-2.5 bg-black text-white hover:bg-neutral-800 disabled:opacity-40 text-xs font-medium flex items-center space-x-1"
            >
              <span>send</span>
              <Send className="w-3 h-3" />
            </button>
          </form>
          <div className="mt-2 flex justify-between items-center text-[10px] text-[#737373]">
            <span>press enter to send</span>
            <span>platform: elementor pro ai extension</span>
          </div>
        </div>
      </div>
    </div>
  );
};
