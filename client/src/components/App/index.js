// src/app/App.jsx
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUpPatient from '../../pages/SignUpPatient';
import NavBar from '../../components/Layout/NavBar';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<SignUpPatient />} />
      </Routes>
    </Router>
  );
};

export default App;
