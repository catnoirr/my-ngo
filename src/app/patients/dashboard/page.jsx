"use client";
import React, { useEffect, useState } from 'react';
import { FiLogOut, FiEdit, FiTrash2 ,FiEye} from 'react-icons/fi';
import { auth } from '../../firebase'; // Adjust the import based on your project structure
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { db } from '../../firebase'; // Adjust the import based on your project structure
import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingRequestId, setEditingRequestId] = useState(null);

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated
        const name = capitalizeFirstLetter(user.displayName || user.email || "User");
        setUserName(name);
        fetchUserRequests(user.uid);
        fetchUserDetails(user.uid);
      } else {
        // User is not authenticated, redirect to signup
        router.push('/patients/signup');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchUserDetails = async (userId) => {
    try {
      const snapshot = await getDocs(collection(db, 'patients'));
      const userData = snapshot.docs.find(doc => doc.data().uid === userId);
      if (userData) {
        setUserEmail(userData.data().email || "N/A");
        setUserPhone(userData.data().phone || "N/A");
      }
    } catch (error) {
      console.error("Error fetching user details: ", error);
    }
  };

  const fetchUserRequests = async (userId) => {
    try {
      const requestsRef = collection(db, 'requests');
      const snapshot = await getDocs(requestsRef);
      const requestsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(requestsData.filter(req => req.userId === userId));
    } catch (error) {
      console.error("Error fetching requests: ", error);
    }
  };

  const handleNewRequest = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      const newReq = {
        userId: user.uid,
        name: capitalizeFirstLetter(user.displayName || user.email || "User"),
        details: newRequest,
        date: new Date().toLocaleDateString(),
        status: "Pending",
        email: userEmail,
        phone: userPhone,
        assignedVolunteers: [] // Initialize as an empty array
      };

      try {
        const newDocRef = doc(collection(db, 'requests'), `${user.uid}_${Date.now()}`);
        await setDoc(newDocRef, newReq);
        setRequests(prev => [...prev, { id: newDocRef.id, ...newReq }]);
        setNewRequest("");
      } catch (error) {
        console.error("Error adding request: ", error);
      }
    }
};


  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleDeleteRequest = async (requestId) => {
    try {
      await deleteDoc(doc(db, 'requests', requestId));
      setRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error("Error deleting request: ", error);
    }
  };

  const handleEditRequest = async (requestId) => {
    const requestToEdit = requests.find(req => req.id === requestId);
    if (requestToEdit) {
      setNewRequest(requestToEdit.details);
      setEditingRequestId(requestId);
    }
  };

  const handleUpdateRequest = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user && editingRequestId) {
      const updatedReq = {
        userId: user.uid,
        name: capitalizeFirstLetter(user.displayName || user.email || "User"),
        details: newRequest,
        date: new Date().toLocaleDateString(),
        status: "Pending",
        email: userEmail,
        phone: userPhone
      };

      try {
        await setDoc(doc(db, 'requests', editingRequestId), updatedReq);
        setRequests(prev => prev.map(req => req.id === editingRequestId ? { ...req, ...updatedReq } : req));
        setNewRequest("");
        setEditingRequestId(null);
      } catch (error) {
        console.error("Error updating request: ", error);
      }
    }
  };

  const filteredRequests = filter === "All" ? requests : requests.filter(req => req.status === filter);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <header className="flex items-center justify-between mb-4 sm:mb-8">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-gray-700">{loading ? "Loading..." : `Hi! ${userName}`}</h1>
          <p className="text-sm text-gray-600">Email: {userEmail}</p>
          <p className="text-sm text-gray-600">Phone: {userPhone}</p>
        </div>
        <button onClick={handleLogout} className="text-gray-500 hover:text-red-600">
          <FiLogOut size={24} />
        </button>
      </header>

      <section className="mb-4 sm:mb-8 p-4 sm:p-6 bg-white shadow-md rounded-xl">
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Request Help</h3>
        <form onSubmit={editingRequestId ? handleUpdateRequest : handleNewRequest} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            value={newRequest}
            onChange={(e) => setNewRequest(e.target.value)}
            placeholder="Specify your needs"
            className="flex-1 p-2 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            {editingRequestId ? "Update Request" : "Submit Request"}
          </button>
        </form>
      </section>

      <section className="bg-white shadow-md rounded-xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Requests</h3>
        <div className="flex flex-wrap gap-2 sm:space-x-4 mb-4">
          <button onClick={() => setFilter("All")} className={`px-4 py-2 rounded ${filter === "All" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}>All</button>
          <button onClick={() => setFilter("Pending")} className={`px-4 py-2 rounded ${filter === "Pending" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"}`}>Pending</button>
          <button onClick={() => setFilter("Assigned")} className={`px-4 py-2 rounded ${filter === "Assigned" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-600"}`}>Assigned</button>
          <button onClick={() => setFilter("Completed")} className={`px-4 py-2 rounded ${filter === "Completed" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}>Completed</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm sm:text-base">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2">Request Details</th>
                <th className="py-2">Date</th>
                <th className="py-2">Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="border-b">
                  <td className="py-2">{request.details}</td>
                  <td className="py-2">{request.date}</td>
                  <td className={`py-2 ${request.status === "Pending" ? "text-red-600" : request.status === "Assigned" ? "text-yellow-600" : "text-green-600"}`}>
                    {request.status}
                  </td>
                  <td className="py-2 flex space-x-2">
                    {request.status === "Assigned" ? (
                      <button onClick={() => viewAssignedRequest(request.id)} className="text-blue-600 hover:text-blue-800">
                        <FiEye />
                      </button>
                    ) : (
                      <>
                        <button onClick={() => handleEditRequest(request.id)} className="text-blue-600 hover:text-blue-800">
                          <FiEdit />
                        </button>
                        <button onClick={() => handleDeleteRequest(request.id)} className="text-red-600 hover:text-red-800">
                          <FiTrash2 />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
R
    </div>
  );
}

