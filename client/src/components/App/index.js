// src/app/App.jsx
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FirebaseContext from '../Firebase/context'; // Importing Firebase context
import Firebase from '../Firebase/firebase'; // Importing Firebase instance

// components
import SignUpPatient from '../../pages/SignUpPatient';
import SignupFormH from '../../pages/SignUpHP';
import NavBar from '../../components/Layout/NavBar';
import PatientProfile from '../../pages/PatientProfile';
import ProfileSelection from '../../pages/ProfileSelection';
import MedicalHistory from '../../pages/MedicalHistory';
import BookingsPage from '../../pages/BookingsPage';
import LandingPage from '../../pages/Landing';
import ConfirmationVerifyH from '../../pages/ConfirmationVerifyH';
import PatientDashboard from '../../pages/PatientDashboard';
import SignInFormHP from '../../pages/SignInFormHP';
import SignInFormP from '../../pages/SignInFormP';
import HealthcareProfile from '../../pages/HealthcareProfile';
import HospitalSearch from '../../pages/HospitalSearch';
import HealthcareDashboard from '../../pages/HealthcareDashboard';
import HealthcareBookings from '../../pages/HealthcareBookings';
import IssueSelection from '../../pages/IssueSelection';
import NewIssue from '../../pages/NewIssue';
import OldIssues from '../../pages/OldIssues';
import PatientBookings from '../../pages/PatientBooking';
// import Recommendations from '../../pages/Recommendations';
// Initializing Firebase
const firebase = new Firebase();

const App = () => {
  return (
    <FirebaseContext.Provider value={firebase}>
      {' '}
      {/* Provide Firebase to the app */}
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile/p" element={<ProfileSelection />} />
          <Route path="/profile/view-profile" element={<PatientProfile />} />
          <Route path="/profile/medical-history" element={<MedicalHistory />} />
          <Route path="/profile/hp" element={<HealthcareProfile />} />
          <Route path="/SignUpPatient" element={<SignUpPatient />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/Landing" element={<LandingPage />} />
          <Route path="/PatientDashboard" element={<PatientDashboard />} />
          <Route
            path="/HealthcareDashboard"
            element={<HealthcareDashboard />}
          />
          <Route path="HealthcareBookings" element={<HealthcareBookings />} />
          <Route path="/SignUpHP" element={<SignupFormH />} />
          <Route
            path="/ConfirmationVerifyH"
            element={<ConfirmationVerifyH />}
          />
          <Route path="/hp-signin" element={<SignInFormHP />} />
          <Route path="/p-signin" element={<SignInFormP />} />

          <Route path="/issue-selection" element={<IssueSelection />} />
          <Route path="/new-issue" element={<NewIssue />} />
          <Route path="/old-issues" element={<OldIssues />} />
          {/* <Route path="/recommendations/:issueId" element={<Recommendations />} /> */}
          <Route path="/hospital-search" element={<HospitalSearch />} />
          <Route path="/patient-bookings" element={<PatientBookings />} />
        </Routes>
      </Router>
    </FirebaseContext.Provider>
  );
};

export default App;
