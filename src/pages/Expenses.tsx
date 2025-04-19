
import { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import AddExpenseForm from "@/components/AddExpenseForm";

const Expenses = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500">
        <DashboardSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Add New Expense</h1>
          <AddExpenseForm onAddExpense={(expense) => {
            const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
            localStorage.setItem('expenses', JSON.stringify([...expenses, expense]));
          }} />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Expenses;
