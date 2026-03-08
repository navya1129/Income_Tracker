import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useMedical } from '../../context/MedicalContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  FileText, 
  Pill, 
  Hospital,
  Download,
  Eye,
  Image as ImageIcon,
  FileIcon,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';

export default function AppointmentDetails() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { appointments } = useMedical();
  const [previewReport, setPreviewReport] = useState<any>(null);

  const appointment = useMemo(() => {
    return appointments.find(a => a.id === appointmentId);
  }, [appointments, appointmentId]);

  if (!appointment) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">Appointment not found</p>
            <Button onClick={() => navigate('/dashboard')} className="mt-4">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDownload = (report: any) => {
    window.open(report.url, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 hover:bg-blue-50"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {/* Header Card */}
      <Card className="mb-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">Appointment Details</CardTitle>
              <div className="flex flex-wrap gap-2 mt-3">
                {appointment.diseaseCategory.map((disease, index) => (
                  <Badge key={index} className="bg-blue-600 text-white">
                    {disease}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Basic Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hospital className="h-5 w-5 text-blue-600" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <Hospital className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Hospital</p>
                <p className="font-semibold text-gray-900">{appointment.hospitalName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Appointment Date</p>
                <p className="font-semibold text-gray-900">
                  {format(new Date(appointment.date), 'MMMM dd, yyyy')}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(appointment.date), 'EEEE')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg md:col-span-2">
              <User className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Consulting Doctor</p>
                <p className="font-semibold text-gray-900">{appointment.doctorName}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problem Description */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-orange-600" />
            Problem Description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <p className="text-gray-900">{appointment.problemDescription}</p>
          </div>
        </CardContent>
      </Card>

      {/* Doctor's Diagnosis */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-600" />
            Doctor's Diagnosis & Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-gray-900">{appointment.diagnosis}</p>
          </div>
        </CardContent>
      </Card>

      {/* Prescribed Medicines */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-blue-600" />
            Prescribed Medicines
          </CardTitle>
          <CardDescription>Follow the dosage instructions carefully</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {appointment.medicines.map((medicine, index) => (
              <div 
                key={index} 
                className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-lg text-gray-900">{medicine.name}</h4>
                  <Badge className="bg-blue-600 text-white">{medicine.dosage}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Frequency</p>
                    <p className="font-medium text-gray-900 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {medicine.frequency}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Duration</p>
                    <p className="font-medium text-gray-900">{medicine.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Medical Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileIcon className="h-5 w-5 text-purple-600" />
            Medical Reports & Documents
          </CardTitle>
          <CardDescription>View and download your medical reports</CardDescription>
        </CardHeader>
        <CardContent>
          {appointment.reports.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No reports uploaded for this appointment
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointment.reports.map((report) => (
                <div 
                  key={report.id} 
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    {report.type === 'pdf' ? (
                      <div className="bg-red-100 p-2 rounded-lg">
                        <FileIcon className="h-6 w-6 text-red-600" />
                      </div>
                    ) : (
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <ImageIcon className="h-6 w-6 text-blue-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{report.name}</h4>
                      <p className="text-sm text-gray-500">
                        {format(new Date(report.uploadDate), 'MMM dd, yyyy')}
                      </p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {report.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setPreviewReport(report)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleDownload(report)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={!!previewReport} onOpenChange={() => setPreviewReport(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{previewReport?.name}</DialogTitle>
          </DialogHeader>
          <div className="overflow-auto max-h-[70vh]">
            {previewReport?.type === 'pdf' ? (
              <div className="bg-gray-100 p-8 rounded-lg text-center">
                <FileIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">PDF Preview</p>
                <Button onClick={() => handleDownload(previewReport)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF to View
                </Button>
              </div>
            ) : (
              <img 
                src={previewReport?.url} 
                alt={previewReport?.name}
                className="w-full h-auto rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
