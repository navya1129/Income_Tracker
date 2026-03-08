import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMedical } from '../../context/MedicalContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Heart, User, Stethoscope } from 'lucide-react';

export default function MedicalLoginPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'patient' | 'receptionist'>('patient');
  const { setCurrentUser } = useMedical();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = {
      id: role === 'patient' ? 'patient1' : `receptionist${Date.now()}`,
      name,
      email,
      role,
      ...(role === 'patient' && { age: 35, bloodType: 'O+' }),
    };

    setCurrentUser(user);
    
    if (role === 'patient') {
      navigate('/dashboard');
    } else {
      navigate('/receptionist');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-green-100 -z-10"></div>
      
      <Card className="w-full max-w-md shadow-xl border-blue-100">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg">
              <Heart className="h-12 w-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            HealthRecord System
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Digital Hospital Record Management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-blue-200 focus:border-blue-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-blue-200 focus:border-blue-400"
              />
            </div>

            <div className="space-y-3">
              <Label>Login As</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as any)}>
                <div className="flex items-center space-x-2 border-2 border-blue-200 rounded-lg p-4 hover:bg-blue-50 cursor-pointer transition-colors">
                  <RadioGroupItem value="patient" id="patient" />
                  <Label htmlFor="patient" className="flex-1 cursor-pointer flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Patient</div>
                      <div className="text-xs text-gray-500">View your medical records</div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border-2 border-green-200 rounded-lg p-4 hover:bg-green-50 cursor-pointer transition-colors">
                  <RadioGroupItem value="receptionist" id="receptionist" />
                  <Label htmlFor="receptionist" className="flex-1 cursor-pointer flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Stethoscope className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Hospital Receptionist</div>
                      <div className="text-xs text-gray-500">Manage patient appointments</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md">
              Login to HealthRecord
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              This is a demo application. All data is stored locally in your browser.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
