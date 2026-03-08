import { Outlet, Link, useNavigate, useLocation } from 'react-router';
import { useFinance } from '../context/FinanceContext';
import { Button } from './ui/button';
import { 
  Wallet, 
  LogOut, 
  LayoutDashboard, 
  Plus, 
  Receipt, 
  BarChart3, 
  Target,
  User
} from 'lucide-react';

export default function Root() {
  const { currentUser, setCurrentUser } = useFinance();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/add-transaction', icon: Plus, label: 'Add Transaction' },
    { path: '/transactions', icon: Receipt, label: 'Transactions' },
    // { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/budgets', icon: Target, label: 'Budgets' },
  ];

  // No sidebar for login page
  if (!currentUser) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-xl">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                FinanceTracker
              </h1>
              <p className="text-xs text-gray-500">Manage your money</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link key={item.path} to={item.path}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    active
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl mb-3">
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-2 rounded-full">
              <User className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 truncate">{currentUser.name}</div>
              <div className="text-xs text-gray-500 truncate">{currentUser.email}</div>
            </div>
          </div>
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="w-full"
            size="sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}