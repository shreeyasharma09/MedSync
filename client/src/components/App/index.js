// src/app/App.jsx
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUpPatient from '../../pages/SignUpPatient';
import SignupFormH from '../../pages/SignUpHP';
import NavBar from '../../components/Layout/NavBar';
import PatientProfile from '../../pages/PatientProfile';
import ProfileSelection from '../../pages/ProfileSelection';
import MedicalHistory from '../../pages/MedicalHistory';
import BookingsPage from '../../pages/BookingsPage';
import LandingPage from '../../pages/Landing';
import ConfirmationVerifyH from '../../pages/ConfirmationVerifyH';
import HealthcareProfile from '../../pages/HealthcareProfile';
const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<SignUpPatient />} />
        <Route path="/profile/patient" element={<ProfileSelection />} />
        <Route path="/profile/patient/view-profile" element={<PatientProfile />} />
        <Route path="/profile/patient/medical-history" element={<MedicalHistory />} />
        <Route path="/profile/hp" element={<HealthcareProfile />} />
        <Route path="/signUpPatient" element={<SignUpPatient />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/signUpHP" element={<SignupFormH />} />
        <Route path="/confirmationVerifyH" element={<ConfirmationVerifyH />} />
      </Routes>
    </Router>
  );
};

export default App;
