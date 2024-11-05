// components/AboutUsSection.tsx
import React from 'react';

const AboutUs: React.FC = () => (
  <section className=" p-8">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:gap-40">
        <div className="md:w-1/2 p-4">
          <h2 className="text-3xl font-bold">About Us</h2>
          <p className="mt-4">
            The Foundation was conceived and started by Ravi Sharma, a distinguished alumnus of IIT Roorkee from the 1984 batch.
            Prana Jyoti Foundation is an idea, a spirit, and a celebration of life and its goodness. We believe that goodness is not an act but a way of life which converts into a good life for all. PJF aims to work as a support system to enhance the quality of life at all levels because we find ourselves fortunate enough to be able to do so. Starting from those who do not have access to basic needs of life like food, clothes and medical help to begin with; our main area of focus is to improve our education system by providing financial support.
          </p>
          <a href="#" className="inline-block mt-4 bg-white text-yellow-500 py-2 px-4 rounded-lg font-bold hover:bg-gray-200">
            Learn More
          </a>
        </div>
        <div className="md:w-1/2 p-4">
          <img
            src="/boy.png"
            alt="Person hugging a child"
            width={400}
            height={400}
          />
        </div>
      </div>
     
    </div>
  </section>
);

export default AboutUs;
