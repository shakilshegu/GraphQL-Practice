import React from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>GraphQL CRUD Application</h1>
      <p>A complete User Management system with GraphQL, Node.js, MongoDB, and React.js</p>
      
      <UserForm />
      <UserList />
    </div>
  );
}

export default App;