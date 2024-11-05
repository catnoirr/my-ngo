// src/app/layout.tsx
'use client'
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // Use this hook instead of useRouter

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current pathname
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    // Set showFooter based on the pathname
    setShowFooter(pathname !== '/patients/dashboard'); // Adjust condition as needed
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        {showFooter && <Footer />} {/* Render Footer based on the state */}
      </body>
    </html>
  );
}
