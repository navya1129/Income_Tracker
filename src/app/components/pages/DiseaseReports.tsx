import { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useMedical } from '../../context/MedicalContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  FileText, 
  Hospital,
  ChevronRight,
  Activity
} from 'lucide-react';
import { format } from 'date-fns';

export default function DiseaseReports() {
  const { disease } = useParams();
  const navigate = useNavigate();
  const { currentUser, getAppointmentsByDisease } = useMedical();

  const decodedDisease = disease ? decodeURIComponent(disease) : '';

  const appointments = useMemo(() => {
    if (!currentUser || !decodedDisease) return [];
    return getAppointmentsByDisease(currentUser.id, decodedDisease);
  }, [currentUser, decodedDisease, getAppointmentsByDisease]);

  if (!decodedDisease) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">Disease category not found</p>
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

      {/* Header */}
      <Card className="mb-8 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="bg-purple-600 p-4 rounded-xl">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-3xl mb-2">{decodedDisease}</CardTitle>
              <p className="text-gray-600">
                {appointments.length} {appointments.length === 1 ? 'appointment' : 'appointments'} found
              </p>
            </div>
            <Badge className="bg-purple-600 text-white text-lg px-4 py-2">
              {appointments.length} Records
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Info Card */}
      <Card className="mb-6 bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">AI-Categorized Reports</h3>
              <p className="text-sm text-gray-600">
                These appointments have been automatically categorized based on diagnosis, symptoms, and medical reports using AI analysis. This helps you track your health history for specific conditions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Timeline */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical History</h2>
        
        {appointments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No appointments found for this category</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment, index) => (
              <Link key={appointment.id} to={`/appointment/${appointment.id}`}>
                <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-300 cursor-pointer relative">
                  {/* Timeline Indicator */}
                  {index < appointments.length - 1 && (
                    <div className="absolute left-8 top-full h-4 w-0.5 bg-purple-200 hidden md:block"></div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Date */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-purple-100 p-2 rounded-lg">
                            <Calendar className="h-5 w-5 text-purple-600" />
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

                        {/* Hospital */}
                        <div className="flex items-center gap-2 mb-2 ml-11">
                          <Hospital className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            {appointment.hospitalName}
                          </span>
                        </div>

                        {/* Doctor */}
                        <div className="flex items-center gap-2 mb-3 ml-11">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {appointment.doctorName}
                          </span>
                        </div>

                        {/* Problem Summary */}
                        <div className="ml-11 mb-3">
                          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <p className="text-sm font-medium text-gray-900 mb-1">Problem</p>
                            <p className="text-sm text-gray-600">{appointment.problemSummary}</p>
                          </div>
                        </div>

                        {/* Diagnosis */}
                        <div className="ml-11 mb-3">
                          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                            <p className="text-sm font-medium text-gray-900 mb-1">Diagnosis</p>
                            <p className="text-sm text-gray-600">{appointment.diagnosis}</p>
                          </div>
                        </div>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 ml-11">
                          {appointment.diseaseCategory.map((cat, idx) => (
                            <Badge 
                              key={idx} 
                              variant="outline"
                              className={cat === decodedDisease ? 'bg-purple-100 text-purple-700 border-purple-300' : ''}
                            >
                              {cat}
                            </Badge>
                          ))}
                        </div>

                        {/* Medicines Count */}
                        {appointment.medicines.length > 0 && (
                          <div className="ml-11 mt-3">
                            <Badge variant="secondary">
                              {appointment.medicines.length} {appointment.medicines.length === 1 ? 'Medicine' : 'Medicines'} Prescribed
                            </Badge>
                          </div>
                        )}
                      </div>

                      <ChevronRight className="h-6 w-6 text-gray-400 flex-shrink-0 ml-4" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
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
