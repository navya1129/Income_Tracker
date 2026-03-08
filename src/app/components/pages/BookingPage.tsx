import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useBooking, BookingType, Vehicle, Driver } from '../../context/BookingContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { toast } from 'sonner';
import { Car, UserCircle, CalendarIcon, Star, Clock, Users, MapPin, Navigation } from 'lucide-react';
import { format } from 'date-fns';

export default function BookingPage() {
  const { currentUser, vehicles, drivers, createBooking, isAvailable, completePayment } = useBooking();
  const navigate = useNavigate();

  const [bookingType, setBookingType] = useState<BookingType>('vehicle-only');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [pendingBooking, setPendingBooking] = useState<any>(null);

  const availableVehicles = useMemo(() => {
    if (!selectedDate || (bookingType === 'driver-only')) return [];

    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    return vehicles.filter(v => 
      v.capacity >= passengers && 
      isAvailable(v.id, 'vehicle', dateStr, startTime, endTime)
    );
  }, [vehicles, selectedDate, startTime, endTime, passengers, bookingType]);

  const availableDrivers = useMemo(() => {
    if (!selectedDate || bookingType === 'vehicle-only') return [];

    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    return drivers.filter(d => 
      isAvailable(d.id, 'driver', dateStr, startTime, endTime)
    );
  }, [drivers, selectedDate, startTime, endTime, bookingType]);

  const calculateTotalPrice = () => {
    if (!startTime || !endTime) return 0;

    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const hours = (endHour * 60 + endMin - startHour * 60 - startMin) / 60;

    let total = 0;
    if (selectedVehicle) total += selectedVehicle.pricePerHour * hours;
    if (selectedDriver) total += selectedDriver.pricePerHour * hours;

    return Math.round(total * 100) / 100;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }

    if (bookingType !== 'driver-only' && !selectedVehicle) {
      toast.error('Please select a vehicle');
      return;
    }

    if (bookingType !== 'vehicle-only' && !selectedDriver) {
      toast.error('Please select a driver');
      return;
    }

    const booking = {
      userId: currentUser!.id,
      userName: currentUser!.name,
      bookingType,
      pickupLocation,
      destination,
      passengers,
      startDate: format(selectedDate, 'yyyy-MM-dd'),
      startTime,
      endTime,
      vehicleId: selectedVehicle?.id,
      driverId: selectedDriver?.id,
      totalPrice: calculateTotalPrice(),
    };

    setPendingBooking(booking);
    setShowPaymentDialog(true);
  };

  const handlePaymentComplete = () => {
    createBooking(pendingBooking);
    const newBookingId = `b${Date.now()}`;
    
    // Simulate payment completion
    setTimeout(() => {
      completePayment(newBookingId);
    }, 100);

    toast.success('Booking created successfully!');
    setShowPaymentDialog(false);
    navigate('/my-bookings');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Booking</h1>
        <p className="mt-2 text-gray-600">Book a vehicle, driver, or both for your trip</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Booking Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Type</CardTitle>
            <CardDescription>Choose what you need for your trip</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={bookingType} onValueChange={(value) => {
              setBookingType(value as BookingType);
              setSelectedVehicle(null);
              setSelectedDriver(null);
            }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 border-2 rounded-lg p-4 hover:bg-gray-50 cursor-pointer border-blue-200">
                  <RadioGroupItem value="vehicle-only" id="vehicle-only" />
                  <Label htmlFor="vehicle-only" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Car className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Vehicle Only</div>
                        <div className="text-xs text-gray-500">Self-drive option</div>
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border-2 rounded-lg p-4 hover:bg-gray-50 cursor-pointer border-purple-200">
                  <RadioGroupItem value="vehicle-driver" id="vehicle-driver" />
                  <Label htmlFor="vehicle-driver" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        <Car className="h-5 w-5 text-purple-600" />
                        <UserCircle className="h-5 w-5 text-purple-600 -ml-2" />
                      </div>
                      <div>
                        <div className="font-medium">Vehicle + Driver</div>
                        <div className="text-xs text-gray-500">Complete service</div>
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border-2 rounded-lg p-4 hover:bg-gray-50 cursor-pointer border-green-200">
                  <RadioGroupItem value="driver-only" id="driver-only" />
                  <Label htmlFor="driver-only" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium">Driver Only</div>
                        <div className="text-xs text-gray-500">Use your vehicle</div>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Trip Details */}
        <Card>
          <CardHeader>
            <CardTitle>Trip Details</CardTitle>
            <CardDescription>Provide information about your journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickup" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Pickup Location *
                </Label>
                <Input
                  id="pickup"
                  placeholder="Enter pickup address"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination" className="flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  Destination
                </Label>
                <Input
                  id="destination"
                  placeholder="Enter destination (optional)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="passengers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Number of Passengers
              </Label>
              <Input
                id="passengers"
                type="number"
                min="1"
                max="20"
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value))}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Booking Date *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Start Time *
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  End Time *
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Selection */}
        {bookingType !== 'driver-only' && (
          <Card>
            <CardHeader>
              <CardTitle>Select Vehicle</CardTitle>
              <CardDescription>
                {availableVehicles.length} vehicle(s) available for your selected date and time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {availableVehicles.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No vehicles available for the selected date and time. Please try a different time slot.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableVehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      onClick={() => setSelectedVehicle(vehicle)}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedVehicle?.id === vehicle.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={vehicle.imageUrl}
                        alt={vehicle.name}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold text-lg">{vehicle.name}</h3>
                      <p className="text-sm text-gray-600">{vehicle.type}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="secondary">
                          <Users className="h-3 w-3 mr-1" />
                          {vehicle.capacity} seats
                        </Badge>
                        <span className="font-semibold text-blue-600">
                          ${vehicle.pricePerHour}/hr
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Driver Selection */}
        {bookingType !== 'vehicle-only' && (
          <Card>
            <CardHeader>
              <CardTitle>Select Driver</CardTitle>
              <CardDescription>
                {availableDrivers.length} driver(s) available for your selected date and time
              </CardDescription>
            </CardHeader>
            <CardContent>
              {availableDrivers.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No drivers available for the selected date and time. Please try a different time slot.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {availableDrivers.map((driver) => (
                    <div
                      key={driver.id}
                      onClick={() => setSelectedDriver(driver)}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedDriver?.id === driver.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={driver.imageUrl}
                        alt={driver.name}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold">{driver.name}</h3>
                      <p className="text-sm text-gray-600">{driver.experience} yrs exp</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">{driver.rating}</span>
                        <span className="text-xs text-gray-500">({driver.totalRatings})</span>
                      </div>
                      <p className="mt-2 font-semibold text-green-600">
                        ${driver.pricePerHour}/hr
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Price Summary & Submit */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Total Price:</span>
              <span className="text-2xl font-bold text-blue-600">
                ${calculateTotalPrice()}
              </span>
            </div>
            <Button type="submit" size="lg" className="w-full">
              Proceed to Payment
            </Button>
          </CardContent>
        </Card>
      </form>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>
              This is a simulated payment process for demo purposes
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking Type:</span>
                <span className="font-medium capitalize">
                  {bookingType.replace('-', ' ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">
                  {selectedDate && format(selectedDate, 'PPP')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{startTime} - {endTime}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-xl font-bold text-blue-600">
                  ${calculateTotalPrice()}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Card Number (Demo)</Label>
              <Input placeholder="4111 1111 1111 1111" disabled />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Expiry (Demo)</Label>
                <Input placeholder="12/25" disabled />
              </div>
              <div className="space-y-2">
                <Label>CVV (Demo)</Label>
                <Input placeholder="123" disabled />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePaymentComplete}>
              Complete Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
