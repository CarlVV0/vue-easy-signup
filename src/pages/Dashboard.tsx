
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import AddExpenseForm from "@/components/AddExpenseForm";
import ExpenseCard from "@/components/ExpenseCard";

interface Expense {
  title: string;
  amount: number;
  date: string;
}

const Dashboard = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleAddExpense = (newExpense: Expense) => {
    setExpenses([...expenses, newExpense]);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500">
        <DashboardSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Expenses</h1>
          <AddExpenseForm onAddExpense={handleAddExpense} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {expenses.map((expense, index) => (
              <ExpenseCard
                key={index}
                title={expense.title}
                amount={expense.amount}
                date={expense.date}
              />
            ))}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
