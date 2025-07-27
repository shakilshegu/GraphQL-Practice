import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER, GET_USERS } from '../graphql/queries';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onCompleted: () => {
      setFormData({ name: '', email: '', age: '' });
      alert('User created successfully!');
    },
    onError: (error) => {
      alert('Error: ' + error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.age) {
      alert('Please fill all fields');
      return;
    }

    createUser({
      variables: {
        input: {
          name: formData.name,
          email: formData.email,
          age: parseInt(formData.age)
        }
      }
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd' }}>
      <h3>Add New User</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
      </div>
      <button type="submit" disabled={loading} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
        {loading ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
};

export default UserForm;