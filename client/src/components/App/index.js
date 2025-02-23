// src/app/App.jsx
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUpPatient from '../../pages/SignUpPatient';
import SignupFormH from '../../pages/SignUpHP';
import NavBar from '../../components/Layout/NavBar';
import BookingsPage from '../../pages/BookingsPage';
import LandingPage from '../../pages/Landing';
import ConfirmationVerifyH from '../../pages/ConfirmationVerifyH';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/SignUpPatient" element={<SignUpPatient />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/Landing" element={<LandingPage />} />
        <Route path="/SignUpHP" element={<SignupFormH />} />
        <Route path="/ConfirmationVerifyH" element={<ConfirmationVerifyH />} />
      </Routes>
    </Router>
  );
};

export default App;
