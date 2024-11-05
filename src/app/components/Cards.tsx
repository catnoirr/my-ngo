// src/app/components/Cards.tsx
import React from 'react';
import { FiDollarSign, FiUsers, FiShare2 } from 'react-icons/fi';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description, linkText, linkHref }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center w-96 h-80 mx-auto">
      <div className="text-yellow-500 mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-20">{description}</p>
      <a href={linkHref} className="text-white font-semibold border p-5 mt-28 text-center bg-yellow-500 rounded-xl">
        {linkText} &rarr;
      </a>
    </div>
  );
};

const Cards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-20">
      <InfoCard
        icon={<FiDollarSign size={32} />}
        title="ASK FOR HELP"
        description="Need assistance? We're here to help—reach out, and we'll support you however we can."
        linkText="Ask Help"
        linkHref="/patients/signup"
      />
      <InfoCard
        icon={<FiUsers size={32} />}
        title="BECOME VOLUNTEER"
        description="Join us as a volunteer to support our events for children and senior citizens."
        linkText="Learn More"
        linkHref="/volunteers/signup"
      />
      <InfoCard
        icon={<FiShare2 size={32} />}
        title="SHARE TO FRIENDS"
        description="Spread the word about our events for children and senior citizens."
        linkText="Share Now"
        linkHref="#"
      />
    </div>
  );
};

export default Cards;
