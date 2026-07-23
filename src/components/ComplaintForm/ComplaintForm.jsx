import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormSection from './FormSection';
import ReadOnlyInput from './ReadOnlyInput';
import SubmissionAlertModal from './SubmissionAlertModal';
import { RotateCcw, Save } from 'lucide-react';
import { resetForm, saveComplaint } from '../../store/slices/complaintSlice';
import { resetAssistant } from '../../store/slices/aiAssistantSlice';

const ComplaintForm = () => {
  const formData = useSelector((state) => state.complaint);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertData, setAlertData] = useState(null);

  const handleReset = () => {
    dispatch(resetForm());
    dispatch(resetAssistant());
  };

  const handleModalReset = () => {
    handleReset();
    setIsModalOpen(false);
  };

  const handleSave = () => {
    dispatch(saveComplaint()).then((action) => {
      if (saveComplaint.fulfilled.match(action)) {
        const id = action.payload?.data?.id || action.payload?.id;
        const riskAssessment = action.payload?.data?.risk_assessment;
        
        setAlertData({
          type: 'success',
          id: id,
          details: {
            customerName: formData.customerName,
            productName: formData.productName,
            batchNumber: formData.batchNumber,
            complaintDate: formData.complaintDate,
            initialSeverity: formData.initialSeverity,
            priority: formData.priority,
            risk_assessment: riskAssessment
          }
        });
        setIsModalOpen(true);
      } else {
        setAlertData({
          type: 'error',
          errorMessage: action.payload || 'Failed to save complaint'
        });
        setIsModalOpen(true);
      }
    });
  };

  const isSaving = formData.saveStatus === 'loading';
  
  // Basic validation: Prevent saving if the form is completely empty
  // (We check a few key fields to determine if the AI has extracted anything yet)
  const isFormEmpty = !formData.productName && !formData.customerName && !formData.complaintDescription && !formData.batchNumber;
  const isSaveDisabled = isSaving || isFormEmpty;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col h-full overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex justify-between items-start border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Log Customer Complaint</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">API & FDF Quality Assurance Module</p>
        </div>
        <div className="bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full text-xs font-bold border border-amber-200 shadow-sm">
          Pending Triage
        </div>
      </div>

      {/* Form Sections */}
      <div className="flex-1 flex flex-col">
        <FormSection title="1. ORIGIN & CUSTOMER DETAILS">
          <ReadOnlyInput label="Complaint Source" value={formData.source} halfWidth />
          <ReadOnlyInput label="Customer Name" value={formData.customerName} halfWidth />
        </FormSection>

        <FormSection title="2. PRODUCT & BATCH IDENTIFICATION">
          <ReadOnlyInput label="Product Name" value={formData.productName} halfWidth />
          <ReadOnlyInput label="Product Strength/Grade" value={formData.productStrength} halfWidth />
          <ReadOnlyInput label="Batch/Lot Number" value={formData.batchNumber} halfWidth />
          <ReadOnlyInput label="Manufacturing Date" value={formData.manufacturingDate} type="date" halfWidth />
          <ReadOnlyInput label="Expiry Date" value={formData.expiryDate} type="date" halfWidth />
          <ReadOnlyInput label="Quantity Affected" value={formData.quantityAffected} suffix="kg" halfWidth />
        </FormSection>

        <FormSection title="3. COMPLAINT DETAILS">
          <ReadOnlyInput label="Complaint Type" value={formData.complaintType} halfWidth />
          <ReadOnlyInput label="Complaint Date" value={formData.complaintDate} type="date" halfWidth />
          <ReadOnlyInput label="Detailed Complaint Description" value={formData.complaintDescription} multiline />
        </FormSection>

        <FormSection title="4. INITIAL ASSESSMENT & PRIORITY">
          <ReadOnlyInput label="Initial Severity" value={formData.initialSeverity} halfWidth suffix={<ChevronDownIcon />} />
          <ReadOnlyInput label="Priority" value={formData.priority} halfWidth suffix={<ChevronDownIcon />} />
        </FormSection>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
        <button 
          onClick={handleReset}
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
        >
          <RotateCcw size={16} />
          Reset Form
        </button>
        <button 
          onClick={handleSave}
          disabled={isSaveDisabled}
          title={isFormEmpty ? "Cannot save an empty complaint form." : ""}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={16} />
          {isSaving ? 'Saving...' : 'Save Complaint'}
        </button>
      </div>

      {/* Submission Alert Modal */}
      <SubmissionAlertModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReset={handleModalReset}
        alertData={alertData}
      />
    </div>
  );
};

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export default ComplaintForm;
