
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import ExpenseCard from "@/components/ExpenseCard";

interface Expense {
  title: string;
  amount: number;
  date: string;
}

const Dashboard = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    setExpenses(savedExpenses);
    const total = savedExpenses.reduce((sum: number, expense: Expense) => sum + expense.amount, 0);
    setTotalAmount(total);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500">
        <DashboardSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
          <ExpenseCard
            title="Total Expenses"
            amount={totalAmount}
            date="Overall"
            className="bg-white mb-6"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expenses.map((expense, index) => (
              <ExpenseCard
                key={index}
                title={expense.title}
                amount={expense.amount}
                date={expense.date}
                className="bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
