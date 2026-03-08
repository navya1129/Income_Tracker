import { Link } from 'react-router';
import { useFinance } from '../../context/FinanceContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { formatIndianCurrency } from '../../utils/currency';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function FinanceDashboard() {
  const {
    getTotalBalance,
    getMonthlyIncome,
    getMonthlyExpenses,
    getSavings,
    getExpensesByCategory,
    getMonthlySpending,
    transactions,
  } = useFinance();

  const totalBalance = getTotalBalance();
  const monthlyIncome = getMonthlyIncome();
  const monthlyExpenses = getMonthlyExpenses();
  const savings = getSavings();
  const expensesByCategory = getExpensesByCategory();
  const monthlySpending = getMonthlySpending();

  const recentTransactions = transactions.slice(0, 5);

  const pieData = expensesByCategory.map(item => ({
    name: item.category,
    value: item.amount,
  }));

  const barData = monthlySpending.map(item => ({
    name: format(new Date(item.month + '-01'), 'MMM yyyy'),
    amount: item.amount,
  }));

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your financial overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-700">Total Balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-emerald-600">
                  {formatIndianCurrency(totalBalance)}
                </p>
              </div>
              <div className="bg-emerald-600 p-3 rounded-xl">
                <Wallet className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-700">Monthly Income</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-blue-600">
                  {formatIndianCurrency(monthlyIncome)}
                </p>
              </div>
              <div className="bg-blue-600 p-3 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-red-700">Monthly Expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-red-600">
                  {formatIndianCurrency(monthlyExpenses)}
                </p>
              </div>
              <div className="bg-red-600 p-3 rounded-xl">
                <TrendingDown className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`border-2 ${savings >= 0 ? 'border-teal-200 bg-gradient-to-br from-teal-50' : 'border-orange-200 bg-gradient-to-br from-orange-50'} to-white`}>
          <CardHeader className="pb-2">
            <CardDescription className={savings >= 0 ? 'text-teal-700' : 'text-orange-700'}>Savings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-3xl font-bold ${savings >= 0 ? 'text-teal-600' : 'text-orange-600'}`}>
                  {formatIndianCurrency(Math.abs(savings))}
                </p>
              </div>
              <div className={`${savings >= 0 ? 'bg-teal-600' : 'bg-orange-600'} p-3 rounded-xl`}>
                <PiggyBank className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Expense Breakdown Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Current month expenses by category</CardDescription>
          </CardHeader>
          <CardContent>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => formatIndianCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No expense data for this month
              </div>
            )}
          </CardContent>
        </Card>

        {/* Monthly Spending Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spending Trends</CardTitle>
            <CardDescription>Last 6 months spending overview</CardDescription>
          </CardHeader>
          <CardContent>
            {barData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => formatIndianCurrency(value)} />
                  <Legend />
                  <Bar dataKey="amount" fill="#10b981" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No spending data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activities</CardDescription>
            </div>
            <Link to="/transactions">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentTransactions.length > 0 ? (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
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
                    <div>
                      <p className="font-semibold text-gray-900">{transaction.category}</p>
                      <p className="text-sm text-gray-600">{transaction.notes}</p>
                      <p className="text-xs text-gray-500">{format(new Date(transaction.date), 'MMM dd, yyyy')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      transaction.type === 'income' ? 'text-blue-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatIndianCurrency(transaction.amount)}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {transaction.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No transactions yet
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Action Button */}
      <Link to="/add-transaction">
        <Button 
          size="lg"
          className="fixed bottom-8 right-8 shadow-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Transaction
        </Button>
      </Link>
    </div>
  );
}