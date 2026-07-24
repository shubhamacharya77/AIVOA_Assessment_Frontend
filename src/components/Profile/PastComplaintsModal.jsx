import React, { useState, useEffect } from 'react';
import { X, FileText, Loader2, Edit } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { populateForm } from '../../store/slices/complaintSlice';
import { resetAssistant } from '../../store/slices/aiAssistantSlice';

const PastComplaintsModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpenComplaint = (complaint) => {
    // Populate the form with this complaint's data + ID
    dispatch(populateForm({
      ...complaint.structured_data,
      dbId: complaint.id
    }));
    // Clear any previous chat context
    dispatch(resetAssistant());
    // Close the modal
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      const fetchComplaints = async () => {
        setLoading(true);
        try {
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
          const token = localStorage.getItem('token');
          const response = await fetch(`${apiUrl}/complaints`, {
            headers: token ? { 'Authorization': `Bearer ${token}` } : {}
          });
          const data = await response.json();
          if (response.ok && data.data) {
            setComplaints(data.data);
          }
        } catch (error) {
          console.error("Failed to fetch complaints:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchComplaints();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FileText size={20} className="text-indigo-600" />
            Past Complaints
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-indigo-500" size={32} />
            </div>
          ) : complaints.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              You don't have any past complaints.
            </div>
          ) : (
            <div className="space-y-4">
              {complaints.map((complaint) => {
                const data = complaint.structured_data || {};
                const title = data.productName ? `Issue with ${data.productName}` : 'Complaint Submitted';
                const status = complaint.status || 'Received';
                const date = new Date(complaint.created_at).toLocaleDateString();
                
                return (
                  <div key={complaint.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{title}</h3>
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">{status}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{data.complaintDescription || 'No description provided.'}</p>
                    <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-50 pt-3">
                      <span>ID: COMP-{complaint.id.toString().padStart(4, '0')}</span>
                      <div className="flex items-center gap-4">
                        <span>{date}</span>
                        <button 
                          onClick={() => handleOpenComplaint(complaint)}
                          className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                        >
                          <Edit size={14} />
                          Open & Edit
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastComplaintsModal;
