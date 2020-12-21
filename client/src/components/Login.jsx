import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/context';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const { setLoggedInUser, setAuth, setAlertMessage } = useContext(Context);



    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }


    const submit = async (e) => {
        e.preventDefault();
        try {
            const user = { email, password };
            let res = await axios.post('api/users/login', user);
            if (res.data) {
                setAlertMessage(res.data.msg);
                localStorage.setItem('userData', res.data.accessToken);
                setLoggedInUser(res.data.user);
                setAuth(true);
                history.push('/');
            }
        }
        catch (err) {
            alert(err.response.data.msg);
        }

    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <form className="form" onSubmit={submit}>
                <label htmlFor="email">email</label>
                <input onChange={onEmailChange} type="email" placeholder='enter your email' />
                <label htmlFor="password">password</label>
                <input onChange={onChangePassword} type="password" placeholder='enter your password' />
                <input type="submit" value='submit' />
            </form>
            <Link to='/register'>Registration</Link>
        </div>
    )
}

export default Login
