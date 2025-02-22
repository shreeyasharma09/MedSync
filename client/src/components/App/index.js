// src/app/App.jsx
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUpPatient from '../../pages/SignUpPatient';
import NavBar from '../../components/Layout/NavBar';
import PatientProfile from '../../pages/PatientProfile';
import ProfileSelection from '../../pages/ProfileSelection';
import MedicalHistory from '../../pages/MedicalHistory';
//import MedicalHistory from "../../pages/MedicalHistory"

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<SignUpPatient />} />
        <Route path="/profile" element={<ProfileSelection />} />
        <Route path="/profile/view-profile" element={<PatientProfile />} />
        <Route path="/profile/medical-history" element={<MedicalHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
