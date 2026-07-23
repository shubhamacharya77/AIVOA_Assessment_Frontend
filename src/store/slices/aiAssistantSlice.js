import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { populateForm } from './complaintSlice';

// A simple random ID generator for the session thread
const generateThreadId = () => Math.random().toString(36).substring(2, 15);

const initialState = {
  status: 'idle', // 'idle' | 'extracting' | 'completed' | 'error'
  progress: 0,
  threadId: generateThreadId(),
  messages: [
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Upload a complaint document or paste text above. I will automatically extract the details and populate the form for you.'
    }
  ],
  isTyping: false,
};

// Async thunk to send message to backend LangGraph agent
export const sendMessageToAgent = createAsyncThunk(
  'aiAssistant/sendMessage',
  async (messageText, { getState, dispatch }) => {
    const { threadId } = getState().aiAssistant;
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
    
    const response = await fetch(`${apiUrl}/chat/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: messageText,
        thread_id: threadId
      })
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    // Automatically update the frontend form with the extracted data!
    if (data.extracted_data && Object.keys(data.extracted_data).length > 0) {
      dispatch(populateForm(data.extracted_data));
    }
    
    return data;
  }
);

export const uploadDocumentToAgent = createAsyncThunk(
  'aiAssistant/uploadDocument',
  async (file, { getState, dispatch }) => {
    const { threadId } = getState().aiAssistant;
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('thread_id', threadId);
    
    const response = await fetch(`${apiUrl}/chat/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    const data = await response.json();
    
    if (data.extracted_data && Object.keys(data.extracted_data).length > 0) {
      dispatch(populateForm(data.extracted_data));
    }
    
    return data;
  }
);

const aiAssistantSlice = createSlice({
  name: 'aiAssistant',
  initialState,
  reducers: {
    setExtractionStatus: (state, action) => {
      state.status = action.payload;
    },
    setExtractionProgress: (state, action) => {
      state.progress = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setTypingIndicator: (state, action) => {
      state.isTyping = action.payload;
    },
    resetAssistant: (state) => {
      Object.assign(state, initialState);
      state.threadId = generateThreadId(); // Generate new thread on reset
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageToAgent.pending, (state) => {
        state.isTyping = true;
      })
      .addCase(sendMessageToAgent.fulfilled, (state, action) => {
        state.isTyping = false;
        
        // Add the AI's response to the chat
        state.messages.push({
          id: Date.now().toString(),
          sender: 'ai',
          text: action.payload.agent_response || 'Data extracted successfully.'
        });
        
        if (action.payload.is_complete) {
           state.status = 'completed';
        }
      })
      .addCase(sendMessageToAgent.rejected, (state, action) => {
        state.isTyping = false;
        state.messages.push({
          id: Date.now().toString(),
          sender: 'ai',
          text: 'Sorry, I encountered an error connecting to the AI agent.'
        });
      })
      .addCase(uploadDocumentToAgent.pending, (state) => {
        state.status = 'extracting';
        state.progress = 50; // Mock progress
      })
      .addCase(uploadDocumentToAgent.fulfilled, (state, action) => {
        state.status = action.payload.is_complete ? 'completed' : 'idle';
        state.progress = 100;
        
        state.messages.push({
          id: Date.now().toString(),
          sender: 'ai',
          text: action.payload.agent_response || 'Document processed. I have extracted the details.'
        });
      })
      .addCase(uploadDocumentToAgent.rejected, (state, action) => {
        state.status = 'error';
        state.progress = 0;
        state.messages.push({
          id: Date.now().toString(),
          sender: 'ai',
          text: 'Sorry, I encountered an error uploading the document.'
        });
      });
  }
});

export const {
  setExtractionStatus,
  setExtractionProgress,
  addMessage,
  setTypingIndicator,
  resetAssistant,
} = aiAssistantSlice.actions;

export default aiAssistantSlice.reducer;
