import { useState } from 'react';
import { useFinance, Category } from '../../context/FinanceContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { formatIndianCurrency } from '../../utils/currency';
import { Target, TrendingUp, AlertCircle, CheckCircle, Edit } from 'lucide-react';

export default function BudgetManagement() {
  const { budgets, updateBudget } = useFinance();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newLimit, setNewLimit] = useState('');

  const handleUpdateBudget = (category: Category) => {
    if (!newLimit || parseFloat(newLimit) < 0) {
      toast.error('Please enter a valid budget amount');
      return;
    }

    updateBudget(category, parseFloat(newLimit));
    toast.success(`Budget updated for ${category}`);
    setEditingCategory(null);
    setNewLimit('');
  };

  const startEditing = (category: Category, currentLimit: number) => {
    setEditingCategory(category);
    setNewLimit(currentLimit.toString());
  };

  const getBudgetStatus = (spent: number, limit: number) => {
    if (limit === 0) return 'not-set';
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) return 'exceeded';
    if (percentage >= 80) return 'warning';
    return 'good';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-orange-600';
      case 'exceeded': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 border-green-200';
      case 'warning': return 'bg-orange-100 border-orange-200';
      case 'exceeded': return 'bg-red-100 border-red-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = Math.max(0, totalBudget - totalSpent);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Budget Management</h1>
        <p className="text-gray-600">Set and track your spending limits</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-700">Total Budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-blue-600">{formatIndianCurrency(totalBudget)}</p>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-orange-700">Total Spent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-orange-600">{formatIndianCurrency(totalSpent)}</p>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-green-700">Remaining</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-green-600">{formatIndianCurrency(totalRemaining)}</p>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Overall Budget Progress</CardTitle>
          <CardDescription>
            {totalBudget > 0 
              ? `You've spent ${((totalSpent / totalBudget) * 100).toFixed(0)}% of your total budget`
              : 'Set budgets for your categories to start tracking'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress 
              value={totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0} 
              className="h-4"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Spent: {formatIndianCurrency(totalSpent)}</span>
              <span>Budget: {formatIndianCurrency(totalBudget)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {budgets.map((budget) => {
          const status = getBudgetStatus(budget.spent, budget.limit);
          const percentage = budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0;
          const remaining = Math.max(0, budget.limit - budget.spent);
          const isEditing = editingCategory === budget.category;

          return (
            <Card 
              key={budget.category} 
              className={`border-2 ${getStatusBgColor(status)}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      status === 'exceeded' ? 'bg-red-200' :
                      status === 'warning' ? 'bg-orange-200' :
                      status === 'good' ? 'bg-green-200' : 'bg-gray-200'
                    }`}>
                      {status === 'exceeded' ? (
                        <AlertCircle className={`h-5 w-5 ${getStatusColor(status)}`} />
                      ) : status === 'good' ? (
                        <CheckCircle className={`h-5 w-5 ${getStatusColor(status)}`} />
                      ) : (
                        <Target className={`h-5 w-5 ${getStatusColor(status)}`} />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{budget.category}</CardTitle>
                      {status === 'exceeded' && (
                        <Badge variant="destructive" className="mt-1">Over Budget</Badge>
                      )}
                      {status === 'warning' && (
                        <Badge className="mt-1 bg-orange-500">Nearing Limit</Badge>
                      )}
                      {status === 'good' && budget.limit > 0 && (
                        <Badge className="mt-1 bg-green-500">On Track</Badge>
                      )}
                      {budget.limit === 0 && (
                        <Badge variant="outline" className="mt-1">Not Set</Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEditing(budget.category, budget.limit)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor={`budget-${budget.category}`}>Monthly Budget Limit (₹)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                        <Input
                          id={`budget-${budget.category}`}
                          type="number"
                          step="0.01"
                          min="0"
                          value={newLimit}
                          onChange={(e) => setNewLimit(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleUpdateBudget(budget.category)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingCategory(null);
                          setNewLimit('');
                        }}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Spent</p>
                        <p className={`text-2xl font-bold ${getStatusColor(status)}`}>
                          {formatIndianCurrency(budget.spent)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Budget</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatIndianCurrency(budget.limit)}
                        </p>
                      </div>
                    </div>

                    {budget.limit > 0 && (
                      <>
                        <Progress 
                          value={Math.min(percentage, 100)} 
                          className={`h-3 ${
                            status === 'exceeded' ? '[&>div]:bg-red-600' :
                            status === 'warning' ? '[&>div]:bg-orange-500' :
                            '[&>div]:bg-green-600'
                          }`}
                        />
                        
                        <div className="flex justify-between text-sm">
                          <span className={getStatusColor(status)}>
                            {percentage.toFixed(0)}% used
                          </span>
                          <span className="text-gray-600">
                            {formatIndianCurrency(remaining)} left
                          </span>
                        </div>
                      </>
                    )}

                    {budget.limit === 0 && (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        No budget set. Click edit to set a limit.
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Help Card */}
      <Card className="mt-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Budget Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Set realistic budgets based on your past spending patterns</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Review and adjust your budgets monthly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Aim to stay under 80% of your budget to have a buffer</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Use the Analytics page to understand your spending trends</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}