
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };
  
  // Get username from localStorage
  const username = JSON.parse(localStorage.getItem('user') || '{}').username;
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">MDC-CAST Budget Tracker System</h1>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center flex-col">
            <h2 className="text-2xl font-semibold mb-4">Welcome, {username || 'User'}!</h2>
            <p className="text-gray-500">This is your dashboard. Budget data will be displayed here.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
