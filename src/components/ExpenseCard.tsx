
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface ExpenseCardProps {
  title: string;
  amount: number;
  date: string;
  className?: string;
}

const ExpenseCard = ({ title, amount, date, className }: ExpenseCardProps) => {
  // Format the amount to 2 decimal places and add commas for thousands
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <CardContent className="p-4 md:p-6">
        <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-gray-100 pr-6">{title}</h3>
        <p className="text-xl md:text-3xl font-bold mt-1 md:mt-2">{formattedAmount}</p>
        <p className="text-xs md:text-sm text-gray-500 mt-1">{date}</p>
        <DollarSign className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 opacity-20 h-8 w-8 md:h-12 md:w-12" />
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
