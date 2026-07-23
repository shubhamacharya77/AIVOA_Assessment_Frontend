import { configureStore } from '@reduxjs/toolkit';
import complaintReducer from './slices/complaintSlice';
import aiAssistantReducer from './slices/aiAssistantSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    complaint: complaintReducer,
    aiAssistant: aiAssistantReducer,
  },
});

