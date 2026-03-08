import { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useMedical } from '../../context/MedicalContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, Calendar, User, FileText, ChevronRight, MapPin } from 'lucide-react';
import { format } from 'date-fns';

export default function HospitalHistory() {
  const { hospitalId } = useParams();
  const navigate = useNavigate();
  const { currentUser, hospitals, getAppointmentsByHospital } = useMedical();

  const hospital = useMemo(() => {
    return hospitals.find(h => h.id === hospitalId);
  }, [hospitals, hospitalId]);

  const appointments = useMemo(() => {
    if (!currentUser || !hospitalId) return [];
    return getAppointmentsByHospital(currentUser.id, hospitalId);
  }, [currentUser, hospitalId, getAppointmentsByHospital]);

  if (!hospital) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">Hospital not found</p>
            <Button onClick={() => navigate('/dashboard')} className="mt-4">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/dashboard')}
        className="mb-6 hover:bg-blue-50"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      {/* Hospital Header */}
      <Card className="mb-8 border-2 border-blue-200">
        <div className="relative h-64 overflow-hidden rounded-t-lg">
          <img
            src={hospital.imageUrl}
            alt={hospital.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{hospital.name}</h1>
            <p className="flex items-center gap-2 text-white/90">
              <MapPin className="h-4 w-4" />
              {hospital.location}
            </p>
          </div>
        </div>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className="text-lg font-semibold">
                {appointments.length} {appointments.length === 1 ? 'Appointment' : 'Appointments'}
              </span>
            </div>
            <Badge className="bg-blue-600 text-white">
              Total Visits: {appointments.length}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Appointment History</h2>
        
        {appointments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No appointments found at this hospital</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Link key={appointment.id} to={`/appointment/${appointment.id}`}>
                <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-300 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Calendar className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {format(new Date(appointment.date), 'MMMM dd, yyyy')}
                            </CardTitle>
                            <p className="text-sm text-gray-500">
                              {format(new Date(appointment.date), 'EEEE')}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            {appointment.doctorName}
                          </span>
                        </div>

                        <div className="flex items-start gap-2 mb-3">
                          <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                          <p className="text-sm text-gray-600">{appointment.problemSummary}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {appointment.diseaseCategory.map((disease, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {disease}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <ChevronRight className="h-6 w-6 text-gray-400 flex-shrink-0 ml-4" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      View Full Details
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
