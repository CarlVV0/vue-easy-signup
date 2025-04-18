
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface ExpenseCardProps {
  title: string;
  amount: number;
  date: string;
  className?: string;
}

const ExpenseCard = ({ title, amount, date, className }: ExpenseCardProps) => {
  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-3xl font-bold mt-2">{amount}</p>
        <p className="text-sm text-gray-500 mt-1">{date}</p>
        <DollarSign className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 h-12 w-12" />
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
