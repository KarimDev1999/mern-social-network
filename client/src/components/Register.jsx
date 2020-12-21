import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/context';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const { setAlertMessage } = useContext(Context);

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const onNameChange = (e) => {
        setName(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }


    const submit = async (e) => {
        e.preventDefault();
        try {
            const newUser = { email, name, password };
            let res = await axios.post('api/users/register', newUser);
            setAlertMessage(res.data.msg);
            setName('');
            setEmail('');
            setPassword('');
        }
        catch (err) {
            alert(err.response.data);
        }
    }


    return (
        <div className='register'>
            <div className="container">
                <h1>Registration</h1>
                <form className="form" onSubmit={submit}>
                    <label htmlFor="email">email</label>
                    <input value={email} onChange={onEmailChange} type="email" placeholder='enter your email' />
                    <label htmlFor="name">name</label>
                    <input value={name} onChange={onNameChange} type="name" placeholder='enter your name' />
                    <label htmlFor="password">password</label>
                    <input value={password} onChange={onPasswordChange} type="password" placeholder='enter your password' />
                    <input type="submit" value='submit' />
                </form>
                <Link to='/login'>Log in</Link>
            </div>
        </div>
    )
}

export default Register
