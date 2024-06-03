import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    position: '',
    department: '',
    startDate: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/employees', formData);
      fetchEmployees();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="App">
      <h1>Employee Management System</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
        <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        <button type="submit">Add Employee</button>
      </form>
      <div>
        <h2>Employees</h2>
        <ul>
          {employees.map(employee => (
            <li key={employee._id}>
              <strong>Name:</strong> {employee.name}, <strong>Email:</strong> {employee.email}, <strong>Phone:</strong> {employee.phone}, <strong>Address:</strong> {employee.address}, <strong>Position:</strong> {employee.position}, <strong>Department:</strong> {employee.department}, <strong>Start Date:</strong> {new Date(employee.startDate).toDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
