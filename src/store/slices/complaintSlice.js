import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const saveComplaint = createAsyncThunk(
  'complaint/saveComplaint',
  async (_, { getState, rejectWithValue }) => {
    const complaintData = getState().complaint;
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
    
    // Extract just the schema fields, ignoring React/Redux metadata
    const payload = {
      source: complaintData.source,
      customerName: complaintData.customerName,
      productName: complaintData.productName,
      productStrength: complaintData.productStrength,
      batchNumber: complaintData.batchNumber,
      manufacturingDate: complaintData.manufacturingDate,
      expiryDate: complaintData.expiryDate,
      quantityAffected: complaintData.quantityAffected,
      complaintType: complaintData.complaintType,
      complaintDate: complaintData.complaintDate,
      complaintDescription: complaintData.complaintDescription,
      initialSeverity: complaintData.initialSeverity,
      priority: complaintData.priority,
    };
    
    try {
      const isUpdate = !!complaintData.dbId;
      const url = isUpdate 
        ? `${apiUrl}/complaints/${complaintData.dbId}` 
        : `${apiUrl}/complaints`;
        
      const response = await fetch(url, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.detail || 'Failed to save complaint');
      }
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  // Origin & Customer Details
  source: '',
  customerName: '',
  
  // Product & Batch Identification
  productName: '',
  productStrength: '',
  batchNumber: '',
  manufacturingDate: '',
  expiryDate: '',
  quantityAffected: '',
  
  // Complaint Details
  complaintType: '',
  complaintDate: '',
  complaintDescription: '',
  
  // Initial Assessment & Priority
  initialSeverity: '',
  priority: '',
  
  // API State
  saveStatus: 'idle', // idle | loading | succeeded | failed
  saveError: null,
  dbId: null, // Tracks if this has already been saved to the database
};

const complaintSlice = createSlice({
  name: 'complaint',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      if (field in state) {
        state[field] = value;
      }
    },
    populateForm: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveComplaint.pending, (state) => {
        state.saveStatus = 'loading';
        state.saveError = null;
      })
      .addCase(saveComplaint.fulfilled, (state, action) => {
        state.saveStatus = 'succeeded';
        state.saveError = null;
        if (action.payload?.data?.id) {
          state.dbId = action.payload.data.id;
        }
      })
      .addCase(saveComplaint.rejected, (state, action) => {
        state.saveStatus = 'failed';
        state.saveError = action.payload;
      });
  }
});

export const { updateField, populateForm, resetForm } = complaintSlice.actions;

export default complaintSlice.reducer;
