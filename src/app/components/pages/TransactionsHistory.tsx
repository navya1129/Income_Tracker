import { useState, useMemo } from 'react';
import { useFinance, Category } from '../../context/FinanceContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { formatIndianCurrency } from '../../utils/currency';
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';

export default function TransactionsHistory() {
  const { transactions, updateTransaction, deleteTransaction } = useFinance();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  
  // Edit form state
  const [editAmount, setEditAmount] = useState('');
  const [editCategory, setEditCategory] = useState<Category>('Food');
  const [editDate, setEditDate] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = 
        transaction.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
      const matchesType = filterType === 'all' || transaction.type === filterType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [transactions, searchQuery, filterCategory, filterType]);

  const handleEdit = (transaction: any) => {
    setEditingTransaction(transaction);
    setEditAmount(transaction.amount.toString());
    setEditCategory(transaction.category);
    setEditDate(transaction.date);
    setEditNotes(transaction.notes);
  };

  const handleUpdateSubmit = () => {
    if (!editAmount || parseFloat(editAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    updateTransaction(editingTransaction.id, {
      type: editingTransaction.type,
      amount: parseFloat(editAmount),
      category: editCategory,
      date: editDate,
      notes: editNotes,
    });

    toast.success('Transaction updated successfully!');
    setEditingTransaction(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
      toast.success('Transaction deleted successfully!');
    }
  };

  const allCategories = Array.from(new Set(transactions.map(t => t.category)));

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transactions History</h1>
        <p className="text-gray-600">View and manage all your transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-2 border-gray-200">
          <CardHeader className="pb-2">
            <CardDescription>Total Transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-900">{filteredTransactions.length}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-700">Total Income</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{formatIndianCurrency(totalIncome)}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-red-700">Total Expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{formatIndianCurrency(totalExpenses)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filter by Category */}
            <div className="space-y-2">
              <Label htmlFor="category-filter">Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger id="category-filter">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {allCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filter by Type */}
            <div className="space-y-2">
              <Label htmlFor="type-filter">Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger id="type-filter">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>Complete list of your financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length > 0 ? (
            <div className="space-y-3">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'income' 
                        ? 'bg-blue-100' 
                        : 'bg-red-100'
                    }`}>
                      {transaction.type === 'income' ? (
                        <ArrowUpRight className="h-5 w-5 text-blue-600" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900">{transaction.category}</p>
                        <Badge variant="outline" className="text-xs">
                          {transaction.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{transaction.notes || 'No notes'}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <p className="text-xs text-gray-500">
                          {format(new Date(transaction.date), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className={`text-xl font-bold ${
                        transaction.type === 'income' ? 'text-blue-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatIndianCurrency(transaction.amount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(transaction)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No transactions found
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingTransaction} onOpenChange={() => setEditingTransaction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
            <DialogDescription>Update the transaction details</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-amount">Amount (₹ INR) *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                <Input
                  id="edit-amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-category">Category *</Label>
              <Select value={editCategory} onValueChange={(value) => setEditCategory(value as Category)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {allCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-date">Date *</Label>
              <Input
                id="edit-date"
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTransaction(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateSubmit} className="bg-emerald-600 hover:bg-emerald-700">
              Update Transaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}