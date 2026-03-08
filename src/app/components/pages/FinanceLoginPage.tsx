import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useFinance } from '../../context/FinanceContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Wallet, TrendingUp, PiggyBank, BarChart3 } from 'lucide-react';

export default function FinanceLoginPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser } = useFinance();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = {
      id: `user${Date.now()}`,
      name: name || 'Demo User',
      email: email || 'demo@financetracker.com',
    };

    setCurrentUser(user);
    navigate('/dashboard');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = {
      id: `user${Date.now()}`,
      name,
      email,
    };

    setCurrentUser(user);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration & Info */}
        <div className="hidden md:block">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-2xl shadow-lg">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                FinanceTracker
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Take control of your financial future with smart money management
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-emerald-100">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Track Income & Expenses</h3>
                <p className="text-sm text-gray-600">Monitor all your financial transactions in one place</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-teal-100">
              <div className="bg-teal-100 p-3 rounded-xl">
                <BarChart3 className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Visual Analytics</h3>
                <p className="text-sm text-gray-600">Beautiful charts and insights about your spending habits</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-cyan-100">
              <div className="bg-cyan-100 p-3 rounded-xl">
                <PiggyBank className="h-6 w-6 text-cyan-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Budget Management</h3>
                <p className="text-sm text-gray-600">Set budgets and stay on track with your financial goals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login/Signup Form */}
        <Card className="shadow-2xl border-2 border-emerald-100">
          <CardHeader className="text-center pb-4">
            <div className="md:hidden flex justify-center mb-4">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-2xl">
                <Wallet className="h-10 w-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">Welcome to FinanceTracker</CardTitle>
            <CardDescription>Manage your personal finances with ease</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-emerald-200 focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-emerald-200 focus:border-emerald-400"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/30"
                  >
                    Login
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    Demo: Just click login to continue
                  </div>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="border-emerald-200 focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-emerald-200 focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-emerald-200 focus:border-emerald-400"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/30"
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500">
                This is a demo application. All data is stored locally in your browser.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
