'use client';
import { useForm, SubmitHandler } from 'react-hook-form';

interface VolunteerFormInputs {
  name: string;
  idVerification: FileList;
  volunteeringArea: string;
}

const VolunteerForm: React.FC = () => {
  const { register, handleSubmit } = useForm<VolunteerFormInputs>();

  const onSubmit: SubmitHandler<VolunteerFormInputs> = (data) => {
    console.log(data);
    // Handle form submission logic here (e.g., API call)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input 
        type="text" 
        placeholder="Full Name" 
        {...register("name", { required: true })} 
        className="w-full p-2 border rounded" 
      />
      <label>
        ID Verification:
        <input 
          type="file" 
          {...register("idVerification", { required: true })} 
          className="w-full p-2 border rounded" 
        />
      </label>
      <select {...register("volunteeringArea")} className="w-full p-2 border rounded">
        <option value="">Select Preferred Volunteering Area</option>
        <option value="medical">Medical Assistance</option>
        <option value="logistics">Logistics</option>
        <option value="support">Emotional Support</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default VolunteerForm;
