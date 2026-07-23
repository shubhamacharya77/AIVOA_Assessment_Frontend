import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Copy, 
  Check, 
  RotateCcw, 
  ShieldCheck, 
  ArrowRight,
  FileText,
  Clock,
  User,
  Package,
  AlertCircle
} from 'lucide-react';

const SubmissionAlertModal = ({ isOpen, onClose, onReset, alertData }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !alertData) return null;

  const { type, id, details, errorMessage } = alertData;
  const isSuccess = type === 'success';

  const handleCopyId = () => {
    if (id) {
      navigator.clipboard.writeText(String(id));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium':
      case 'moderate':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low':
      case 'minor':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all duration-300 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Banner */}
        <div className={`h-3 w-full ${isSuccess ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500' : 'bg-gradient-to-r from-red-500 via-rose-500 to-amber-500'}`} />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
          {/* Status Icon Header */}
          <div className="flex flex-col items-center text-center">
            <div className={`relative flex items-center justify-center w-20 h-20 rounded-3xl mb-4 shadow-xl ${
              isSuccess 
                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/30' 
                : 'bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-red-500/30'
            }`}>
              {isSuccess ? (
                <>
                  <CheckCircle2 size={42} strokeWidth={2.2} className="animate-in zoom-in-75 duration-300" />
                  <div className="absolute -inset-1 rounded-3xl bg-emerald-500/20 animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />
                </>
              ) : (
                <AlertTriangle size={42} strokeWidth={2.2} className="animate-in zoom-in-75 duration-300" />
              )}
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {isSuccess ? 'Complaint Submitted Successfully!' : 'Submission Encountered an Error'}
            </h2>
            <p className="text-sm text-slate-500 mt-1.5 max-w-md">
              {isSuccess 
                ? 'The quality assurance complaint record has been successfully validated and logged into the QA Database.'
                : 'We could not complete your request at this time. Please check your data or try again.'
              }
            </p>
          </div>

          {/* Details Box for Success */}
          {isSuccess && (
            <div className="mt-6 space-y-4">
              {/* ID Badge Box */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Reference ID</span>
                    <span className="text-sm font-bold text-slate-800 font-mono">
                      #{typeof id === 'number' ? `CMP-${id.toString().padStart(4, '0')}` : (id || 'CMP-LOGGED')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCopyId}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    copied 
                      ? 'bg-emerald-600 text-white shadow-sm' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={14} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>

              {/* Summary Details Card */}
              {details && (
                <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/60 space-y-3">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText size={13} className="text-slate-400" />
                    <span>Summary of Record</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {details.customerName && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <User size={14} className="text-slate-400 shrink-0" />
                        <span className="truncate"><strong className="text-slate-700">Customer:</strong> {details.customerName}</span>
                      </div>
                    )}

                    {details.productName && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <Package size={14} className="text-slate-400 shrink-0" />
                        <span className="truncate"><strong className="text-slate-700">Product:</strong> {details.productName}</span>
                      </div>
                    )}

                    {details.batchNumber && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <span className="w-3.5 h-3.5 rounded-full bg-slate-200 text-[9px] font-bold text-slate-600 flex items-center justify-center shrink-0">B</span>
                        <span className="truncate"><strong className="text-slate-700">Batch:</strong> {details.batchNumber}</span>
                      </div>
                    )}

                    {details.complaintDate && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock size={14} className="text-slate-400 shrink-0" />
                        <span className="truncate"><strong className="text-slate-700">Logged:</strong> {details.complaintDate}</span>
                      </div>
                    )}
                  </div>

                  {(details.initialSeverity || details.priority) && (
                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      {details.initialSeverity && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-500 font-medium">Severity:</span>
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getSeverityBadge(details.initialSeverity)}`}>
                            {details.initialSeverity}
                          </span>
                        </div>
                      )}
                      {details.priority && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-500 font-medium">Priority:</span>
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            {details.priority}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* AI Risk Assessment Card */}
              {details?.risk_assessment && (
                <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
                    <ShieldCheck size={64} className="text-indigo-600" />
                  </div>
                  
                  <div className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    </div>
                    <span>AI Copilot Risk Analysis</span>
                  </div>

                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600">Predicted Severity:</span>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getSeverityBadge(details.risk_assessment.predicted_severity)} shadow-sm`}>
                        {details.risk_assessment.predicted_severity || 'Unknown'}
                      </span>
                    </div>
                    
                    <div className="bg-white/90 p-3 rounded-xl border border-indigo-50/50 shadow-sm text-xs text-slate-600 leading-relaxed">
                      <strong className="text-indigo-900 block mb-1.5 text-[10px] uppercase tracking-wider font-bold">Risk Summary</strong>
                      {details.risk_assessment.risk_summary}
                    </div>

                    {details.risk_assessment.root_cause_recommendation && (
                      <div className="bg-white/90 p-3 rounded-xl border border-indigo-50/50 shadow-sm text-xs text-slate-600 leading-relaxed">
                        <strong className="text-indigo-900 block mb-1.5 text-[10px] uppercase tracking-wider font-bold">Root Cause Recommendation</strong>
                        {details.risk_assessment.root_cause_recommendation}
                      </div>
                    )}

                    {details.risk_assessment.next_suggested_actions && details.risk_assessment.next_suggested_actions.length > 0 && (
                      <div className="bg-white/90 p-3 rounded-xl border border-indigo-50/50 shadow-sm">
                        <strong className="text-indigo-900 block mb-2 text-[10px] uppercase tracking-wider font-bold">Suggested Actions</strong>
                        <ul className="space-y-1.5 text-xs text-slate-600">
                          {details.risk_assessment.next_suggested_actions.map((action, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-indigo-400 mt-0.5">•</span>
                              <span className="leading-tight">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Details Box for Error */}
          {!isSuccess && (
            <div className="mt-6 p-4 bg-red-50/80 rounded-2xl border border-red-100 text-xs text-red-700 flex items-start gap-3">
              <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800">Error Details:</p>
                <p className="mt-1 text-red-600 font-mono bg-red-100/50 p-2 rounded-lg break-all">
                  {errorMessage || 'Unknown server error occurred.'}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            {isSuccess ? (
              <>
                <button
                  onClick={onReset}
                  className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all shadow-sm"
                >
                  <RotateCcw size={16} />
                  <span>Log New Complaint</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl transition-all shadow-md shadow-blue-500/20"
                >
                  <span>Done</span>
                  <ArrowRight size={16} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-md shadow-red-500/20"
                >
                  <span>Close & Try Again</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionAlertModal;
