
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import AddExpenseForm from "@/components/AddExpenseForm";
import ExpenseCard from "@/components/ExpenseCard";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500">
        <DashboardSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Expenses</h1>
          <AddExpenseForm />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <ExpenseCard
              title="Office Supplies"
              amount={150.75}
              date="2024-04-19"
            />
            <ExpenseCard
              title="Marketing"
              amount={299.99}
              date="2024-04-18"
            />
            <ExpenseCard
              title="Software License"
              amount={79.99}
              date="2024-04-17"
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
