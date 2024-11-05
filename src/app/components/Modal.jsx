import React from 'react';

const Modal = ({ isOpen, onClose, request }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-1/3">
        <h2 className="text-xl font-semibold mb-4">Request Details</h2>
        <p className="mb-2"><strong>Details:</strong> {request.details}</p>
        <p className="mb-2"><strong>Date:</strong> {request.date}</p>
        <p className="mb-2"><strong>Status:</strong> {request.status}</p>
        <p className="mb-2"><strong>Email:</strong> {request.email}</p>
        <p className="mb-2"><strong>Phone:</strong> {request.phone}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
