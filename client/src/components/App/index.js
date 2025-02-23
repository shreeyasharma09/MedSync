// src/app/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import HomePage from '../../pages/HomePage';
import SignInFormHP from '../../pages/SignInFormHP';
import SignInFormP from '../../pages/SignInFormP';
import HealthcareProfile from '../../pages/HealthcareProfile';
// Initializing Firebase
const firebase = new Firebase();

const App = () => {
  return (
    <FirebaseContext.Provider value={firebase}> {/* Provide Firebase to the app */}
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile/patient" element={<ProfileSelection />} />
          <Route path="/profile/view-profile" element={<PatientProfile />} />
          <Route path="/profile/medical-history" element={<MedicalHistory />} />
          <Route path="/profile/hp" element={<HealthcareProfile />} />
          <Route path="/SignUpPatient" element={<SignUpPatient />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/Landing" element={<LandingPage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/SignUpHP" element={<SignupFormH />} />
          <Route path="/ConfirmationVerifyH" element={<ConfirmationVerifyH />} />
          <Route path="/hp-signin" element={<SignInFormHP />} />
          <Route path="/p-signin" element={<SignInFormP />} />
        </Routes>
      </Router>
    </FirebaseContext.Provider>
  );
};

export default App;