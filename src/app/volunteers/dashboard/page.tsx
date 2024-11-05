import React from 'react';
import TrainingMaterial from '../../components//TrainingMaterial';

const VolunteerDashboard: React.FC = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Volunteer Dashboard</h1>
            <p className="mb-6">
                As an approved volunteer, you have access to training materials and resources to support you in your role.
            </p>
            <TrainingMaterial />
        </div>
    );
};

export default VolunteerDashboard;
