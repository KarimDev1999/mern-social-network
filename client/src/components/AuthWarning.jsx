import React from 'react'
import { Link } from 'react-router-dom';

const AuthWarning = () => {
    return (
        <div className='auth-warning'>
            <h2>You are not logged in</h2>
            <Link to="/login">Log in</Link>
        </div>
    )
}

export default AuthWarning
