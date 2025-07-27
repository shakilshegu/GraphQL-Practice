import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER, DELETE_USER, GET_USERS } from '../graphql/queries';

const UserItem = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    age: user.age
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onCompleted: () => {
      setIsEditing(false);
      alert('User updated successfully!');
    }
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onCompleted: () => {
      alert('User deleted successfully!');
    }
  });

  const handleUpdate = () => {
    updateUser({
      variables: {
        id: user.id,
        input: {
          name: editData.name,
          email: editData.email,
          age: parseInt(editData.age)
        }
      }
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser({ variables: { id: user.id } });
    }
  };

  if (isEditing) {
    return (
      <div style={{ padding: '10px', border: '1px solid #ddd', marginBottom: '10px' }}>
        <input
          type="text"
          value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <input
          type="email"
          value={editData.email}
          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <input
          type="number"
          value={editData.age}
          onChange={(e) => setEditData({ ...editData, age: e.target.value })}
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button onClick={handleUpdate} style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
          Save
        </button>
        <button onClick={() => setIsEditing(false)} style={{ padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none' }}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', marginBottom: '10px' }}>
      <h4>{user.name}</h4>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
      <button onClick={() => setIsEditing(true)} style={{ padding: '5px 10px', marginRight: '5px', backgroundColor: '#ffc107', border: 'none' }}>
        Edit
      </button>
      <button onClick={handleDelete} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none' }}>
        Delete
      </button>
    </div>
  );
};

export default UserItem;