// src/app/components/SupportSection.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SupportSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const router = useRouter(); // Initialize the useRouter hook
  
  const slides = [
    {
      title: "We Need Your Support",
      subtitle: "A Change, May Help Many Lives.",
      description:
        "It can be through an idea, a few hours of your time, your involvement as a team member or a financial commitment.",
    },
    {
        title: "Join Our Mission",
        subtitle: "Together We Can Make a Difference.",
        description:
          "Your support, no matter how small, can create a significant impact.",
    },
    {
        title: "Get Involved Today",
        subtitle: "Be the Change You Wish to See.",
        description:
          "Every action counts, and your contribution can help us reach our goals.",
    },
    {
        title: "Support Our Cause",
        subtitle: "Help Us Help Others.",
        description:
          "Your time and resources can aid those in need and transform lives.",
    },
  ];

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [slides.length]);

  const handleRequestHelp = () => {
    router.push('/patients/signup'); // Navigate to the Patient Sign-Up page
  };
  const handleVolunteerWithUs = () => {
    router.push('/volunteers/signup'); // Navigate to the Patient Sign-Up page
  };

  return (
    <section className="flex flex-col md:flex-row items-center py-10 sm:py-0 justify-between sm:pt-10 bg-black text-white md:px-40 px-10">
      {/* Image (first on small screens) */}
      <div className="flex-shrink-0 w-full md:w-[500px] mb-4 md:mb-0 order-1 md:order-2">
        <img
          src="/girlw.png"
          alt="Support"
          className="h-full object-cover rounded-md"
          width={500}
          height={1000}
        />
      </div>

      {/* Content (below image on small screens) */}
      <div className="max-w-lg space-y-4 order-2 md:order-1">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">{slides[activeSlide].title}</h1>
        <p className="text-lg md:text-xl">{slides[activeSlide].subtitle}</p>
        <p className="text-gray-400">{slides[activeSlide].description}</p>
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0">
          <button
            onClick={handleRequestHelp} // Add click handler
            className="bg-yellow-500 text-black px-6 py-3 font-semibold rounded hover:bg-yellow-600 w-full md:w-auto"
          >
            Request Help
          </button>
          <button 
          onClick={handleVolunteerWithUs}
          className="border-2 border-yellow-500 text-yellow-500 px-6 py-3 font-semibold rounded hover:bg-yellow-500 hover:text-black w-full md:w-auto">
            Volunteer with us
          </button>
        </div>

        {/* Slide Navigation Dots */}
        <div className="flex space-x-2 mt-6">
          {slides.map((_, index) => (
            <span
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition duration-200 ease-in-out ${
                activeSlide === index ? 'bg-yellow-500' : 'bg-yellow-900'
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
