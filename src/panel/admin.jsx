// import React, { useState, useEffect } from 'react';
// import { db } from "../firebase/firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";

// const AdminTab = () => {
//   const [adminDetails, setAdminDetails] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAdminDetails = async () => {
//       try {
//         const adminQuery = query(collection(db, "SignUp"), where('role', '==', 'Admin'));
//         const adminSnapshot = await getDocs(adminQuery);

//         const adminData = adminSnapshot.docs.map(doc => doc.data());
//         setAdminDetails(adminData);
//       } catch (error) {
//         console.error('Error fetching admin details:', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdminDetails();
//   }, []); // Empty dependency array ensures the effect runs once after the initial render

//   return (
//     <div className="bg-white shadow-xl rounded my-6 md:mx-36 overflow-x-auto">
//       <h2 className="text-2xl font-semibold p-6 border-b text-secondary text-center">Admin Details</h2>
//       <div className="p-6">
//         {loading && <p className="text-gray-500">Loading admin details...</p>}
//         {!loading && adminDetails.length === 0 && (
//           <p className="text-gray-500">No admin details found.</p>
//         )}
//         {!loading && adminDetails.length > 0 && (
//           <table className="min-w-full bg-white border">
//             <thead>
//             <tr>
//                 <th className="py-3 px-4 bg-primary text-white border-b">Name</th>
//                 <th className="py-3 px-4 bg-primary text-white border-b">Email</th>
//                 <th className="py-3 px-4 bg-primary text-white border-b">Phone</th>
//                 <th className="py-3 px-4 bg-primary text-white border-b">State</th>
//                 <th className="py-3 px-4 bg-primary text-white border-b">Pincode</th>
//           </tr>
//             </thead>
//             <tbody>
//               {adminDetails.map((admin, index) => (
//                   <tr key={index}>
//                   <td className="py-2 px-4 border-b">{admin.userName}</td>
//                   <td className="py-2 px-4 border-b">{admin.userEmail}</td>
//                   <td className="py-2 px-4 border-b">{admin.userPhone}</td>
//                   <td className="py-2 px-4 border-b">{admin.userState}</td>
//                   <td className="py-2 px-4 border-b">{admin.userPincode}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminTab;


import React, { useState, useEffect } from 'react';
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";

const AdminTab = () => {
  const [adminDetails, setAdminDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const adminQuery = query(collection(db, "SignUp"), where('role', '==', 'Admin'));
        const adminSnapshot = await getDocs(adminQuery);

        const adminData = adminSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAdminDetails(adminData);
      } catch (error) {
        console.error('Error fetching admin details:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, []);

  const handleDelete = async (adminId) => {
    try {
      // Get a reference to the document
      const adminRef = doc(db, 'SignUp', adminId);

      // Delete the document
      await deleteDoc(adminRef);

      // Update the state to reflect the changes
      setAdminDetails((prevDetails) =>
        prevDetails.filter((admin) => admin.id !== adminId)
      );
    } catch (error) {
      console.error('Error deleting admin:', error.message);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded my-6 md:mx-36 overflow-x-auto">
      <h2 className="text-2xl font-semibold p-6 border-b text-secondary text-center">
        Admin Details
      </h2>
      <div className="p-6">
        {loading && <p className="text-gray-500">Loading admin details...</p>}
        {!loading && adminDetails.length === 0 && (
          <p className="text-gray-500">No admin details found.</p>
        )}
        {!loading && adminDetails.length > 0 && (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-3 px-4 bg-primary text-white border-b">Name</th>
                <th className="py-3 px-4 bg-primary text-white border-b">Email</th>
                <th className="py-3 px-4 bg-primary text-white border-b">Phone</th>
                <th className="py-3 px-4 bg-primary text-white border-b">State</th>
                <th className="py-3 px-4 bg-primary text-white border-b">Pincode</th>
                <th className="py-3 px-4 bg-primary text-white border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminDetails.map((admin) => (
                <tr key={admin.id}>
                  <td className="py-2 px-4 border-b">{admin.userName}</td>
                  <td className="py-2 px-4 border-b">{admin.userEmail}</td>
                  <td className="py-2 px-4 border-b">{admin.userPhone}</td>
                  <td className="py-2 px-4 border-b">{admin.userState}</td>
                  <td className="py-2 px-4 border-b">{admin.userPincode}</td>
                  <td className="py-2 px-4 border-b">
                  <td className="py-2 px-4 border-b">
                    <span
                      onClick={() => handleDelete(pandit.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Delete
                    </span>
                  </td>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminTab;


