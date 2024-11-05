'use client';
import { useForm, SubmitHandler } from 'react-hook-form';

interface PatientFormInputs {
  name: string;
  contact: string;
  dietaryNeeds?: string;
  medicalDoc: FileList;
}

const PatientForm: React.FC = () => {
  const { register, handleSubmit } = useForm<PatientFormInputs>();

  const onSubmit: SubmitHandler<PatientFormInputs> = (data) => {
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
      <input 
        type="text" 
        placeholder="Contact Information" 
        {...register("contact", { required: true })} 
        className="w-full p-2 border rounded" 
      />
      <input 
        type="text" 
        placeholder="Dietary Needs" 
        {...register("dietaryNeeds")} 
        className="w-full p-2 border rounded" 
      />
      <label>
        Medical Documentation:
        <input 
          type="file" 
          {...register("medicalDoc", { required: true })} 
          className="w-full p-2 border rounded" 
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default PatientForm;
