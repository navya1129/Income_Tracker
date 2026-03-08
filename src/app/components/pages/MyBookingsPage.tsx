import { useMemo, useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner';
import { MapPin, Navigation, Users, Calendar, Clock, DollarSign, Star, XCircle, Car, UserCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function MyBookingsPage() {
  const { currentUser, bookings, vehicles, drivers, rateDriver, cancelBooking } = useBooking();
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const myBookings = useMemo(() => {
    if (currentUser?.role === 'driver') {
      return bookings.filter(b => b.driverId === currentUser.driverId);
    }
    return bookings.filter(b => b.userId === currentUser?.id);
  }, [bookings, currentUser]);

  const upcomingBookings = useMemo(() => {
    const now = new Date();
    return myBookings.filter(b => {
      if (b.status === 'cancelled') return false;
      const bookingDate = new Date(`${b.startDate}T${b.startTime}`);
      return bookingDate >= now;
    }).sort((a, b) => new Date(`${a.startDate}T${a.startTime}`).getTime() - new Date(`${b.startDate}T${b.startTime}`).getTime());
  }, [myBookings]);

  const pastBookings = useMemo(() => {
    const now = new Date();
    return myBookings.filter(b => {
      const bookingDate = new Date(`${b.startDate}T${b.startTime}`);
      return bookingDate < now || b.status === 'cancelled';
    }).sort((a, b) => new Date(`${b.startDate}T${b.startTime}`).getTime() - new Date(`${a.startDate}T${a.startTime}`).getTime());
  }, [myBookings]);

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(bookingId);
      toast.success('Booking cancelled successfully');
    }
  };

  const handleRateDriver = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (selectedBooking) {
      rateDriver(selectedBooking, rating);
      toast.success('Thank you for your feedback!');
      setShowRatingDialog(false);
      setRating(0);
      setSelectedBooking(null);
    }
  };

  const getVehicleName = (vehicleId?: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle?.name || 'N/A';
  };

  const getDriverName = (driverId?: string) => {
    const driver = drivers.find(d => d.id === driverId);
    return driver?.name || 'Not assigned';
  };

  const renderBookingCard = (booking: any, isPast: boolean) => (
    <Card key={booking.id} className={`hover:shadow-lg transition-shadow ${
      booking.status === 'cancelled' ? 'opacity-60' : ''
    }`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">
                {format(new Date(booking.startDate), 'PPP')}
              </CardTitle>
              <Badge className="capitalize">
                {booking.bookingType.replace('-', ' + ')}
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              {booking.startTime} - {booking.endTime}
            </CardDescription>
          </div>
          <Badge 
            variant={
              booking.status === 'accepted' ? 'default' :
              booking.status === 'completed' ? 'secondary' :
              booking.status === 'cancelled' ? 'destructive' :
              'outline'
            }
            className={
              booking.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
              booking.status === 'accepted' ? 'bg-green-100 text-green-700 border-green-200' :
              ''
            }
          >
            {booking.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="font-medium">Pickup: {booking.pickupLocation}</div>
            {booking.destination && (
              <div className="text-gray-600 flex items-center gap-1 mt-1">
                <Navigation className="h-3 w-3" />
                Destination: {booking.destination}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span>{booking.passengers} passenger(s)</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span className="font-semibold text-green-600">
              ${booking.totalPrice}
            </span>
          </div>
        </div>

        {booking.vehicleId && (
          <div className="flex items-center gap-2 text-sm bg-blue-50 p-2 rounded">
            <Car className="h-4 w-4 text-blue-600" />
            <span><strong>Vehicle:</strong> {getVehicleName(booking.vehicleId)}</span>
          </div>
        )}

        {booking.driverId && (
          <div className="flex items-center gap-2 text-sm bg-purple-50 p-2 rounded">
            <UserCircle className="h-4 w-4 text-purple-600" />
            <span><strong>Driver:</strong> {getDriverName(booking.driverId)}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Payment:</span>
          <Badge variant={booking.paymentStatus === 'paid' ? 'default' : 'outline'}>
            {booking.paymentStatus}
          </Badge>
        </div>

        {booking.driverRating && (
          <div className="bg-yellow-50 p-2 rounded flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span>You rated this ride: <strong>{booking.driverRating}/5</strong></span>
          </div>
        )}

        <div className="flex gap-2 pt-2 border-t">
          {!isPast && booking.status !== 'cancelled' && (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => handleCancelBooking(booking.id)}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Cancel Booking
            </Button>
          )}

          {isPast && booking.status === 'accepted' && !booking.driverRating && booking.driverId && currentUser?.role !== 'driver' && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setSelectedBooking(booking.id);
                setShowRatingDialog(true);
              }}
            >
              <Star className="h-4 w-4 mr-2" />
              Rate Driver
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {currentUser?.role === 'driver' ? 'My Rides' : 'My Bookings'}
        </h1>
        <p className="mt-2 text-gray-600">
          View and manage your {currentUser?.role === 'driver' ? 'rides' : 'bookings'}
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingBookings.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500">No upcoming bookings</p>
                {currentUser?.role !== 'driver' && (
                  <Button className="mt-4" onClick={() => window.location.href = '/booking'}>
                    Create New Booking
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingBookings.map((booking) => renderBookingCard(booking, false))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastBookings.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500">No past bookings</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pastBookings.map((booking) => renderBookingCard(booking, true))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate Your Driver</DialogTitle>
            <DialogDescription>
              How was your experience with the driver?
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-12 w-12 ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center mt-4 text-lg font-medium">
                {rating} out of 5 stars
              </p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowRatingDialog(false);
              setRating(0);
              setSelectedBooking(null);
            }}>
              Cancel
            </Button>
            <Button onClick={handleRateDriver}>
              Submit Rating
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
