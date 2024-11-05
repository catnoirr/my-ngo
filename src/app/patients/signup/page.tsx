// src/app/patients/auth/page.tsx
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase'; // Import your Firebase config
import { onAuthStateChanged } from 'firebase/auth';
import PatientSignUp from '../../components/PatientSignUp';

const AuthPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to the dashboard
        router.push('/patients/dashboard');
      } else {
        setLoading(false); // Set loading to false if user is not signed in
      }
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [router]);

  // Show loading animation while checking auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="loader"></div>
          <span className="mt-2 text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PatientSignUp />
    </div>
  );
};

export default AuthPage;
