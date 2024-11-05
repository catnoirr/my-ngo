const PrivacyConsent: React.FC = () => {
    return (
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Privacy and Consent</h2>
        <p className="mb-4">Please review and consent to data sharing with our volunteer team.</p>
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" required />
          I consent to share my data with approved volunteers to receive assistance.
        </label>
      </div>
    );
  };
  
  export default PrivacyConsent;
  