import { useState } from 'react';
import { useMedical, Medicine, MedicalReport } from '../../context/MedicalContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { 
  Plus, 
  Trash2, 
  FileUp, 
  Stethoscope,
  Calendar,
  User,
  FileText,
  Pill,
  Upload,
  CheckCircle
} from 'lucide-react';

export default function ReceptionistPanel() {
  const { hospitals, addAppointment } = useMedical();

  // Form state
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [problemSummary, setProblemSummary] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [diseaseCategories, setDiseaseCategories] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState('');
  
  // Medicines
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [medicineName, setMedicineName] = useState('');
  const [medicineDosage, setMedicineDosage] = useState('');
  const [medicineFrequency, setMedicineFrequency] = useState('');
  const [medicineDuration, setMedicineDuration] = useState('');

  // Reports
  const [reports, setReports] = useState<Omit<MedicalReport, 'id'>[]>([]);
  const [reportName, setReportName] = useState('');
  const [reportType, setReportType] = useState<'pdf' | 'image'>('pdf');
  const [reportUrl, setReportUrl] = useState('');

  const addCategory = () => {
    if (categoryInput.trim() && !diseaseCategories.includes(categoryInput.trim())) {
      setDiseaseCategories([...diseaseCategories, categoryInput.trim()]);
      setCategoryInput('');
    }
  };

  const removeCategory = (category: string) => {
    setDiseaseCategories(diseaseCategories.filter(c => c !== category));
  };

  const addMedicine = () => {
    if (medicineName && medicineDosage && medicineFrequency && medicineDuration) {
      setMedicines([
        ...medicines,
        {
          name: medicineName,
          dosage: medicineDosage,
          frequency: medicineFrequency,
          duration: medicineDuration,
        },
      ]);
      setMedicineName('');
      setMedicineDosage('');
      setMedicineFrequency('');
      setMedicineDuration('');
    }
  };

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const addReport = () => {
    if (reportName && reportUrl) {
      setReports([
        ...reports,
        {
          name: reportName,
          type: reportType,
          url: reportUrl,
          uploadDate: new Date().toISOString().split('T')[0],
        },
      ]);
      setReportName('');
      setReportUrl('');
    }
  };

  const removeReport = (index: number) => {
    setReports(reports.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!hospitalId) {
      toast.error('Please select a hospital');
      return;
    }

    const selectedHospital = hospitals.find(h => h.id === hospitalId);
    if (!selectedHospital) {
      toast.error('Invalid hospital selected');
      return;
    }

    if (diseaseCategories.length === 0) {
      toast.error('Please add at least one disease category');
      return;
    }

    const appointment = {
      patientId: 'patient1',
      hospitalId,
      hospitalName: selectedHospital.name,
      date: appointmentDate,
      doctorName,
      problemSummary,
      problemDescription,
      diagnosis,
      medicines,
      reports: reports.map((report, index) => ({
        ...report,
        id: `r${Date.now()}_${index}`,
      })),
      diseaseCategory: diseaseCategories,
    };

    addAppointment(appointment);
    toast.success('Appointment added successfully!');
    
    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setPatientName('');
    setPatientEmail('');
    setHospitalId('');
    setAppointmentDate('');
    setDoctorName('');
    setProblemSummary('');
    setProblemDescription('');
    setDiagnosis('');
    setDiseaseCategories([]);
    setMedicines([]);
    setReports([]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-green-600 p-3 rounded-xl">
            <Stethoscope className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Receptionist Panel</h1>
            <p className="text-gray-600 mt-1">Add and manage patient appointments</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Patient Information
            </CardTitle>
            <CardDescription>Basic patient details (using demo patient for now)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter patient name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientEmail">Patient Email</Label>
                <Input
                  id="patientEmail"
                  type="email"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  placeholder="Enter patient email"
                />
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This demo uses a default patient account. In production, you would search and select from registered patients.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Appointment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Appointment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hospital">Hospital *</Label>
                <Select value={hospitalId} onValueChange={setHospitalId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    {hospitals.map((hospital) => (
                      <SelectItem key={hospital.id} value={hospital.id}>
                        {hospital.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Appointment Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="doctor">Doctor Name *</Label>
                <Input
                  id="doctor"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  placeholder="Dr. John Smith"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Problem Description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              Problem Description
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="problemSummary">Problem Summary *</Label>
              <Input
                id="problemSummary"
                value={problemSummary}
                onChange={(e) => setProblemSummary(e.target.value)}
                placeholder="Brief summary of the problem"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="problemDescription">Detailed Description *</Label>
              <Textarea
                id="problemDescription"
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="Detailed patient complaint and symptoms"
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Diagnosis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-purple-600" />
              Doctor's Diagnosis & Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnosis *</Label>
              <Textarea
                id="diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Doctor's diagnosis and recommendations"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Disease Categories (AI Categories) *</Label>
              <div className="flex gap-2">
                <Input
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  placeholder="e.g., Fever, Diabetes"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                />
                <Button type="button" onClick={addCategory} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {diseaseCategories.map((category) => (
                  <Badge key={category} className="bg-purple-600 text-white">
                    {category}
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="ml-2 hover:text-red-200"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medicines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5 text-blue-600" />
              Prescribed Medicines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Medicine Name</Label>
                <Input
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  placeholder="Paracetamol"
                />
              </div>
              <div className="space-y-2">
                <Label>Dosage</Label>
                <Input
                  value={medicineDosage}
                  onChange={(e) => setMedicineDosage(e.target.value)}
                  placeholder="500mg"
                />
              </div>
              <div className="space-y-2">
                <Label>Frequency</Label>
                <Input
                  value={medicineFrequency}
                  onChange={(e) => setMedicineFrequency(e.target.value)}
                  placeholder="Twice daily"
                />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input
                  value={medicineDuration}
                  onChange={(e) => setMedicineDuration(e.target.value)}
                  placeholder="5 days"
                />
              </div>
            </div>
            <Button type="button" onClick={addMedicine} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Medicine
            </Button>

            {medicines.length > 0 && (
              <div className="space-y-2">
                {medicines.map((medicine, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-semibold">{medicine.name} - {medicine.dosage}</p>
                      <p className="text-sm text-gray-600">{medicine.frequency} for {medicine.duration}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMedicine(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Medical Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileUp className="h-5 w-5 text-green-600" />
              Medical Reports & Documents
            </CardTitle>
            <CardDescription>Add links to medical reports (PDFs or images)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Report Name</Label>
                <Input
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="Blood Test Report"
                />
              </div>
              <div className="space-y-2">
                <Label>Report Type</Label>
                <Select value={reportType} onValueChange={(value: any) => setReportType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Report URL</Label>
                <Input
                  value={reportUrl}
                  onChange={(e) => setReportUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>
            <Button type="button" onClick={addReport} variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Add Report
            </Button>

            {reports.length > 0 && (
              <div className="space-y-2">
                {reports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <p className="font-semibold">{report.name}</p>
                      <p className="text-sm text-gray-600">{report.type.toUpperCase()}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeReport(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
          <CardContent className="pt-6">
            <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-5 w-5 mr-2" />
              Add Appointment
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
