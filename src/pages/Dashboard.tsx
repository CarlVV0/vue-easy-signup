
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from '@/components/DashboardSidebar';
import ExpenseCard from '@/components/ExpenseCard';

const Dashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ExpenseCard
                title="Today's Expense"
                amount={0}
                date={new Date().toLocaleDateString()}
                className="bg-orange-100"
              />
              <ExpenseCard
                title="Today's Expense"
                amount={0}
                date={new Date().toLocaleDateString()}
                className="bg-blue-100"
              />
              <ExpenseCard
                title="Last 7 day's Expense"
                amount={0}
                date="27 February 2025"
                className="bg-gray-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <ExpenseCard
                title="Last 30 day's Expense"
                amount={0}
                date="03 February 2025"
                className="bg-purple-200"
              />
              <ExpenseCard
                title="One year Expense"
                amount={0}
                date="03 March 2024"
                className="bg-pink-200"
              />
            </div>

            <div className="mt-6">
              <ExpenseCard
                title="Total Expense"
                amount={0}
                date=""
                className="bg-indigo-500 text-white"
              />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
