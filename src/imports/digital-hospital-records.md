Design a modern and clean web application UI for a **Digital Hospital Record Management System**.

The system is used by **patients and hospital receptionists**. The goal is to allow patients to view their complete medical history across different hospitals.

### Main User Role: Patient

After login, the patient should see a **Home Dashboard** with the following sections:

1. **Hospitals Visited**

* Display all hospitals where the patient had at least one appointment.
* Show them as **cards or tiles**.
* Each hospital card should show:

  * Hospital name
  * Location
  * Total visits count
* Clicking a hospital opens the **Hospital Appointment History page**.

2. **Disease-Based Reports**

* A separate section where reports are grouped by **disease categories** detected using AI.
* Example categories:

  * Fever
  * Diabetes
  * Stomach Issues
  * Dental Problems
* Clicking a disease shows all related reports and appointments.

### Hospital Appointment History Page

When a patient clicks a hospital card:

* Show a **scrollable list of appointment cards**
* Cards must be ordered by **date in descending order (latest first)**.

Each appointment card should display:

* Appointment date
* Doctor name
* Short problem summary
* Button: “View Details”

### Appointment Details Page

When a card is clicked, show full details:

Sections:

* Hospital name
* Appointment date
* Doctor name
* Patient problem description
* Doctor notes / diagnosis
* Prescribed medicines list
* Uploaded reports

Reports should support:

* PDF preview
* image preview
* download button

### AI Feature

The system automatically analyzes reports and prescriptions and categorizes them by **disease** so patients can easily track their health history.

### Receptionist Panel (Admin)

Design a simple interface for hospital receptionists where they can:

* Add patient appointments
* Enter problem description
* Add doctor notes
* Upload prescriptions
* Upload medical reports

### Design Requirements

* Modern healthcare UI
* Clean dashboard layout
* Card-based design
* Easy navigation
* Soft medical colors (blue, white, green)
* Sidebar navigation
* Mobile responsive layout

Pages to design:

1. Login Page
2. Patient Dashboard
3. Hospital Appointment History Page
4. Appointment Details Page
5. Disease-Based Reports Page
6. Receptionist Admin Panel
