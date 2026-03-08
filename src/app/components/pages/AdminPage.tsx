import { useMemo } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Car, UserCircle, Calendar, DollarSign, TrendingUp, Users } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminPage() {
  const { bookings, vehicles, drivers } = useBooking();

  const stats = useMemo(() => {
    const totalBookings = bookings.length;
    const activeBookings = bookings.filter(b => b.status === 'accepted').length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const completedBookings = bookings.filter(b => b.status === 'completed').length;
    const totalRevenue = bookings
      .filter(b => b.status !== 'cancelled')
      .reduce((sum, b) => sum + b.totalPrice, 0);

    return {
      totalBookings,
      activeBookings,
      pendingBookings,
      completedBookings,
      totalRevenue,
      totalVehicles: vehicles.length,
      totalDrivers: drivers.length,
    };
  }, [bookings, vehicles, drivers]);

  const recentBookings = useMemo(() => {
    return [...bookings]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);
  }, [bookings]);

  const vehicleUtilization = useMemo(() => {
    return vehicles.map(vehicle => {
      const bookingCount = bookings.filter(b => 
        b.vehicleId === vehicle.id && b.status !== 'cancelled'
      ).length;
      const revenue = bookings
        .filter(b => b.vehicleId === vehicle.id && b.status !== 'cancelled')
        .reduce((sum, b) => sum + b.totalPrice, 0);
      
      return {
        ...vehicle,
        bookingCount,
        revenue,
      };
    }).sort((a, b) => b.bookingCount - a.bookingCount);
  }, [vehicles, bookings]);

  const driverPerformance = useMemo(() => {
    return drivers.map(driver => {
      const driverBookings = bookings.filter(b => 
        b.driverId === driver.id && b.status !== 'cancelled'
      );
      const completedRides = driverBookings.filter(b => b.status === 'completed').length;
      const revenue = driverBookings.reduce((sum, b) => sum + b.totalPrice, 0);
      
      return {
        ...driver,
        completedRides,
        totalRides: driverBookings.length,
        revenue,
      };
    }).sort((a, b) => b.completedRides - a.completedRides);
  }, [drivers, bookings]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Monitor and manage all bookings, vehicles, and drivers</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.activeBookings} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${stats.totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              From {stats.completedBookings} completed bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Vehicles</CardTitle>
            <Car className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVehicles}</div>
            <p className="text-xs text-gray-500 mt-1">Total fleet size</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Drivers</CardTitle>
            <Users className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDrivers}</div>
            <p className="text-xs text-gray-500 mt-1">Active drivers</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicle Utilization</TabsTrigger>
          <TabsTrigger value="drivers">Driver Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest booking activity across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.userName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize text-xs">
                          {booking.bookingType.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div>{format(new Date(booking.startDate), 'MMM dd, yyyy')}</div>
                        <div className="text-gray-500 text-xs">
                          {booking.startTime} - {booking.endTime}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm max-w-xs truncate">
                        {booking.pickupLocation}
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ${booking.totalPrice}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicles">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Utilization</CardTitle>
              <CardDescription>Performance metrics for each vehicle</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead className="text-right">Total Bookings</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Rate/Hour</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicleUtilization.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.name}</TableCell>
                      <TableCell>{vehicle.type}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          <Users className="h-3 w-3 mr-1" />
                          {vehicle.capacity}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{vehicle.bookingCount}</TableCell>
                      <TableCell className="text-right font-semibold text-green-600">
                        ${vehicle.revenue.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">${vehicle.pricePerHour}/hr</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers">
          <Card>
            <CardHeader>
              <CardTitle>Driver Performance</CardTitle>
              <CardDescription>Performance metrics and ratings for each driver</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Total Rides</TableHead>
                    <TableHead className="text-right">Completed</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {driverPerformance.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell className="font-medium">{driver.name}</TableCell>
                      <TableCell>{driver.experience} years</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="font-medium">{driver.rating}</span>
                          <span className="text-xs text-gray-500">({driver.totalRatings})</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{driver.totalRides}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary">{driver.completedRides}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-green-600">
                        ${driver.revenue.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
