import React from 'react';
import { Link } from 'react-router-dom';


const UserCard = ({ user }) => {
    return (
        <div className='users-list__card'>
            <img src={`https://mern-social-network-test.herokuapp.com/uploads/${user.avatar}`} alt="avatar" />
            <p className='users-list__name'>{user.name}</p>
            <Link to={`/profile/${user._id}`} className='button outline'>View profile</Link>
        </div>
    )
}

export default UserCard
