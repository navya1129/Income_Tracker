import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type BookingType = 'vehicle-only' | 'vehicle-driver' | 'driver-only';

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  capacity: number;
  pricePerHour: number;
  imageUrl: string;
}

export interface Driver {
  id: string;
  name: string;
  experience: number;
  rating: number;
  pricePerHour: number;
  imageUrl: string;
  totalRatings: number;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  bookingType: BookingType;
  pickupLocation: string;
  destination: string;
  passengers: number;
  startDate: string;
  startTime: string;
  endTime: string;
  vehicleId?: string;
  driverId?: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  totalPrice: number;
  createdAt: string;
  driverRating?: number;
  paymentStatus: 'pending' | 'paid';
}

export interface User {
  id: string;
  name: string;
  role: 'user' | 'driver' | 'admin';
  driverId?: string;
}

interface BookingContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  vehicles: Vehicle[];
  drivers: Driver[];
  bookings: Booking[];
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status' | 'paymentStatus'>) => void;
  acceptBooking: (bookingId: string, driverId: string) => void;
  rateDriver: (bookingId: string, rating: number) => void;
  cancelBooking: (bookingId: string) => void;
  completePayment: (bookingId: string) => void;
  isAvailable: (
    resourceId: string,
    resourceType: 'vehicle' | 'driver',
    date: string,
    startTime: string,
    endTime: string,
    excludeBookingId?: string
  ) => boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'v1',
    name: 'Toyota Camry',
    type: 'Sedan',
    capacity: 4,
    pricePerHour: 15,
    imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
  },
  {
    id: 'v2',
    name: 'Honda CR-V',
    type: 'SUV',
    capacity: 6,
    pricePerHour: 25,
    imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
  },
  {
    id: 'v3',
    name: 'Ford Transit',
    type: 'Van',
    capacity: 12,
    pricePerHour: 40,
    imageUrl: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=400',
  },
  {
    id: 'v4',
    name: 'Tesla Model 3',
    type: 'Electric Sedan',
    capacity: 4,
    pricePerHour: 30,
    imageUrl: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=400',
  },
  {
    id: 'v5',
    name: 'BMW X5',
    type: 'Luxury SUV',
    capacity: 5,
    pricePerHour: 50,
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
  },
];

const MOCK_DRIVERS: Driver[] = [
  {
    id: 'd1',
    name: 'John Smith',
    experience: 8,
    rating: 4.8,
    pricePerHour: 12,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    totalRatings: 124,
  },
  {
    id: 'd2',
    name: 'Maria Garcia',
    experience: 5,
    rating: 4.9,
    pricePerHour: 10,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    totalRatings: 89,
  },
  {
    id: 'd3',
    name: 'David Chen',
    experience: 12,
    rating: 4.7,
    pricePerHour: 15,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    totalRatings: 201,
  },
  {
    id: 'd4',
    name: 'Sarah Johnson',
    experience: 6,
    rating: 4.9,
    pricePerHour: 11,
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    totalRatings: 156,
  },
];

export function BookingProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [drivers, setDrivers] = useState<Driver[]>(MOCK_DRIVERS);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const createBooking = (booking: Omit<Booking, 'id' | 'createdAt' | 'status' | 'paymentStatus'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `b${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      paymentStatus: 'pending',
    };
    setBookings([...bookings, newBooking]);
  };

  const acceptBooking = (bookingId: string, driverId: string) => {
    setBookings(bookings.map(b => 
      b.id === bookingId 
        ? { ...b, driverId, status: 'accepted' as const }
        : b
    ));
  };

  const rateDriver = (bookingId: string, rating: number) => {
    setBookings(bookings.map(b => 
      b.id === bookingId 
        ? { ...b, driverRating: rating, status: 'completed' as const }
        : b
    ));

    // Update driver's overall rating
    const booking = bookings.find(b => b.id === bookingId);
    if (booking?.driverId) {
      setDrivers(drivers.map(d => {
        if (d.id === booking.driverId) {
          const newTotalRatings = d.totalRatings + 1;
          const newRating = ((d.rating * d.totalRatings) + rating) / newTotalRatings;
          return {
            ...d,
            rating: Math.round(newRating * 10) / 10,
            totalRatings: newTotalRatings,
          };
        }
        return d;
      }));
    }
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(bookings.map(b => 
      b.id === bookingId 
        ? { ...b, status: 'cancelled' as const }
        : b
    ));
  };

  const completePayment = (bookingId: string) => {
    setBookings(bookings.map(b => 
      b.id === bookingId 
        ? { ...b, paymentStatus: 'paid' as const }
        : b
    ));
  };

  const isAvailable = (
    resourceId: string,
    resourceType: 'vehicle' | 'driver',
    date: string,
    startTime: string,
    endTime: string,
    excludeBookingId?: string
  ): boolean => {
    const relevantBookings = bookings.filter(b => {
      if (b.status === 'cancelled') return false;
      if (excludeBookingId && b.id === excludeBookingId) return false;
      if (b.startDate !== date) return false;

      const isRelevantResource = resourceType === 'vehicle' 
        ? b.vehicleId === resourceId 
        : b.driverId === resourceId;

      return isRelevantResource;
    });

    for (const booking of relevantBookings) {
      const bookingStart = booking.startTime;
      const bookingEnd = booking.endTime;

      // Check for time overlap
      if (
        (startTime >= bookingStart && startTime < bookingEnd) ||
        (endTime > bookingStart && endTime <= bookingEnd) ||
        (startTime <= bookingStart && endTime >= bookingEnd)
      ) {
        return false;
      }
    }

    return true;
  };

  return (
    <BookingContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        vehicles: MOCK_VEHICLES,
        drivers,
        bookings,
        createBooking,
        acceptBooking,
        rateDriver,
        cancelBooking,
        completePayment,
        isAvailable,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}
