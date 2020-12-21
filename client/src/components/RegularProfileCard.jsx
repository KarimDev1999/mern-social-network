import React from 'react'

const RegularProfileCard = ({ img, user }) => {
    return (
        <div className="profile__card">
            <h1 className='profile__title title'>
                Profile
            </h1>
            <div className='profile__avatar'>
                <div className="profile__img">
                    <img src={img ? img : `https://mern-social-network-test.herokuapp.com/uploads/${user.avatar}`} alt="img" />
                </div>
            </div>
            <div className='profile__info'>
                <h1 className='profile__card-title title'>{`name: ${user.name}`}</h1>
                <div className='text'>
                    <span>{user.status}</span>
                </div>
                <div className='text' >{`email: ${user.email}`}</div>
            </div>
            <button className='profile__button button'>Follow</button>
        </div>
    )
}

export default RegularProfileCard
