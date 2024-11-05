import React from 'react';
import Link from 'next/link';
const currentYear = new Date().getFullYear();
const Footer: React.FC = () => (
  
  <footer className="bg-gray-900 text-white p-8 rounded-t-lg shadow-lg">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center text-center">
      <div className="transition-transform duration-300 hover:scale-105">
        <h3 className="text-2xl font-bold text-yellow-400">WHAT WE DO</h3>
        <p className="mt-4 text-gray-300 leading-relaxed">
          Give donations for the events which we are conducting for the children and senior citizens.
          Support our initiatives aimed at helping those in need.
        </p>
      </div>
      <div className="transition-transform duration-300 hover:scale-105">
        <h3 className="text-2xl font-bold text-yellow-400">ABOUT US</h3>
        <ul className="mt-4 space-y-2 text-gray-300">
          <li>
            <Link href="/about">
              <span className="hover:text-yellow-400 transition-colors duration-200 cursor-pointer">About us</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="transition-transform duration-300 hover:scale-105">
        <h3 className="text-2xl font-bold text-yellow-400">JOIN US</h3>
        <ul className="mt-4 space-y-2 text-gray-300">
          <li>
            <Link href="/volunteers/signup">
              <span className="hover:text-yellow-400 transition-colors duration-200 cursor-pointer">Become Volunteer</span>
            </Link>
          </li>
          <li>
            <Link href="/patients/signup">
              <span className="hover:text-yellow-400 transition-colors duration-200 cursor-pointer">Ask for help</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
    
    <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:justify-between">
      <div className="text-center w-full text-gray-400">
      <p className="transition-opacity duration-300 hover:opacity-80">
        © {currentYear} PJF
      </p>
      © {currentYear} PJF      </div>
    </div>
  </footer>
);

export default Footer;
