// Import Firebase modules using the new modular syntax
import {initializeApp} from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  getIdToken,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD6iQz6eQX2AYIl_kPWyiPtjF7HoAQIwPU',
  authDomain: 'mse-342-project-dev-dc2f4.firebaseapp.com',
  projectId: 'mse-342-project-dev-dc2f4',
  storageBucket: 'mse-342-project-dev-dc2f4.appspot.com',
  messagingSenderId: '42730330460',
  appId: '1:42730330460:web:563d23ccbe353bf7c00999',
  measurementId: 'G-X301DZ5TLJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

class Firebase {
  constructor() {
    this.auth = auth;
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(this.auth, email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password);

  doSignOut = () => signOut(this.auth);

  doPasswordReset = email => sendPasswordResetEmail(this.auth, email);

  doPasswordUpdate = password =>
    updatePassword(this.auth.currentUser, password);

  doGetIdToken = bool => {
    return getIdToken(this.auth.currentUser, bool);
  };

  doGetUserByEmail = email => fetchSignInMethodsForEmail(this.auth, email);
}

export default Firebase;
