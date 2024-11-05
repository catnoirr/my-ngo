import React from 'react';

const TrainingMaterial: React.FC = () => {
    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold">Training Materials</h2>
            <ul className="space-y-2">
                <li><a href="#" className="text-blue-500">Volunteer Handbook</a></li>
                <li><a href="#" className="text-blue-500">Emergency Response Protocols</a></li>
                <li><a href="#" className="text-blue-500">Code of Conduct</a></li>
            </ul>
        </div>
    );
};

export default TrainingMaterial;
