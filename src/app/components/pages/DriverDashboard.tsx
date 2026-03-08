import { useMemo } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { MapPin, Navigation, Users, Calendar, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function DriverDashboard() {
  const { currentUser, bookings, drivers, acceptBooking } = useBooking();

  const currentDriver = drivers.find(d => d.id === currentUser?.driverId);

  const pendingBookings = useMemo(() => {
    return bookings.filter(b => 
      (b.bookingType === 'vehicle-driver' || b.bookingType === 'driver-only') &&
      b.status === 'pending'
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [bookings]);

  const acceptedBookings = useMemo(() => {
    return bookings.filter(b => 
      b.driverId === currentUser?.driverId &&
      (b.status === 'accepted' || b.status === 'completed')
    ).sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }, [bookings, currentUser]);

  const handleAcceptBooking = (bookingId: string) => {
    if (!currentUser?.driverId) {
      toast.error('Driver ID not found');
      return;
    }

    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    // Check if driver is available for this time slot
    const hasConflict = acceptedBookings.some(b => {
      if (b.startDate !== booking.startDate) return false;
      
      const bookingStart = booking.startTime;
      const bookingEnd = booking.endTime;
      const existingStart = b.startTime;
      const existingEnd = b.endTime;

      return (
        (bookingStart >= existingStart && bookingStart < existingEnd) ||
        (bookingEnd > existingStart && bookingEnd <= existingEnd) ||
        (bookingStart <= existingStart && bookingEnd >= existingEnd)
      );
    });

    if (hasConflict) {
      toast.error('You already have a booking during this time slot');
      return;
    }

    acceptBooking(bookingId, currentUser.driverId);
    toast.success('Ride request accepted!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Driver Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your ride requests and accepted bookings</p>
      </div>

      {currentDriver && (
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <img
                src={currentDriver.imageUrl}
                alt={currentDriver.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{currentDriver.name}</h2>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="secondary">
                    {currentDriver.experience} years experience
                  </Badge>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold">{currentDriver.rating}</span>
                    <span className="text-sm text-gray-500">({currentDriver.totalRatings} ratings)</span>
                  </div>
                  <span className="text-green-600 font-semibold">
                    ${currentDriver.pricePerHour}/hr
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Ride Requests */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Available Ride Requests ({pendingBookings.length})
          </h2>
          
          {pendingBookings.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500">No pending ride requests at the moment</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{booking.userName}</CardTitle>
                        <CardDescription>
                          <Badge className="mt-1 capitalize">
                            {booking.bookingType.replace('-', ' + ')}
                          </Badge>
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Pending
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Pickup: {booking.pickupLocation}</div>
                        {booking.destination && (
                          <div className="text-gray-600 flex items-center gap-1 mt-1">
                            <Navigation className="h-3 w-3" />
                            Destination: {booking.destination}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{format(new Date(booking.startDate), 'PPP')}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{booking.startTime} - {booking.endTime}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{booking.passengers} passenger(s)</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span className="font-semibold text-green-600">
                        ${booking.totalPrice} total
                      </span>
                    </div>

                    <div className="pt-3 border-t">
                      <Button 
                        onClick={() => handleAcceptBooking(booking.id)}
                        className="w-full"
                        size="sm"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accept Ride Request
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Accepted Bookings */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            My Accepted Rides ({acceptedBookings.length})
          </h2>
          
          {acceptedBookings.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500">No accepted rides yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {acceptedBookings.map((booking) => (
                <Card key={booking.id} className="border-green-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{booking.userName}</CardTitle>
                        <CardDescription>
                          <Badge className="mt-1 capitalize">
                            {booking.bookingType.replace('-', ' + ')}
                          </Badge>
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={booking.status === 'completed' ? 'secondary' : 'default'}
                        className={booking.status === 'completed' ? 'bg-gray-100' : 'bg-green-100 text-green-700 border-green-200'}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Pickup: {booking.pickupLocation}</div>
                        {booking.destination && (
                          <div className="text-gray-600 flex items-center gap-1 mt-1">
                            <Navigation className="h-3 w-3" />
                            Destination: {booking.destination}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{format(new Date(booking.startDate), 'PPP')}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{booking.startTime} - {booking.endTime}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{booking.passengers} passenger(s)</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span className="font-semibold text-green-600">
                        ${booking.totalPrice}
                      </span>
                    </div>

                    {booking.driverRating && (
                      <div className="pt-3 border-t">
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-gray-600">Your rating:</span>
                          <span className="text-yellow-500">★</span>
                          <span className="font-semibold">{booking.driverRating}/5</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
