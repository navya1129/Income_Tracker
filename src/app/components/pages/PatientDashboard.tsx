import { useMemo } from 'react';
import { Link } from 'react-router';
import { useMedical } from '../../context/MedicalContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Hospital, 
  MapPin, 
  Calendar, 
  Activity, 
  FileText, 
  TrendingUp,
  Pill,
  Thermometer,
  Heart,
  Stethoscope
} from 'lucide-react';

const DISEASE_ICONS: Record<string, any> = {
  'Fever': Thermometer,
  'Diabetes': Activity,
  'Stomach Issues': Heart,
  'Dental Problems': Stethoscope,
  'Viral Infection': Pill,
  'Chronic Disease': TrendingUp,
  'Digestive System': Heart,
  'Oral Health': Stethoscope,
  'Preventive Care': FileText,
  'General Health': Activity,
};

const DISEASE_COLORS: Record<string, string> = {
  'Fever': 'bg-red-100 text-red-700 border-red-200',
  'Diabetes': 'bg-purple-100 text-purple-700 border-purple-200',
  'Stomach Issues': 'bg-orange-100 text-orange-700 border-orange-200',
  'Dental Problems': 'bg-blue-100 text-blue-700 border-blue-200',
  'Viral Infection': 'bg-pink-100 text-pink-700 border-pink-200',
  'Chronic Disease': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Digestive System': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Oral Health': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'Preventive Care': 'bg-green-100 text-green-700 border-green-200',
  'General Health': 'bg-teal-100 text-teal-700 border-teal-200',
};

export default function PatientDashboard() {
  const { currentUser, getHospitalVisits, getDiseaseCategories, appointments } = useMedical();

  const hospitalVisits = useMemo(() => {
    if (!currentUser) return [];
    return getHospitalVisits(currentUser.id);
  }, [currentUser, getHospitalVisits]);

  const diseaseCategories = useMemo(() => {
    if (!currentUser) return [];
    return getDiseaseCategories(currentUser.id);
  }, [currentUser, getDiseaseCategories]);

  const totalAppointments = useMemo(() => {
    if (!currentUser) return 0;
    return appointments.filter(a => a.patientId === currentUser.id).length;
  }, [currentUser, appointments]);

  if (!currentUser) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser.name}</h1>
        <p className="mt-2 text-gray-600">Your complete medical history across all hospitals</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Appointments</p>
                <p className="text-3xl font-bold text-blue-600">{totalAppointments}</p>
              </div>
              <div className="bg-blue-600 p-3 rounded-xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hospitals Visited</p>
                <p className="text-3xl font-bold text-green-600">{hospitalVisits.length}</p>
              </div>
              <div className="bg-green-600 p-3 rounded-xl">
                <Hospital className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Health Categories</p>
                <p className="text-3xl font-bold text-purple-600">{diseaseCategories.length}</p>
              </div>
              <div className="bg-purple-600 p-3 rounded-xl">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hospitals Visited Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Hospitals Visited</h2>
            <p className="text-gray-600 mt-1">View your appointment history at each hospital</p>
          </div>
        </div>

        {hospitalVisits.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Hospital className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No hospital visits recorded yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitalVisits.map(({ hospital, visitCount }) => (
              <Link key={hospital.id} to={`/hospital/${hospital.id}`}>
                <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300 cursor-pointer h-full">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={hospital.imageUrl}
                      alt={hospital.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-blue-600 text-white">
                        {visitCount} {visitCount === 1 ? 'Visit' : 'Visits'}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-2">
                      <Hospital className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span>{hospital.name}</span>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <MapPin className="h-4 w-4" />
                      {hospital.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      View Appointments
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Disease-Based Reports Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Health Categories</h2>
            <p className="text-gray-600 mt-1">AI-categorized reports by condition</p>
          </div>
        </div>

        {diseaseCategories.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No health categories available</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {diseaseCategories.map(({ disease, count }) => {
              const IconComponent = DISEASE_ICONS[disease] || Activity;
              const colorClass = DISEASE_COLORS[disease] || 'bg-gray-100 text-gray-700 border-gray-200';
              
              return (
                <Link key={disease} to={`/disease/${encodeURIComponent(disease)}`}>
                  <Card className={`hover:shadow-lg transition-all duration-300 border-2 cursor-pointer ${colorClass.split(' ')[2]}`}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className={`p-3 rounded-xl ${colorClass.split(' ')[0]}`}>
                          <IconComponent className={`h-8 w-8 ${colorClass.split(' ')[1]}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{disease}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {count} {count === 1 ? 'Record' : 'Records'}
                          </p>
                        </div>
                        <Badge variant="outline" className={colorClass}>
                          View Details
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
