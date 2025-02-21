import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PSignIn from '../SignIn/Patient';
import HPSignIn from '../SignIn/Health_Practitioner';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<PSignIn />} /> */}
        <Route path="/" element={<HPSignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
