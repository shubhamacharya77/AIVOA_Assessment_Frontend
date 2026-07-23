import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UploadCloud } from 'lucide-react';
import { uploadDocumentToAgent } from '../../store/slices/aiAssistantSlice';

const DocumentUpload = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.aiAssistant.status);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadDocumentToAgent(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      dispatch(uploadDocumentToAgent(file));
    }
  };

  const isExtracting = status === 'extracting';

  return (
    <div className="flex flex-col gap-4">
      <div 
        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors ${isExtracting ? 'border-slate-200 bg-slate-50 opacity-50 pointer-events-none' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-blue-400 cursor-pointer'}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !isExtracting && fileInputRef.current?.click()}
      >
        <UploadCloud className="text-slate-400 mb-3" size={32} />
        <p className="text-sm font-semibold text-slate-700">
          Drag & drop complaint document here
        </p>
        <p className="text-sm text-slate-500 mt-1">
          or <span className="text-blue-600 hover:underline">click to browse</span>
        </p>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileUpload} 
          accept=".pdf,.txt"
        />
      </div>



      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-start gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>
        <div className="text-xs text-emerald-700">
          <p className="font-semibold">Supported formats: PDF, TXT</p>
          <p>Max file size: 10MB</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
