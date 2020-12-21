import React from 'react';

const ProfileCardForOwner = ({ img, onSubmitAvatar, isEdit, user, onChangeAvatar, onStatusChange, onBlurHandler, onChangeHandler, statusValue }) => {
    return (
        <div className="profile__card">
            <h1 className='profile__title title'>
                Profile
            </h1>
            <div className='profile__avatar'>
                <div className="profile__img">
                    <img src={img ? img : `https://mern-social-network-test.herokuapp.com/uploads/${user.avatar}`} alt="img" />
                </div>
                <form>
                    <label htmlFor="myfile">Change avatar</label>
                    <input onChange={onChangeAvatar} className='profile__file' type="file" id="myfile" name="file" accept='image/*' />
                </form>
                <button className='button' onClick={onSubmitAvatar}>upload</button>
            </div>
            <div className='profile__info'>
                <h1 className='profile__card-title title'>{`name: ${user.name}`}</h1>
                <div className='text'>{
                    !isEdit ?
                        <span onDoubleClick={onStatusChange}>{user.status ? user.status : <span>изменить статус</span>}</span>
                        :
                        <input autoFocus={true} onBlur={onBlurHandler} onChange={onChangeHandler} type="text" value={statusValue} />
                }
                </div>
                <div className='text' >{`email: ${user.email}`}</div>
            </div>

        </div>
    )
}

export default ProfileCardForOwner
