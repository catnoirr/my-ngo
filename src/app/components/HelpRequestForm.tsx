import { useForm, SubmitHandler } from 'react-hook-form';

interface HelpRequestInputs {
  requestDetails: string;
}

const HelpRequestForm: React.FC = () => {
  const { register, handleSubmit } = useForm<HelpRequestInputs>();

  const onSubmit: SubmitHandler<HelpRequestInputs> = (data) => {
    console.log(data);
    // Handle request submission logic here (e.g., API call)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <textarea 
        placeholder="Describe your needs" 
        {...register("requestDetails", { required: true })} 
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Request</button>
    </form>
  );
};

export default HelpRequestForm;
