// import { useState } from 'react';
// import { db } from "../firebase/firebase";
// import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
// // import Layout from "../components/dashboadPanel/LayoutS";

// const SuperAdmin = () => {
//   const [email, setEmail] = useState('');
//   const [selectedRole, setSelectedRole] = useState('user');
//   const [error, setError] = useState(null);
//   const [documentId, setDocumentId] = useState(null);

  
//   const handleRoleUpdate = async () => {
//     setError(null);

//     if (!email) {
//       setError('Email is required');
//       return;
//     }

//     try {
//       const signUpCollection = collection(db, "SignUp");

//       // Query for the document based on the email
//       const userQuery = query(signUpCollection, where('userEmail', '==', email));
//       const querySnapshot = await getDocs(userQuery);

//       if (querySnapshot.empty) {
//         setError('User with this email does not exist');
//         return;
//       }

//       const userDoc = querySnapshot.docs[0];

//       // Set the Document ID in the state
//       setDocumentId(userDoc.id);

//       // Get the selected role dynamically
//       const selectedRoleValue = {
//         'admin': 'Admin',
//         'super-admin': 'Super Admin',
//         'user': 'User',
//         'panditji': 'Panditji',
//       }[selectedRole];

//       // Now you can use the Document ID for updating the document
//       await updateDoc(doc(signUpCollection, userDoc.id), {
//         role: selectedRoleValue,
//       });


//           // Fetch the updated user details after updating the role
//     const updatedUserQuery = query(signUpCollection, where('userEmail', '==', email));
//     const updatedUserSnapshot = await getDocs(updatedUserQuery);

//     if (!updatedUserSnapshot.empty) {
//       const updatedUserData = updatedUserSnapshot.docs[0].data();
      
//       // Log or use the updated user details as needed
//       console.log('Updated user details:', updatedUserData);
//     }

//       // Clear the form fields
//       setEmail('');
//       setSelectedRole('user');

//       alert('Role updated successfully');
//     } catch (error) {
//       console.error('Error updating role:', error.message);
//       setError('Error updating role');
//     }
//   };

//   return (
//     // <Layout>
//     <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md my-20">
//       <h2 className="text-2xl font-semibold mb-4">Super Admin Page</h2>
//       <form className="space-y-4">
//         <label className="block text-gray-700">Email:</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//         />

//         <label className="block text-gray-700">Select Role:</label>
//         <select
//           value={selectedRole}
//           onChange={(e) => setSelectedRole(e.target.value)}
//           className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//         >
//           <option value="admin">Admin</option>
//           {/* <option value="super-admin">Super Admin</option> */}
//           <option value="user">User</option>
//           <option value="panditji">Panditji</option>
//         </select>

//         {error && <p className="text-red-500">{error}</p>}

//         <button
//           type="button"
//           onClick={handleRoleUpdate}
//           className="w-full px-4 py-2 bg-secondary text-white rounded-md focus:outline-none hover:bg-primary"
//         >
//           Update Role
//         </button>
//       </form>
//     </div>
//     // </Layout>
//   );
// };

// export default SuperAdmin;


import { useState } from 'react';
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

const SuperAdmin = ({ onRoleUpdate }) => {
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('user');
  const [error, setError] = useState(null);

  const handleRoleUpdate = async () => {
    setError(null);

    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      const signUpCollection = collection(db, "SignUp");
      const userQuery = query(signUpCollection, where('userEmail', '==', email));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        setError('User with this email does not exist');
        return;
      }

      const userDoc = querySnapshot.docs[0];

      // Get the selected role dynamically
      const selectedRoleValue = {
        'admin': 'Admin',
        'user': 'User',
        'panditji': 'Panditji',
      }[selectedRole];

      await updateDoc(doc(signUpCollection, userDoc.id), {
        role: selectedRoleValue,
      });


      
      // Fetch all admin details after updating the role to admin
      if (selectedRole === 'admin') {
        const adminQuery = query(signUpCollection, where('role', '==', 'Admin'));
        const adminSnapshot = await getDocs(adminQuery);

        const adminDetails = adminSnapshot.docs.map(doc => doc.data());
        // Pass adminDetails to the callback
        onRoleUpdate(adminDetails);
      }

           // Fetch all pandit details after updating the role to pandit
         else  if (selectedRole === 'Panditji') {
            const panditQuery = query(signUpCollection, where('role', '==', 'Panditji'));
            const panditSnapshot = await getDocs(panditQuery);
    
            const panditDetails = panditSnapshot.docs.map(doc => doc.data());
            // Pass panditDetails to the callback
            onRoleUpdate(panditDetails);
          }

          else  if (selectedRole === 'user') {
            const userQuery = query(signUpCollection, where('role', '==', 'user'));
            const userSnapshot = await getDocs(userQuery);
    
            const userDetails = userSnapshot.docs.map(doc => doc.data());
            // Pass userDetails to the callback
            onRoleUpdate(userDetails);
          }
    
    


      // Clear the form fields
      setEmail('');
      setSelectedRole('user');

      alert('Role updated successfully');
    } catch (error) {
      console.error('Error updating role:', error.message);
      setError('Error updating role');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md my-20">
      <h2 className="text-2xl font-semibold mb-4">Super Admin Page</h2>
      <form className="space-y-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />

        <label className="block text-gray-700">Select Role:</label>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="panditji">Panditji</option>
        </select>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="button"
          onClick={handleRoleUpdate}
          className="w-full px-4 py-2 bg-secondary text-white rounded-md focus:outline-none hover:bg-primary"
        >
          Update Role
        </button>
      </form>
    </div>
  );
};

export default SuperAdmin;

