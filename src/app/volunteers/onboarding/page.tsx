import OnboardingVideo from '../../components//OnboardingVideo';

const VolunteerOnboarding: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Volunteer Onboarding</h1>
      <p className="mb-6">Welcome to the team! Watch this short video to learn about our mission and the commitment expectations for volunteers.</p>
      <OnboardingVideo />
    </div>
  );
};

export default VolunteerOnboarding;
