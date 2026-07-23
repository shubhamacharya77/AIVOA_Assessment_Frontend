import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, ChevronDown, FileText, Settings } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import ProfileModal from '../Profile/ProfileModal';
import PastComplaintsModal from '../Profile/PastComplaintsModal';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isComplaintsModalOpen, setIsComplaintsModalOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-100 h-16 w-full fixed top-0 z-40">
        <div className="h-full max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              AIVOA
            </h1>
          </div>

          {/* Profile Section */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 p-1.5 pr-3 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold text-sm">
                {getInitials(user?.full_name)}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {user?.full_name || 'User'}
              </span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transform transition-all">
                <div className="p-4 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">{user?.full_name}</p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{user?.email}</p>
                </div>
                
                <div className="py-1">
                  <button 
                    onClick={() => { setIsProfileModalOpen(true); setIsDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                  >
                    <Settings size={16} />
                    Profile Settings
                  </button>
                  <button 
                    onClick={() => { setIsComplaintsModalOpen(true); setIsDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                  >
                    <FileText size={16} />
                    Past Complaints
                  </button>
                </div>
                
                <div className="border-t border-gray-100 py-1">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </header>

      {/* Modals */}
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
      <PastComplaintsModal 
        isOpen={isComplaintsModalOpen} 
        onClose={() => setIsComplaintsModalOpen(false)} 
      />
    </>
  );
};

export default Header;
