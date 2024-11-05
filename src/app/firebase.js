// src/app/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyCGlBFsF_mJ7GEsYOu5p-PSVEVXUdcUlbA",
    authDomain: "myngo-15993.firebaseapp.com",
    projectId: "myngo-15993",
    storageBucket: "myngo-15993.firebasestorage.app",
    messagingSenderId: "963542477687",
    appId: "1:963542477687:web:0b49695e71d65ab7664f72",
    measurementId: "G-XXH0V04KX3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize Firebase Storage

// Export app, db, auth, and storage
export { app, db, auth, storage };
