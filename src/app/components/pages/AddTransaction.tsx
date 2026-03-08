import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useFinance, TransactionType, Category } from '../../context/FinanceContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { toast } from 'sonner';
import { ArrowLeft, Plus, TrendingUp, TrendingDown } from 'lucide-react';

const EXPENSE_CATEGORIES: Category[] = ['Food', 'Transport', 'Rent', 'Groceries', 'Shopping', 'Bills', 'Entertainment', 'Medical', 'Others'];
const INCOME_CATEGORIES: Category[] = ['Salary', 'Freelance', 'Investment', 'Others'];

export default function AddTransaction() {
  const navigate = useNavigate();
  const { addTransaction } = useFinance();

  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!category) {
      toast.error('Please select a category');
      return;
    }

    addTransaction({
      type,
      amount: parseFloat(amount),
      category,
      date,
      notes,
    });

    toast.success('Transaction added successfully!');
    navigate('/dashboard');
  };

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Header */}
      <Button
        variant="ghost"
        onClick={() => navigate('/dashboard')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Transaction</h1>
        <p className="text-gray-600">Record a new income or expense</p>
      </div>

      {/* Form */}
      <Card className="border-2 border-emerald-200">
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription>Fill in the information about your transaction</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transaction Type */}
            <div className="space-y-3">
              <Label>Transaction Type</Label>
              <RadioGroup value={type} onValueChange={(value) => {
                setType(value as TransactionType);
                setCategory(value === 'income' ? 'Salary' : 'Food');
              }}>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className={`flex items-center space-x-2 border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      type === 'income' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <RadioGroupItem value="income" id="income" />
                    <Label htmlFor="income" className="flex-1 cursor-pointer flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Income</div>
                        <div className="text-xs text-gray-500">Money received</div>
                      </div>
                    </Label>
                  </div>

                  <div 
                    className={`flex items-center space-x-2 border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      type === 'expense' 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <RadioGroupItem value="expense" id="expense" />
                    <Label htmlFor="expense" className="flex-1 cursor-pointer flex items-center gap-3">
                      <div className="bg-red-100 p-2 rounded-lg">
                        <TrendingDown className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Expense</div>
                        <div className="text-xs text-gray-500">Money spent</div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹ INR) *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="pl-8 text-lg border-emerald-200 focus:border-emerald-400"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
                <SelectTrigger className="border-emerald-200 focus:border-emerald-400">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="border-emerald-200 focus:border-emerald-400"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="border-emerald-200 focus:border-emerald-400"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}