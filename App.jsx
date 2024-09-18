import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function Crud() {
const [users, setUsers] = useState([]);
const [formData, setFormData] = useState({ name: "", email: "", password: "" });
const [currentUser, setCurrentUser] = useState(null);
const [message, setMessage] = useState("");
const [error, setError] = useState("");
const fetchUsers = async () => {
try {
const response = await axios.get("http://localhost:8081/users");
setUsers(response.data);
} catch (error) {
console.error("Error fetching users:", error);
    }
};
useEffect(() => {
    fetchUsers();
}, []);
const handleSubmit = async (e) => {
e.preventDefault();

if (!formData.name || !formData.email || !formData.password) {
setError("All fields are required.");
return;
}
setError("");
setMessage("");
try {
if (currentUser && currentUser._id) {
 await axios.put(`http://localhost:8081/users/${currentUser._id}`, formData);
setMessage("User updated successfully!");
} else {
await axios.post("http://localhost:8081/users", formData);
setMessage("User created successfully!");
}
fetchUsers();
setFormData({ name: "", email: "", password: "" });
setCurrentUser(null);
} catch (error) {
setError("Error saving user.");
console.error("Error:", error);
}
};
const handleEdit = (user) => {
  setFormData({ name: user.name, email: user.email, password: user.password });
  setCurrentUser(user);
  };

const handleDelete = async (id) => {
try {
await axios.delete(`http://localhost:8081/users/${id}`);
setMessage("User deleted successfully!");
fetchUsers();
setFormData({ name: "", email: "", password: "" });
setCurrentUser(null);
 } catch (error) {
setError("Error deleting user.");
console.error("Error:", error);
}
};

  return (
<div className="container mt-4">
  <h2 className="text-center mb-4">User Management</h2>
  <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow">
  <div className="form-group">
  <label htmlFor="name">Name:</label>
  <input
  type="text"
       className="form-control"
     id="name"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      required
     />
 </div>
 <div className="form-group">
  <label htmlFor="email">Email:</label>
  <input
  type="email"
  className="form-control"
  id="email"
  value={formData.email}
   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
   required
   />
  </div>
  <div className="form-group">
 <label htmlFor="password">Password:</label>
 <input
  type="password"
    className="form-control"
  id="password"
   value={formData.password}
  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
   required
  />
</div>
<div className="text-center p-2">
  <button type="submit" className="btn btn-primary">
  {currentUser ? "Update" : "Create"} User
  </button>
 </div>
 </form>

  {message && <div className="alert alert-success">{message}</div>}
  {error && <div className="alert alert-danger">{error}</div>}

  <h4 className="text-center">User List</h4>
  <table className="table table-bordered">
     <thead>
   <tr>
    <th>Name</th>
      <th>Email</th>
      <th>Password</th>
      <th>Actions</th>
    </tr>
   </thead>
 <tbody>
  {users.map((user) => (
    <tr key={user._id}>
  <td>{user.name}</td>
  <td>{user.email}</td>
   <td>{user.password}</td>
   <td>
<button className="btn btn-info btn-sm ms-2" onClick={() => handleEdit(user)}>Edit</button>
 <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(user._id)}>Delete</button>
 </td>
 </tr>
 ))}
</tbody>
</table>
</div>
);
}
export default Crud;
