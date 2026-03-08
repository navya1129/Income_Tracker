import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useBooking } from '../../context/BookingContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Car, User, Shield } from 'lucide-react';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'driver' | 'admin'>('user');
  const { setCurrentUser, drivers } = useBooking();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = {
      id: `u${Date.now()}`,
      name,
      role,
      driverId: role === 'driver' ? drivers[0]?.id : undefined,
    };

    setCurrentUser(user);
    
    if (role === 'user') {
      navigate('/booking');
    } else if (role === 'driver') {
      navigate('/driver-dashboard');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Car className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to RideBook</CardTitle>
          <CardDescription>
            Vehicle and driver booking platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Select Role</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as any)}>
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user" className="flex-1 cursor-pointer flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="font-medium">Customer</div>
                      <div className="text-xs text-gray-500">Book vehicles and drivers</div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="driver" id="driver" />
                  <Label htmlFor="driver" className="flex-1 cursor-pointer flex items-center gap-2">
                    <Car className="h-4 w-4 text-green-600" />
                    <div>
                      <div className="font-medium">Driver</div>
                      <div className="text-xs text-gray-500">Accept and manage ride requests</div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="flex-1 cursor-pointer flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-600" />
                    <div>
                      <div className="font-medium">Administrator</div>
                      <div className="text-xs text-gray-500">Manage all bookings and resources</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
