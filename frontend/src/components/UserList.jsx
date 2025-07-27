import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../graphql/queries';
import UserItem from './UserItem';

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3>Users ({data.users.length})</h3>
      {data.users.length === 0 ? (
        <p>No users found. Create your first user above!</p>
      ) : (
        data.users.map(user => (
          <UserItem key={user.id} user={user} />
        ))
      )}
    </div>
  );
};

export default UserList;