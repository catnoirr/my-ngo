// components/CarouselSection.tsx

"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';  // Importing Image component from next/image

const slides = [
  {
    id: 1,
    title: "Adhar The Base",
    description: "As the name suggests Under Project Aadhar we adopt already existing schools to bring them at par with any other good school of the country by providing them necessary reinforcement depending on the need of the particular school.",
    img: "/baby.png"
  },
  {
    id: 2,
    title: "Empower The Youth",
    description: "We focus on empowering youth through various initiatives that promote education, skills development, and community involvement.",
    img: "/baby.png"
  },
  {
    id: 3,
    title: "Support The Elderly",
    description: "Our mission includes providing support and care for the elderly, ensuring they lead a dignified and fulfilling life.",
    img: "/baby.png"
  },
  {
    id: 4,
    title: "Health & Wellness",
    description: "Promoting health and wellness through various programs that provide access to healthcare, fitness, and mental well-being resources.",
    img: "/baby.png"
  }
];

const Projects: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="bg-yellow-500 text-white p-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <Image
            src={slides[currentSlide].img}
            alt={slides[currentSlide].title}
            width={600}  // Specify width
            height={400} // Specify height
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 md:ml-8">
          <h2 className="text-xl font-bold">Projects</h2>
          <h3 className="text-2xl font-bold mt-2">{slides[currentSlide].title}</h3>
          <p className="mt-4">{slides[currentSlide].description}</p>
          <a href="#" className="mt-4 inline-block text-white underline">
            Learn More
          </a>
          <div className="mt-4">
            {slides.map((slide, index) => (
              <span
                key={slide.id}
                className={`inline-block w-2 h-2 rounded-full mr-2 ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
