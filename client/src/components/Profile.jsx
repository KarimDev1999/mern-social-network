import React, { useEffect, useState, useContext } from 'react';
//components
import RegularProfileCard from './RegularProfileCard';
import ProfileCardForOwner from './ProfileCardForOwner';
import AuthWarning from './AuthWarning';
//components
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/context';


const Profile = () => {
    const [user, setUser] = useState({});
    const [isOwner, setIsOwner] = useState(false);
    const [file, setFile] = useState(null);
    const [img, setImg] = useState('')
    const [isEdit, setIsEdit] = useState(false);
    const [statusValue, setStatusValue] = useState('')
    const params = useParams();

    const { setAlertMessage, setAuth, loading, auth, setLoggedInUser, loggedInUser } = useContext(Context);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`https://mern-social-network-test.herokuapp.com/api/users/${params.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('userData')}` } });
                setUser(res.data.user);
                setIsOwner(res.data.isOwner);
            }
            catch (err) {
                console.log(err.response.data.error);
                setAuth(false);
            }
        }
        fetchUser();
    }, [params.id]);


    const onBlurHandler = async () => {
        const res = await axios.put(`https://mern-social-network-test.herokuapp.com/api/users/status`, { userId: user._id, status: statusValue });
        setAlertMessage(res.data.msg);
        setIsEdit(false);
        setUser({ ...user, status: statusValue })
    }

    const onChangeHandler = (e) => {
        setStatusValue(e.target.value)
    }

    const onStatusChange = () => {
        setIsEdit(true);
    }

    const onChangeAvatar = (e) => {
        setFile(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImg(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const onSubmitAvatar = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            let res = await axios.put('https://mern-social-network-test.herokuapp.com/api/users/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('userData')}`
                },
            })
            setLoggedInUser({ ...loggedInUser, avatar: res.data.avatar });
            setAlertMessage(res.data.msg)
        }

        catch (err) {
            if (err.response.status === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }



    if (loading) {
        return <h1>loading...</h1>
    }

    return (
        <div className='profile'>
            {auth ?
                <>
                    {isOwner ?
                        <ProfileCardForOwner img={img} onSubmitAvatar={onSubmitAvatar} isEdit={isEdit} user={user} onStatusChange={onStatusChange} onChangeAvatar={onChangeAvatar} onBlurHandler={onBlurHandler} onChangeHandler={onChangeHandler} />
                        :
                        <RegularProfileCard img={img} user={user} />
                    }
                </>
                : <AuthWarning />
            }
        </div>
    )
}

export default Profile;
