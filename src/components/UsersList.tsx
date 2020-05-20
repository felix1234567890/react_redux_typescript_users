import React, { FC } from 'react';
import UserItem, { User } from './UserItem';

interface UsersListProps {
  users: User[];
  loading: boolean;
}
const UsersList: FC<UsersListProps> = ({ users, loading }) => {
  return (
    <div className="container">
      {loading && <h1>Loading...</h1>}
      <section className="card-row">
        {users.length > 0 &&
          users.map((user: User, index: number) => {
            return <UserItem user={user} key={index} />;
          })}
      </section>
    </div>
  );
};

export default UsersList;
