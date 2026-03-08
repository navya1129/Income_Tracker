import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TransactionType = 'income' | 'expense';
export type Category = 'Food' | 'Transport' | 'Rent' | 'Groceries' | 'Shopping' | 'Bills' | 'Entertainment' | 'Medical' | 'Salary' | 'Freelance' | 'Investment' | 'Others';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  date: string;
  notes: string;
}

export interface Budget {
  category: Category;
  limit: number;
  spent: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

interface FinanceContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  budgets: Budget[];
  updateBudget: (category: Category, limit: number) => void;
  getTotalBalance: () => number;
  getMonthlyIncome: () => number;
  getMonthlyExpenses: () => number;
  getSavings: () => number;
  getExpensesByCategory: () => { category: string; amount: number }[];
  getMonthlySpending: () => { month: string; amount: number }[];
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    type: 'income',
    amount: 50000,
    category: 'Salary',
    date: '2026-03-01',
    notes: 'Monthly salary',
  },
  {
    id: 't2',
    type: 'expense',
    amount: 3200,
    category: 'Groceries',
    date: '2026-03-02',
    notes: 'Monthly groceries shopping',
  },
  {
    id: 't3',
    type: 'expense',
    amount: 1500,
    category: 'Transport',
    date: '2026-03-03',
    notes: 'Petrol and maintenance',
  },
  {
    id: 't4',
    type: 'expense',
    amount: 15000,
    category: 'Rent',
    date: '2026-03-01',
    notes: 'Monthly house rent',
  },
  {
    id: 't5',
    type: 'expense',
    amount: 2500,
    category: 'Bills',
    date: '2026-03-05',
    notes: 'Electricity and water bills',
  },
  {
    id: 't6',
    type: 'expense',
    amount: 1800,
    category: 'Entertainment',
    date: '2026-03-06',
    notes: 'Movie and dining out',
  },
  {
    id: 't7',
    type: 'income',
    amount: 15000,
    category: 'Freelance',
    date: '2026-03-07',
    notes: 'Web development project',
  },
  {
    id: 't8',
    type: 'expense',
    amount: 2800,
    category: 'Food',
    date: '2026-03-07',
    notes: 'Restaurant and cafe expenses',
  },
  {
    id: 't9',
    type: 'expense',
    amount: 800,
    category: 'Transport',
    date: '2026-02-28',
    notes: 'Auto and metro rides',
  },
  {
    id: 't10',
    type: 'expense',
    amount: 1200,
    category: 'Bills',
    date: '2026-02-25',
    notes: 'Internet and mobile bills',
  },
  {
    id: 't11',
    type: 'expense',
    amount: 5500,
    category: 'Shopping',
    date: '2026-03-04',
    notes: 'Clothing shopping',
  },
  {
    id: 't12',
    type: 'expense',
    amount: 1500,
    category: 'Medical',
    date: '2026-03-03',
    notes: 'Doctor consultation and medicines',
  },
];

const DEFAULT_BUDGETS: Budget[] = [
  { category: 'Food', limit: 5000, spent: 0 },
  { category: 'Transport', limit: 3000, spent: 0 },
  { category: 'Rent', limit: 15000, spent: 0 },
  { category: 'Groceries', limit: 8000, spent: 0 },
  { category: 'Shopping', limit: 6000, spent: 0 },
  { category: 'Bills', limit: 4000, spent: 0 },
  { category: 'Entertainment', limit: 3000, spent: 0 },
  { category: 'Medical', limit: 2000, spent: 0 },
  { category: 'Others', limit: 2000, spent: 0 },
];

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('financeCurrentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('financeTransactions');
    return saved ? JSON.parse(saved) : MOCK_TRANSACTIONS;
  });

  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const saved = localStorage.getItem('financeBudgets');
    return saved ? JSON.parse(saved) : DEFAULT_BUDGETS;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('financeCurrentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('financeCurrentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('financeTransactions', JSON.stringify(transactions));
    updateBudgetSpent();
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('financeBudgets', JSON.stringify(budgets));
  }, [budgets]);

  const updateBudgetSpent = () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthlyExpenses = transactions.filter(
      t => t.type === 'expense' && t.date.startsWith(currentMonth)
    );

    const updatedBudgets = budgets.map(budget => {
      const spent = monthlyExpenses
        .filter(t => t.category === budget.category)
        .reduce((sum, t) => sum + t.amount, 0);
      return { ...budget, spent };
    });

    setBudgets(updatedBudgets);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `t${Date.now()}`,
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const updateTransaction = (id: string, transaction: Omit<Transaction, 'id'>) => {
    setTransactions(
      transactions.map(t => (t.id === id ? { ...transaction, id } : t))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const updateBudget = (category: Category, limit: number) => {
    setBudgets(
      budgets.map(b => (b.category === category ? { ...b, limit } : b))
    );
  };

  const getTotalBalance = () => {
    return transactions.reduce((total, t) => {
      return t.type === 'income' ? total + t.amount : total - t.amount;
    }, 0);
  };

  const getMonthlyIncome = () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    return transactions
      .filter(t => t.type === 'income' && t.date.startsWith(currentMonth))
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getMonthlyExpenses = () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    return transactions
      .filter(t => t.type === 'expense' && t.date.startsWith(currentMonth))
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getSavings = () => {
    return getMonthlyIncome() - getMonthlyExpenses();
  };

  const getExpensesByCategory = () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const expenses = transactions.filter(
      t => t.type === 'expense' && t.date.startsWith(currentMonth)
    );

    const categoryMap = new Map<string, number>();
    expenses.forEach(t => {
      const current = categoryMap.get(t.category) || 0;
      categoryMap.set(t.category, current + t.amount);
    });

    return Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category,
      amount,
    }));
  };

  const getMonthlySpending = () => {
    const monthlyMap = new Map<string, number>();
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const month = t.date.slice(0, 7);
        const current = monthlyMap.get(month) || 0;
        monthlyMap.set(month, current + t.amount);
      });

    return Array.from(monthlyMap.entries())
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6);
  };

  return (
    <FinanceContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        budgets,
        updateBudget,
        getTotalBalance,
        getMonthlyIncome,
        getMonthlyExpenses,
        getSavings,
        getExpensesByCategory,
        getMonthlySpending,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
}