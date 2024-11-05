"use client";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { db } from "../../firebase"; // Adjust the import path as necessary
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; // Import setDoc and doc
import Image from 'next/image'; // Import the Image component

const VolunteerSignUp = () => {
  const auth = getAuth();
  const storage = getStorage();

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    idVerification: File | null;
    volunteeringPreferences: string;
    password: string;
    location: string;
  }>({
    name: "",
    email: "",
    idVerification: null,
    volunteeringPreferences: "",
    password: "",
    location: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, idVerification: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    setLoading(true);

    try {
      // Authenticate user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      console.log("User credential:", userCredential);

      // Add volunteer data to Firestore with uid as document ID
      const volunteerData = {
        uid: user.uid, // Store Firebase user UID
        name: formData.name,
        email: formData.email,
        volunteeringPreferences: formData.volunteeringPreferences,
        idVerification:
          "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        location: formData.location,
        createdAt: new Date(),
        verified: false,
        role: "volunteer", // Add role field to volunteers collection
      };

      // Use setDoc to create a document with the user's UID as the ID
      await setDoc(doc(db, "volunteers", user.uid), volunteerData);
      console.log("Volunteer data added to Firestore with pending status");

      // Add the user's email and role to the users collection
      await addDoc(collection(db, "users"), {
        uid: user.uid, // Store Firebase user UID
        email: formData.email,
        role: "volunteer",
        userId: user.uid, // Use the UID as userId in users collection
      });
      console.log("User data added to users collection");

      setSuccessMessage("Welcome Volunteer! Please wait for verification.");
      console.log("Success message set:", "Welcome Volunteer! Please wait for verification.");

      // Clear the form fields
      setFormData({
        name: "",
        email: "",
        idVerification: null,
        volunteeringPreferences: "",
        password: "",
        location: "",
      });

    } catch (error) {
      console.error("Error signing up or uploading file:", error);
      setErrorMessage("An error occurred during sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto p-8 mt-10 bg-gradient-to-r from-green-50 to-white rounded-lg shadow-xl gap-6">
      <div className="md:w-1/2 p-6 bg-white rounded-l-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-green-600">
          Volunteer Sign Up
        </h2>
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          />
          <div className="mb-4">
            <label
              className="block mb-1 text-gray-600"
              htmlFor="idVerification"
            >
              Upload Document ID (e.g., Aadhar, PAN):
            </label>
            <input
              type="file"
              id="idVerification"
              onChange={handleFileChange}
              required
              className="border border-gray-300 rounded-lg p-3 w-full file:border-0 file:bg-green-500 file:text-white file:rounded-lg file:mr-2"
            />
          </div>
          <textarea
            name="volunteeringPreferences"
            placeholder="Preferences Area"
            value={formData.volunteeringPreferences}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg transition duration-200 shadow-md ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} text-white flex items-center justify-center`}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="spinner mr-2"></div>
                <span>Signing Up...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
      <div className="md:w-1/2 overflow-hidden rounded-r-lg hidden md:block">
        <Image
          src="/boy.png"
          alt="Volunteer Illustration"
          width={500}
          height={500}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
    </div>
  );
};

export default VolunteerSignUp;
