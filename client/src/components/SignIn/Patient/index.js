import React, { useState } from 'react';
import NavBar from './NavBar';
import LoginForm from './SignInForm';
import './styles.css';

function PSignIn() {
  return (
    <div className="background">
      <div className="container">
        <header className="header">
          <a href="/" className="logo">MedSync</a>
          <NavBar />
        </header>
        <main className="main-content">
          <LoginForm />
        </main>
      </div>
    </div>
  );
}

export default PSignIn;