// import React, { useState, useEffect } from 'react';
// import { db } from "../firebase/firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";

// const PanditTab = () => {
//   const [panditDetails, setpanditDetails] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchpanditDetails = async () => {
//       try {
//         const panditQuery = query(collection(db, "SignUp"), where('role', '==', 'Panditji'));
//         const panditSnapshot = await getDocs(panditQuery);

//         const panditData = panditSnapshot.docs.map(doc => doc.data());
//         setpanditDetails(panditData);
//       } catch (error) {
//         console.error('Error fetching pandit details:', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchpanditDetails();
//   }, []); // Empty dependency array ensures the effect runs once after the initial render

//   return (
//     <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
//       <h2 className="text-xl font-semibold p-6 border-b">pandit Details</h2>
//       <div className="p-6">
//         {loading && <p className="text-gray-500">Loading pandit details...</p>}
//         {!loading && panditDetails.length === 0 && (
//           <p className="text-gray-500">No pandit details found.</p>
//         )}
//         {!loading && panditDetails.length > 0 && (
//           <table className="min-w-full bg-white border">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b">Name</th>
//                 <th className="py-2 px-4 border-b">Email</th>
//                 {/* Add more columns as needed */}
//               </tr>
//             </thead>
//             <tbody>
//               {panditDetails.map((pandit, index) => (
//                 <tr key={index}>
//                   <td className="py-2 px-4 border-b">{pandit.userName}</td>
//                   <td className="py-2 px-4 border-b">{pandit.userEmail}</td>
//                   {/* Add more columns as needed */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PanditTab;

import React, { useState, useEffect } from 'react';
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";

const PanditTab = () => {
  const [panditDetails, setpanditDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchpanditDetails = async () => {
      try {
        const panditQuery = query(collection(db, "SignUp"), where('role', '==', 'Panditji'));
        const panditSnapshot = await getDocs(panditQuery);

        const panditData = panditSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setpanditDetails(panditData);
      } catch (error) {
        console.error('Error fetching pandit details:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchpanditDetails();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const handleDelete = async (panditId) => {
    try {
      // Get a reference to the document
      const panditRef = doc(db, 'SignUp', panditId);

      // Delete the document
      await deleteDoc(panditRef);

      // Update the state to reflect the changes
      setpanditDetails((prevDetails) =>
        prevDetails.filter((pandit) => pandit.id !== panditId)
      );
    } catch (error) {
      console.error('Error deleting pandit:', error.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
      <h2 className="text-xl font-semibold p-6 border-b">Pandit Details</h2>
      <div className="p-6">
        {loading && <p className="text-gray-500">Loading pandit details...</p>}
        {!loading && panditDetails.length === 0 && (
          <p className="text-gray-500">No pandit details found.</p>
        )}
        {!loading && panditDetails.length > 0 && (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {panditDetails.map((pandit) => (
                <tr key={pandit.id}>
                  <td className="py-2 px-4 border-b">{pandit.userName}</td>
                  <td className="py-2 px-4 border-b">{pandit.userEmail}</td>
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

export default PanditTab;
