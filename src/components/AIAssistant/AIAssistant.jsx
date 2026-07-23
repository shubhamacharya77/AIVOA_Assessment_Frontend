import React from 'react';
import { useSelector } from 'react-redux';
import { Sparkles } from 'lucide-react';
import DocumentUpload from './DocumentUpload';
import ChatInterface from './ChatInterface';

const AIAssistant = () => {
  const { status, progress } = useSelector((state) => state.aiAssistant);

  return (
    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col h-full overflow-hidden relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="text-blue-500" size={20} />
          <h2 className="text-lg font-bold text-slate-800">AI Complaint Intake Assistant</h2>
        </div>
        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
          BETA
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1 min-h-0 relative z-10 overflow-hidden">
        {/* Upload Zone */}
        <DocumentUpload />

        {/* Progress Section */}
        {status === 'extracting' && (
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm animate-pulse-slow">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-500 tracking-wider">EXTRACTION PROGRESS</span>
              <span className="text-xs font-bold text-slate-700">{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 mb-3 overflow-hidden">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-600 font-medium">Analyzing document content and extracting key details...</p>
            <p className="text-[10px] text-slate-400 mt-1">Please wait, this may take a few moments.</p>
          </div>
        )}

        {/* AI Chat Interface */}
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <span className="text-xs font-bold text-slate-400 tracking-wider mb-2 uppercase shrink-0">AI Assistant</span>
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
