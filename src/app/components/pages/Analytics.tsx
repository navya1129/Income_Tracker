import { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { formatIndianCurrency } from '../../utils/currency';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { format } from 'date-fns';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export default function Analytics() {
  const { 
    transactions, 
    getExpensesByCategory, 
    getMonthlySpending,
    getMonthlyIncome,
    getMonthlyExpenses,
    budgets
  } = useFinance();

  const expensesByCategory = getExpensesByCategory();
  const monthlySpending = getMonthlySpending();
  const monthlyIncome = getMonthlyIncome();
  const monthlyExpenses = getMonthlyExpenses();

  // Calculate income vs expenses over time
  const monthlyComparison = useMemo(() => {
    const monthMap = new Map<string, { income: number; expenses: number }>();

    transactions.forEach(t => {
      const month = t.date.slice(0, 7);
      const current = monthMap.get(month) || { income: 0, expenses: 0 };
      
      if (t.type === 'income') {
        current.income += t.amount;
      } else {
        current.expenses += t.amount;
      }
      
      monthMap.set(month, current);
    });

    return Array.from(monthMap.entries())
      .map(([month, data]) => ({
        month: format(new Date(month + '-01'), 'MMM yyyy'),
        income: data.income,
        expenses: data.expenses,
      }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6);
  }, [transactions]);

  // Budget vs Actual
  const budgetComparison = useMemo(() => {
    return budgets
      .filter(b => b.limit > 0)
      .map(b => ({
        category: b.category,
        budget: b.limit,
        spent: b.spent,
        remaining: Math.max(0, b.limit - b.spent),
      }));
  }, [budgets]);

  // Pie chart data
  const pieData = expensesByCategory.map(item => ({
    name: item.category,
    value: item.amount,
  }));

  // Top spending categories
  const topCategories = useMemo(() => {
    return [...expensesByCategory]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [expensesByCategory]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">Deep insights into your spending patterns</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-700">This Month Income</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-emerald-600">{formatIndianCurrency(monthlyIncome)}</p>
              <TrendingUp className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-red-700">This Month Expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-red-600">{formatIndianCurrency(monthlyExpenses)}</p>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-700">Average Daily Spending</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-blue-600">
                {formatIndianCurrency(monthlyExpenses / new Date().getDate())}
              </p>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Expense Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Distribution</CardTitle>
            <CardDescription>Current month breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
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
              <div className="h-[350px] flex items-center justify-center text-gray-500">
                No expense data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Spending Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Top Spending Categories</CardTitle>
            <CardDescription>Your highest expense categories this month</CardDescription>
          </CardHeader>
          <CardContent>
            {topCategories.length > 0 ? (
              <div className="space-y-4">
                {topCategories.map((category, index) => {
                  const percentage = (category.amount / monthlyExpenses) * 100;
                  return (
                    <div key={category.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span className="font-medium text-gray-900">{category.category}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-gray-900">{formatIndianCurrency(category.amount)}</span>
                          <span className="text-sm text-gray-500 ml-2">({percentage.toFixed(0)}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: COLORS[index % COLORS.length]
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-[350px] flex items-center justify-center text-gray-500">
                No spending data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Income vs Expenses */}
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>Monthly comparison over last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            {monthlyComparison.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => formatIndianCurrency(value)} />
                  <Legend />
                  <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="Income" />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Monthly Spending Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spending Trend</CardTitle>
            <CardDescription>Your expense trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            {monthlySpending.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlySpending.map(item => ({
                  name: format(new Date(item.month + '-01'), 'MMM yy'),
                  amount: item.amount,
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => formatIndianCurrency(value)} />
                  <Legend />
                  <Bar dataKey="amount" fill="#14b8a6" name="Spending" />
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

      {/* Budget vs Actual */}
      <Card>
        <CardHeader>
          <CardTitle>Budget vs Actual Spending</CardTitle>
          <CardDescription>How you're tracking against your budgets this month</CardDescription>
        </CardHeader>
        <CardContent>
          {budgetComparison.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={budgetComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value: any) => formatIndianCurrency(value)} />
                <Legend />
                <Bar dataKey="budget" fill="#94a3b8" name="Budget" />
                <Bar dataKey="spent" fill="#10b981" name="Spent" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[400px] flex items-center justify-center text-gray-500">
              No budget data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}