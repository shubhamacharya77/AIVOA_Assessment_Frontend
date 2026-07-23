import React, { useState, useEffect, useRef } from 'react';

const ReadOnlyInput = ({ label, value, type = 'text', suffix, multiline = false, halfWidth = false }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    // Highlight if the value actually contains data
    if (value && value.trim() !== '') {
      setIsHighlighted(true);
      const timer = setTimeout(() => {
        setIsHighlighted(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [value]);

  const isEmpty = !value || value.trim() === '';
  const displayValue = isEmpty ? 'Awaiting AI extraction...' : value;

  // Determine base classes based on state
  let inputClasses = isEmpty 
    ? 'bg-slate-50 border-slate-200 text-slate-400 transition-colors duration-700' 
    : 'bg-white border-slate-300 text-slate-900 shadow-sm transition-colors duration-700';
    
  if (isHighlighted) {
    inputClasses = 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-[0_0_10px_rgba(52,211,153,0.2)] transition-colors duration-300';
  }

  return (
    <div className={`flex flex-col gap-1.5 ${halfWidth ? 'w-full md:w-[calc(50%-0.5rem)]' : 'w-full'}`}>
      <label className="text-xs font-semibold text-slate-700 tracking-wide">{label}</label>
      <div className="relative">
        {multiline ? (
          <textarea
            readOnly
            value={value || ''}
            placeholder="Awaiting AI extraction..."
            className={`w-full p-3 rounded-lg border focus:outline-none resize-none min-h-[100px] text-sm ${inputClasses}`}
          />
        ) : (
          <div className="relative flex items-center">
            <input
              type={type}
              readOnly
              value={value || ''}
              placeholder="Awaiting AI extraction..."
              className={`w-full p-3 rounded-lg border focus:outline-none text-sm pr-10 ${inputClasses}`}
            />
            {suffix && (
              <span className={`absolute right-3 text-sm font-medium ${isEmpty ? 'text-slate-400' : 'text-slate-600'}`}>
                {suffix}
              </span>
            )}
            {type === 'date' && isEmpty && (
              <span className="absolute right-3 text-slate-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadOnlyInput;
