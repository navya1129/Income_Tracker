import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Hospital {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface MedicalReport {
  id: string;
  name: string;
  type: 'pdf' | 'image';
  url: string;
  uploadDate: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  hospitalId: string;
  hospitalName: string;
  date: string;
  doctorName: string;
  problemSummary: string;
  problemDescription: string;
  diagnosis: string;
  medicines: Medicine[];
  reports: MedicalReport[];
  diseaseCategory: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'receptionist';
  age?: number;
  bloodType?: string;
}

interface MedicalContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  hospitals: Hospital[];
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  getHospitalVisits: (patientId: string) => { hospital: Hospital; visitCount: number }[];
  getAppointmentsByHospital: (patientId: string, hospitalId: string) => Appointment[];
  getAppointmentsByDisease: (patientId: string, disease: string) => Appointment[];
  getDiseaseCategories: (patientId: string) => { disease: string; count: number }[];
}

const MedicalContext = createContext<MedicalContextType | undefined>(undefined);

const MOCK_HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: 'City General Hospital',
    location: 'Downtown, Main Street',
    imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400',
  },
  {
    id: 'h2',
    name: 'St. Mary Medical Center',
    location: 'Westside, Oak Avenue',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
  },
  {
    id: 'h3',
    name: 'Sunrise Community Hospital',
    location: 'Eastside, Pine Road',
    imageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400',
  },
  {
    id: 'h4',
    name: 'Metro Health Clinic',
    location: 'Central District, Park Lane',
    imageUrl: 'https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=400',
  },
];

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    patientId: 'patient1',
    hospitalId: 'h1',
    hospitalName: 'City General Hospital',
    date: '2026-02-15',
    doctorName: 'Dr. Sarah Johnson',
    problemSummary: 'Fever and body aches',
    problemDescription: 'Patient experiencing high fever (102°F) for 3 days with severe body aches and headache.',
    diagnosis: 'Viral fever with flu-like symptoms. Advised rest and medication.',
    medicines: [
      { name: 'Paracetamol', dosage: '500mg', frequency: 'Every 6 hours', duration: '5 days' },
      { name: 'Ibuprofen', dosage: '400mg', frequency: 'Twice daily', duration: '3 days' },
    ],
    reports: [
      {
        id: 'r1',
        name: 'Blood Test Report',
        type: 'pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        uploadDate: '2026-02-15',
      },
    ],
    diseaseCategory: ['Fever', 'Viral Infection'],
  },
  {
    id: 'a2',
    patientId: 'patient1',
    hospitalId: 'h1',
    hospitalName: 'City General Hospital',
    date: '2026-01-10',
    doctorName: 'Dr. Michael Chen',
    problemSummary: 'Blood sugar level check',
    problemDescription: 'Routine diabetes checkup. Patient reported increased thirst and fatigue.',
    diagnosis: 'Type 2 Diabetes - blood sugar levels elevated. Adjusted medication dosage.',
    medicines: [
      { name: 'Metformin', dosage: '850mg', frequency: 'Twice daily', duration: '90 days' },
      { name: 'Glimepiride', dosage: '2mg', frequency: 'Once daily', duration: '90 days' },
    ],
    reports: [
      {
        id: 'r2',
        name: 'HbA1c Test',
        type: 'pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        uploadDate: '2026-01-10',
      },
      {
        id: 'r3',
        name: 'Blood Glucose Report',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
        uploadDate: '2026-01-10',
      },
    ],
    diseaseCategory: ['Diabetes', 'Chronic Disease'],
  },
  {
    id: 'a3',
    patientId: 'patient1',
    hospitalId: 'h2',
    hospitalName: 'St. Mary Medical Center',
    date: '2025-12-05',
    doctorName: 'Dr. Emily Rodriguez',
    problemSummary: 'Stomach pain and indigestion',
    problemDescription: 'Patient experiencing severe stomach pain, bloating, and acid reflux for 1 week.',
    diagnosis: 'Gastritis with acid reflux. Recommended dietary changes and medication.',
    medicines: [
      { name: 'Omeprazole', dosage: '20mg', frequency: 'Once daily (morning)', duration: '30 days' },
      { name: 'Antacid Syrup', dosage: '10ml', frequency: 'After meals', duration: '14 days' },
    ],
    reports: [
      {
        id: 'r4',
        name: 'Endoscopy Report',
        type: 'pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        uploadDate: '2025-12-05',
      },
    ],
    diseaseCategory: ['Stomach Issues', 'Digestive System'],
  },
  {
    id: 'a4',
    patientId: 'patient1',
    hospitalId: 'h3',
    hospitalName: 'Sunrise Community Hospital',
    date: '2025-11-20',
    doctorName: 'Dr. Robert Williams',
    problemSummary: 'Tooth cavity and pain',
    problemDescription: 'Patient complained of severe toothache in lower left molar. Cavity detected.',
    diagnosis: 'Dental cavity requiring filling. Root canal may be needed if pain persists.',
    medicines: [
      { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', duration: '7 days' },
      { name: 'Ibuprofen', dosage: '400mg', frequency: 'Every 8 hours', duration: '5 days' },
    ],
    reports: [
      {
        id: 'r5',
        name: 'Dental X-Ray',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1598531228433-d9f0bdc2f32d?w=600',
        uploadDate: '2025-11-20',
      },
    ],
    diseaseCategory: ['Dental Problems', 'Oral Health'],
  },
  {
    id: 'a5',
    patientId: 'patient1',
    hospitalId: 'h1',
    hospitalName: 'City General Hospital',
    date: '2025-10-15',
    doctorName: 'Dr. Sarah Johnson',
    problemSummary: 'Annual health checkup',
    problemDescription: 'Routine annual physical examination. Patient reported no major complaints.',
    diagnosis: 'Overall health is good. Blood pressure slightly elevated. Advised lifestyle modifications.',
    medicines: [
      { name: 'Vitamin D3', dosage: '1000 IU', frequency: 'Once daily', duration: '60 days' },
      { name: 'Omega-3', dosage: '1000mg', frequency: 'Once daily', duration: '60 days' },
    ],
    reports: [
      {
        id: 'r6',
        name: 'Complete Blood Count',
        type: 'pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        uploadDate: '2025-10-15',
      },
      {
        id: 'r7',
        name: 'Lipid Profile',
        type: 'pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        uploadDate: '2025-10-15',
      },
    ],
    diseaseCategory: ['Preventive Care', 'General Health'],
  },
];

