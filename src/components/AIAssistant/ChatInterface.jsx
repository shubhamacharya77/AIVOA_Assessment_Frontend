import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Send, Bot } from 'lucide-react';
import { addMessage, sendMessageToAgent } from '../../store/slices/aiAssistantSlice';

const ChatInterface = () => {
  const { messages, isTyping } = useSelector((state) => state.aiAssistant);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    dispatch(addMessage({
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue
    }));

    setInputValue('');

    // Call the backend API
    dispatch(sendMessageToAgent(inputValue));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 overflow-hidden flex-1">
      {/* Message List */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Bot size={16} className="text-blue-600" />
                </div>
              )}
              <div
                className={`p-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-sm'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Bot size={16} className="text-blue-600" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-sm flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-slate-100 bg-white">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about this complaint..."
            className="w-full p-3 pr-12 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-2">
          AI responses may contain errors. Please verify information.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
