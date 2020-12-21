import React, { useContext } from 'react';
//components
import AuthWarning from './AuthWarning';
//components
import homepageImg from '../assets/homepage.png';
import { Context } from '../context/context';

const Home = () => {
    const { loggedInUser, auth, loading } = useContext(Context);

    if (loading) {
        return <h1>loading...</h1>
    }
    return (

        <div className='homepage'>
            <div className="homepage__image">
                <img src={homepageImg} alt="homepage" />
            </div>
            {auth ? (
                <div className='homepage__text'>
                    <h1 className='homepage__text-title title'>Welcome <span>{loggedInUser && loggedInUser.name[0].toUpperCase() + loggedInUser.name.slice(1)}.</span></h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, ex praesentium adipisci repudiandae distinctio molestiae architecto reprehenderit iusto eos dicta vero earum saepe, consequuntur explicabo. Atque in ipsam accusantium nam!</p>
                </div>
            ) : <AuthWarning />
            }
        </div>

    )
}

export default Home
