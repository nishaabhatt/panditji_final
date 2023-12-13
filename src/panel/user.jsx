// import React, { useState, useEffect } from 'react';
// import { db } from "../firebase/firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";

// const UserTab = () => {
//   const [userDetails, setuserDetails] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchuserDetails = async () => {
//       try {
//         const userQuery = query(collection(db, "SignUp"), where('role', '==', 'user'));
//         const userSnapshot = await getDocs(userQuery);

//         const userData = userSnapshot.docs.map(doc => doc.data());
//         setuserDetails(userData);
//       } catch (error) {
//         console.error('Error fetching user details:', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchuserDetails();
//   }, []); // Empty dependency array ensures the effect runs once after the initial render

//   return (
//     <div className="bg-white shadow-xl rounded my-6 md:mx-36 overflow-x-auto">
//   <h2 className="text-2xl font-semibold p-6 border-b text-secondary text-center">User Details</h2>
//   <div className="p-6">
//     {loading && <p className="text-gray-500">Loading user details...</p>}
//     {!loading && userDetails.length === 0 && (
//       <p className="text-gray-500">No user details found.</p>
//     )}
//     {!loading && userDetails.length > 0 && (
//       <table className="min-w-full bg-white border border-gray-300">
//         <thead>
//           <tr>
//             <th className="py-3 px-4 bg-primary text-white border-b">Name</th>
//             <th className="py-3 px-4 bg-primary text-white border-b">Email</th>
//             <th className="py-3 px-4 bg-primary text-white border-b">Phone</th>
//             <th className="py-3 px-4 bg-primary text-white border-b">State</th>
//             <th className="py-3 px-4 bg-primary text-white border-b">Pincode</th>
//           </tr>
//         </thead>
//         <tbody>
//           {userDetails.map((user, index) => (
//             <tr key={index}>
//               <td className="py-2 px-4 border-b">{user.userName}</td>
//               <td className="py-2 px-4 border-b">{user.userEmail}</td>
//               <td className="py-2 px-4 border-b">{user.userPhone}</td>
//               <td className="py-2 px-4 border-b">{user.userState}</td>
//               <td className="py-2 px-4 border-b">{user.userPincode}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     )}
//   </div>
// </div>

//   );
// };

// export default UserTab;


import React, { useState, useEffect } from 'react';
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";

const UserTab = () => {
  const [userDetails, setuserDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchuserDetails = async () => {
      try {
        const userQuery = query(collection(db, "SignUp"), where('role', '==', 'user'));
        const userSnapshot = await getDocs(userQuery);

        const userData = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setuserDetails(userData);
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchuserDetails();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const handleDelete = async (userId) => {
    try {
      // Get a reference to the document
      const userRef = doc(db, 'SignUp', userId);

      // Delete the document
      await deleteDoc(userRef);

      // Update the state to reflect the changes
      setuserDetails((prevDetails) =>
        prevDetails.filter((user) => user.id !== userId)
      );
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded my-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold p-6 border-b text-secondary text-center">User Details</h2>
      <div className="p-6">
        {loading && <p className="text-gray-500">Loading user details...</p>}
        {!loading && userDetails.length === 0 && (
          <p className="text-gray-500">No user details found.</p>
        )}
        {!loading && userDetails.length > 0 && (
          <table className="min-w-full bg-white border border-gray-300">
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
              {userDetails.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.userName}</td>
                  <td className="py-2 px-4 border-b">{user.userEmail}</td>
                  <td className="py-2 px-4 border-b">{user.userPhone}</td>
                  <td className="py-2 px-4 border-b">{user.userState}</td>
                  <td className="py-2 px-4 border-b">{user.userPincode}</td>
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

export default UserTab;

