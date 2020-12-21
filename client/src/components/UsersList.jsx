import React, { useEffect, useState, useContext } from 'react';
//components
import AuthWarning from './AuthWarning';
import UserCard from './UserCard'
//components
import axios from 'axios';
import { Context } from '../context/context';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const { auth, setAuth, loading } = useContext(Context);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let res = await axios.get('api/users', { headers: { Authorization: `Bearer ${localStorage.getItem('userData')}` } });
                console.log(res);
                setUsers(res.data)
            }
            catch (err) {
                console.log(err.response.data.error);
                setAuth(false);
            }
        }
        fetchUsers();

    }, []);

    if (loading) {
        return <h1>loading...</h1>
    }
    return <div className='users-list'>
        {auth ? (
            <div className='users-list__wrapper'>
                <h1 className='users-list__title title'>Users</h1>
                {users.map(user => <UserCard key={user._id} user={user} />)}
            </div>
        ) : <AuthWarning />}
    </div>
}

export default UsersList;
