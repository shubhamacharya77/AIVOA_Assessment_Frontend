import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from './store/slices/authSlice'
import ComplaintForm from './components/ComplaintForm/ComplaintForm'
import AIAssistant from './components/AIAssistant/AIAssistant'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import Header from './components/Layout/Header'

function Dashboard() {
  return (
    <div className="h-screen w-full overflow-hidden bg-[#f8fafc] flex flex-col items-center pt-20 pb-4 px-4 md:px-8">
      <Header />
      <div className="w-full max-w-[1400px] flex-1 min-h-0 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[60%] h-full flex flex-col min-h-0">
          <ComplaintForm />
        </div>
        <div className="w-full md:w-[40%] h-full flex flex-col min-h-0">
          <AIAssistant />
        </div>
      </div>
    </div>
  )
}

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App

