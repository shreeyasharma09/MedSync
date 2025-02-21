// src/app/App.jsx
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUpPatient from '../../pages/SignUpPatient';
import NavBar from '../../components/Layout/NavBar';
import BookingsPage from '../../pages/BookingsPage';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<SignUpPatient />} />
        <Route path="/bookings" element={<BookingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
