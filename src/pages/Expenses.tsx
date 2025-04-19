
import { useEffect, useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import AddExpenseForm from "@/components/AddExpenseForm";
import { toast } from "sonner";

const Expenses = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin - in a real app, this would come from authentication
    const userInfo = JSON.parse(localStorage.getItem('user') || '{"role": "user"}');
    setIsAdmin(userInfo.role === "admin");
  }, []);

  const handleAddExpense = (expense: any) => {
    // Generate a unique ID for the new expense
    const expenseWithId = { ...expense, id: crypto.randomUUID() };
    
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    localStorage.setItem('expenses', JSON.stringify([...expenses, expenseWithId]));
    toast.success('Expense added successfully!');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500">
        <DashboardSidebar />
        <div className="flex-1 p-4 md:p-8 overflow-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Add New Expense</h1>
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 max-w-lg mx-auto md:mx-0">
            <AddExpenseForm onAddExpense={handleAddExpense} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Expenses;