export function MedicalProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('medicalCurrentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('medicalAppointments');
    return saved ? JSON.parse(saved) : MOCK_APPOINTMENTS;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('medicalCurrentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('medicalCurrentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('medicalAppointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: `a${Date.now()}`,
    };
    setAppointments([...appointments, newAppointment]);
  };

  const getHospitalVisits = (patientId: string) => {
    const patientAppointments = appointments.filter(a => a.patientId === patientId);
    const hospitalMap = new Map<string, number>();

    patientAppointments.forEach(appointment => {
      const count = hospitalMap.get(appointment.hospitalId) || 0;
      hospitalMap.set(appointment.hospitalId, count + 1);
    });

    return MOCK_HOSPITALS
      .filter(hospital => hospitalMap.has(hospital.id))
      .map(hospital => ({
        hospital,
        visitCount: hospitalMap.get(hospital.id) || 0,
      }))
      .sort((a, b) => b.visitCount - a.visitCount);
  };

  const getAppointmentsByHospital = (patientId: string, hospitalId: string) => {
    return appointments
      .filter(a => a.patientId === patientId && a.hospitalId === hospitalId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const getAppointmentsByDisease = (patientId: string, disease: string) => {
    return appointments
      .filter(a => a.patientId === patientId && a.diseaseCategory.includes(disease))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const getDiseaseCategories = (patientId: string) => {
    const patientAppointments = appointments.filter(a => a.patientId === patientId);
    const diseaseMap = new Map<string, number>();

    patientAppointments.forEach(appointment => {
      appointment.diseaseCategory.forEach(disease => {
        const count = diseaseMap.get(disease) || 0;
        diseaseMap.set(disease, count + 1);
      });
    });

    return Array.from(diseaseMap.entries())
      .map(([disease, count]) => ({ disease, count }))
      .sort((a, b) => b.count - a.count);
  };

  return (
    <MedicalContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        hospitals: MOCK_HOSPITALS,
        appointments,
        addAppointment,
        getHospitalVisits,
        getAppointmentsByHospital,
        getAppointmentsByDisease,
        getDiseaseCategories,
      }}
    >
      {children}
    </MedicalContext.Provider>
  );
}

export function useMedical() {
  const context = useContext(MedicalContext);
  if (!context) {
    throw new Error('useMedical must be used within MedicalProvider');
  }
  return context;
}
