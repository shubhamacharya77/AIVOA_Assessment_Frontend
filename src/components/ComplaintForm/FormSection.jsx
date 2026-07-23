import React from 'react';

const FormSection = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-4 py-6 border-b border-slate-100 last:border-0">
      <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </h3>
      <div className="flex flex-wrap gap-4">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
