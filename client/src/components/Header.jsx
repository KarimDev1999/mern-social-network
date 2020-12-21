import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/context';


const navItems = [{ name: 'Home', path: '/' }, { name: 'Users', path: '/users' }, { name: 'Posts', path: '/posts' }];

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { auth, setAuth, loggedInUser } = useContext(Context);


    const signout = async () => {
        localStorage.removeItem('userData');
        setAuth(false);
    }

    const onMenuClick = () => {
        setShowMenu(!showMenu);
    }

    return (
        <header className='header'>
            <button onClick={onMenuClick} className={showMenu ? "header__menu header__menu-active" : "header__menu"}>
                <span></span>
            </button>
            <nav className={showMenu ? 'header__nav header__nav-active' : 'header__nav'}>
                <ul>
                    {
                        navItems.map((item, i) => <li key={i}><Link onClick={() => setShowMenu(false)} key={`${item.name} ${item.path}`} to={item.path}>{item.name}</Link></li>)
                    }
                </ul>
            </nav>
            <div className='header__auth-info'>
                {!auth ? <Link to='/login'>Login</Link> : <><Link to={`/profile/${loggedInUser._id}`}>{loggedInUser.name} ↓</Link> <button className='header_button button' onClick={signout}>signout</button></>}
            </div>
        </header>
    )
}

export default Header;
