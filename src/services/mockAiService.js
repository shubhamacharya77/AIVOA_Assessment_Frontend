import { setExtractionStatus, setExtractionProgress, addMessage, setTypingIndicator } from '../store/slices/aiAssistantSlice';
import { populateForm } from '../store/slices/complaintSlice';

/**
 * MOCK AI SERVICE - WARNING: Remove or replace this before production!
 * This service simulates a backend AI extraction process.
 */
export const simulateExtraction = (fileOrText, dispatch) => {
  return new Promise((resolve) => {
    dispatch(setExtractionStatus('extracting'));
    dispatch(setExtractionProgress(10));
    dispatch(addMessage({
      id: Date.now().toString(),
      sender: 'user',
      text: typeof fileOrText === 'string' ? `Pasted text: "${fileOrText.substring(0, 30)}..."` : `Uploaded: ${fileOrText.name}`
    }));
    dispatch(setTypingIndicator(true));

    let progress = 10;
    const interval = setInterval(() => {
      progress += 20;
      dispatch(setExtractionProgress(progress));
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Mock data extracted from the document
        const mockData = {
          source: 'Email',
          customerName: 'Jane Doe',
          productName: 'Amoxicillin 500mg Capsules',
          productStrength: '500mg',
          batchNumber: 'BT-49201A',
          manufacturingDate: '2025-10-12',
          expiryDate: '2027-10-11',
          quantityAffected: '500',
          complaintType: 'Quality/Efficacy',
          complaintDate: new Date().toISOString().split('T')[0],
          complaintDescription: 'Customer reported that several capsules in the batch were broken and powder was leaking out of the blister pack.',
          initialSeverity: 'Medium',
          priority: 'High',
        };

        dispatch(populateForm(mockData));
        dispatch(setExtractionStatus('completed'));
        dispatch(setTypingIndicator(false));
        dispatch(addMessage({
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'I have successfully extracted the complaint details from the document and populated the form. Please review the information.'
        }));
        
        resolve(mockData);
      }
    }, 600); // Takes about 3 seconds total
  });
};
