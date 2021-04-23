import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header, Home, Register, Login, Profile, Alert, UsersList, Posts } from './components';
import axios from 'axios';
import { Context } from './context/context';

const App = () => {

  const [loggedInUser, setLoggedInUser] = useState({});
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {

    const checkToken = async () => {
      try {
        setLoading(true);
        if (localStorage.getItem('userData')) {
          let res = await axios.post('https://mern-social-network-test.herokuapp.com/api/users/tokenIsValid', null, { headers: { Authorization: `Bearer ${localStorage.getItem('userData')}` } });
          if (res.data.auth) {
            setAuth(true);
            setLoggedInUser(res.data.user)
          }
        }
        setLoading(false);
      }
      catch (err) {
        console.log(err.response.data.error);
        setLoading(false);
      }
    }
    checkToken();
  }, []);






  return (
    <Context.Provider value={{ alertMessage, setAlertMessage, loading, setLoading, auth, setAuth, loggedInUser, setLoggedInUser }}>
      <BrowserRouter>
        <Header />
        {alertMessage ? <Alert /> : null}
        <div className='content'>
          <Switch>
            <Route exact path='/' render={() => <Home />} />
            <Route path='/login' render={() => <Login />} />
            <Route path='/register' render={() => <Register />} />
            <Route path='/users' render={() => <UsersList />} />
            <Route path='/profile/:id' render={() => <Profile />} />
            <Route path='/posts' render={() => <Posts />} />
          </Switch>
        </div>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App

