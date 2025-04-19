
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AddExpenseFormProps {
  onAddExpense: (expense: {
    title: string;
    amount: number;
    date: string;
  }) => void;
}

const AddExpenseForm = ({ onAddExpense }: AddExpenseFormProps) => {
  const [date, setDate] = useState<Date>();
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !item || !price) {
      toast.error('Please fill in all fields');
      return;
    }

    const newExpense = {
      title: item,
      amount: parseFloat(price),
      date: format(date, 'yyyy-MM-dd')
    };

    onAddExpense(newExpense);
    toast.success('Expense added successfully');

    // Clear form
    setDate(undefined);
    setItem('');
    setPrice('');
  };

  return (
    <div className="bg-blue-100/50 rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add Expenses</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Item</label>
          <Input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Enter expense item"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Price</label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter amount"
            className="w-full"
          />
        </div>

        <Button 
          type="submit" 
          className="w-32 bg-indigo-600 hover:bg-indigo-700"
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
