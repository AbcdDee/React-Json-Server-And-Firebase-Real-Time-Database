import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css'; // Ensure the CSS file is imported correctly

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Fetch all users (GET)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Add a new user (POST)
  const addUser  = async () => {
    if (!name || !email) {
      alert('Please fill in both name and email fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/users', { name, email });
      setUsers([...users, response.data]);
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Update a user (PUT)
  const updateUser  = async (id) => {
    if (!name || !email) {
      alert('Please fill in both name and email fields.');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:3001/users/${id}`, { name, email });
      const updatedUsers = users.map(user => (user.id === id ? response.data : user));
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Delete a user (DELETE)
  const deleteUser  = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      const filteredUsers = users.filter(user => user.id !== id);
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Partially update a user (PATCH)
  const patchUser  = async (id) => {
    if (!name) {
      alert('Please fill in the name field.');
      return;
    }
    try {
      const response = await axios.patch(`http://localhost:3001/users/${id}`, { name });
      const updatedUsers = users.map(user => (user.id === id ? response.data : user));
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error patching user:', error);
    }
  };

  return (
    <div className="users-container">
      <h1>Users</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="delete" style={{backgroundColor:'DarkGoldenRod' }} onClick={() => deleteUser (user.id)}>Delete</button>
                <button className="update"style={{backgroundColor:'green' }} onClick={() => updateUser (user.id)}>Update</button>
                <button className="patch" style={{backgroundColor:'darkMagenta' }} onClick={() => patchUser (user.id)}>Patch</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="user-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="add-user" onClick={addUser }>Add User</button>
      </div>
    </div>
  );
};

export default Users;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Users.js';
// import './Users.css';
// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   // Fetch all users (GET)
//   useEffect(() => {
//     axios.get('http://localhost:3001/users')
//       .then(response => setUsers(response.data))
//       .catch(error => console.error(error));
//   }, []);

//   // Add a new user (POST)
//   const addUser  = () => {
//     axios.post('http://localhost:3001/users', { name, email })
//       .then(response => setUsers([...users, response.data]))
//       .catch(error => console.error(error));
//   };

//   // Update a user (PUT)
//   const updateUser  = (id) => {
//     axios.put(`http://localhost:3001/users/${id}`, { name, email })
//       .then(response => {
//         const updatedUsers = users.map(user => user.id === id ? response.data : user);
//         setUsers(updatedUsers);
//       })
//       .catch(error => console.error(error));
//   };

//   // Delete a user (DELETE)
//   const deleteUser  = (id) => {
//     axios.delete(`http://localhost:3001/users/${id}`)
//       .then(() => {
//         const filteredUsers = users.filter(user => user.id !== id);
//         setUsers(filteredUsers);
//       })
//       .catch(error => console.error(error));
//   };

//   // Partially update a user (PATCH)
//   const patchUser  = (id) => {
//     axios.patch(`http://localhost:3001/users/${id}`, { name })
//       .then(response => {
//         const updatedUsers = users.map(user => user.id === id ? response.data : user);
//         setUsers(updatedUsers);
//       })
//       .catch(error => console.error(error));
//   };

//   return (
//     <div>
//       <h1>Users</h1>
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>
//             {user.name} - {user.email}
//             <button onClick={() => deleteUser (user.id)}>Delete</button>
//             <button onClick={() => updateUser (user.id)}>Update</button>
//             <button onClick={() => patchUser (user.id)}>Patch</button>
//           </li>
//         ))}
//       </ul>
//       <div>
//         <input type="text" placeholder="Name" value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input type="email" placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button onClick={addUser }>Add User</button>
//       </div>
//     </div>
//   );
// };

// export default Users;