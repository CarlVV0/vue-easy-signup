
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import ExpenseCard from "@/components/ExpenseCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Expense {
  title: string;
  amount: number;
  date: string;
  id?: string;
}

const Dashboard = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedAmount, setEditedAmount] = useState("");

  useEffect(() => {
    // Check if user is admin - in a real app, this would come from authentication
    const userInfo = JSON.parse(localStorage.getItem('user') || '{"role": "user"}');
    setIsAdmin(userInfo.role === "admin");
    
    loadExpenses();
  }, []);

  const loadExpenses = () => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    
    // Ensure each expense has an ID
    const expensesWithIds = savedExpenses.map((expense: Expense) => {
      if (!expense.id) {
        return { ...expense, id: crypto.randomUUID() };
      }
      return expense;
    });
    
    if (JSON.stringify(savedExpenses) !== JSON.stringify(expensesWithIds)) {
      localStorage.setItem('expenses', JSON.stringify(expensesWithIds));
    }
    
    setExpenses(expensesWithIds);
    const total = expensesWithIds.reduce((sum: number, expense: Expense) => sum + expense.amount, 0);
    setTotalAmount(total);
  };

  const handleEditClick = (expense: Expense) => {
    setCurrentExpense(expense);
    setEditedTitle(expense.title);
    setEditedAmount(expense.amount.toString());
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (expense: Expense) => {
    setCurrentExpense(expense);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateExpense = () => {
    if (!currentExpense) return;
    
    const amount = parseFloat(editedAmount);
    if (isNaN(amount)) {
      toast.error("Please enter a valid amount");
      return;
    }

    const updatedExpenses = expenses.map(expense => 
      expense.id === currentExpense.id 
        ? { ...expense, title: editedTitle, amount } 
        : expense
    );
    
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    loadExpenses();
    setIsEditDialogOpen(false);
    toast.success("Expense updated successfully");
  };

  const handleDeleteExpense = () => {
    if (!currentExpense) return;

    const updatedExpenses = expenses.filter(expense => expense.id !== currentExpense.id);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    loadExpenses();
    setIsDeleteDialogOpen(false);
    toast.success("Expense deleted successfully");
  };

  // For demo purposes - Set up admin account if not already exists
  const setupAdmin = () => {
    localStorage.setItem('user', JSON.stringify({ role: "admin" }));
    setIsAdmin(true);
    toast.success("Admin access enabled");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500">
        <DashboardSidebar />
        <div className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0">Dashboard</h1>
            {!isAdmin && (
              <Button 
                variant="outline"
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={setupAdmin}
              >
                Enable Admin (Demo)
              </Button>
            )}
          </div>
          
          <ExpenseCard
            title="Total Expenses"
            amount={totalAmount}
            date="Overall"
            className="bg-white mb-6 w-full"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {expenses.map((expense) => (
              <div 
                key={expense.id} 
                className="relative group"
              >
                <ExpenseCard
                  title={expense.title}
                  amount={expense.amount}
                  date={expense.date}
                  className="bg-white"
                />
                
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 rounded-full bg-blue-100 hover:bg-blue-200"
                      onClick={() => handleEditClick(expense)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 rounded-full bg-red-100 hover:bg-red-200"
                      onClick={() => handleDeleteClick(expense)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Expense</DialogTitle>
                <DialogDescription>
                  Make changes to the expense details.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={editedAmount}
                    onChange={(e) => setEditedAmount(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateExpense}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this expense? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteExpense}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
