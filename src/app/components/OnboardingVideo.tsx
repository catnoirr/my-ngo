const OnboardingVideo: React.FC = () => {
    return (
      <div className="mt-6">
        <video controls className="w-full">
          <source src="/path/to/onboarding-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };
  
  export default OnboardingVideo;
  