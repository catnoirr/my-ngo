// src/app/components/Navbar.tsx
"use client" // This ensures that this component is treated as a client component
import Link from 'next/link';
import { useState, useRef } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // // Toggle the mobile menu
  // const toggleMenu = () => {
  //   setIsOpen((prev) => !prev);
  // };

  // Close the menu when clicking outside of it
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };   

  // Attach the event listener directly (note: may cause memory leaks if not handled correctly)
  const handleMenuOpen = () => {
    setIsOpen(true);
    document.addEventListener('mousedown', handleClickOutside);
  };

  // Clean up the event listener when the menu is closed
  const handleMenuClose = () => {
    setIsOpen(false);
    document.removeEventListener('mousedown', handleClickOutside);
  };

  // Close the menu when navigating
  const handleLinkClick = () => {
    handleMenuClose();
  };

  return (
    <nav className="bg-yellow-500 text-black">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl">NGO</span>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button onClick={handleMenuOpen} className="md:hidden focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Navigation Links for Larger Screens */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="hover:text-gray-800 font-medium">Home</Link>
          <Link href="/about" className="hover:text-gray-800 font-medium">About Us</Link>
          {/* <Link href="/projects" className="hover:text-gray-800 font-medium">Projects</Link> */}
          <Link href="/volunteers/signup" className="hover:text-gray-800 font-medium">Volunteer With Us</Link>
          <Link href="/contact" className="hover:text-gray-800 font-medium">Contact Us</Link>
        </div>
      </div>

      {/* Notification Style Navigation Links for Mobile */}
      {isOpen && (
        <div
          ref={menuRef}
          className={`fixed top-0 right-0 h-full w-1/2 bg-yellow-500 text-black p-4 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} opacity-100`}
          style={{ zIndex: 1000 }} // Ensure it appears above other elements
        >
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg font-bold">Navigation</h2>
            <Link href="/" className="hover:text-gray-800 font-medium" onClick={handleLinkClick}>Home</Link>
            <Link href="/about" className="hover:text-gray-800 font-medium" onClick={handleLinkClick}>About Us</Link>
            <Link href="/volunteers/signup" className="hover:text-gray-800 font-medium" onClick={handleLinkClick}>Join Us</Link>
            <Link href="" className="hover:text-gray-800 font-medium" onClick={handleLinkClick}>Contact Us
            
            </Link>
          </div>
          <button
            onClick={handleMenuClose}
            className="mt-6 w-full bg-yellow-600 text-black font-bold py-2 rounded hover:bg-yellow-700"
          >
            Close
          </button>
        </div>
      )}
    </nav>
  );
}
