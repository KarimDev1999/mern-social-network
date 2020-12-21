import React, { useContext, useEffect, useState } from 'react'
//components
import AuthWarning from './AuthWarning';
import PostCard from './PostCard';
import PostCardForOwner from './PostCardForOwner';
//components
import axios from 'axios';
import { Context } from '../context/context';

const Posts = () => {
    const { loggedInUser, setAuth, auth, setAlertMessage, loading } = useContext(Context);
    const [posts, setPosts] = useState([]);
    const [inputField, setInputField] = useState('');


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let res = await axios.get('api/posts', { headers: { Authorization: `Bearer ${localStorage.getItem('userData')}` } });
                setPosts(res.data)
            }
            catch (err) {
                console.log(err.response.data.error);
                setAuth(false);
            }
        }
        fetchPosts();

    }, []);

    const onChangeInputField = (e) => {
        setInputField(e.target.value)
    }

    const onSubmitPost = async (e) => {
        try {
            e.preventDefault();
            let res = await axios.post('api/posts', { text: inputField }, { headers: { Authorization: `Bearer ${localStorage.getItem('userData')}` } });
            if (res) {
                setAlertMessage(res.data.msg);
                setInputField('');
                setPosts([...posts, res.data.savedPost])
            }

        }
        catch (err) {
            console.log(err.response.data.error);
        }
    }


    const deletePost = async (postId) => {
        let res = await axios.delete(`api/posts/${postId}`);
        if (res) {
            setAlertMessage(res.data.msg)
            setPosts(posts.filter(el => el._id !== postId))
        }
    }


    if (loading) {
        return <h1>loading...</h1>
    }

    return (
        auth ? (
            <div className='posts'>
                <h1>
                    Posts
                </h1>
                <div className='posts__field'>
                    <div className='posts__field-avatar'>
                        <img src={`https://mern-social-network-test.herokuapp.com/uploads/${loggedInUser.avatar}`} alt="post-avatar" />
                    </div>
                    <form onSubmit={onSubmitPost} action="">
                        <input value={inputField} onChange={onChangeInputField} type="text" placeholder='create new post here :)' />
                        <input type="submit" value='Post' />
                    </form>
                </div>
                {posts.map(post => loggedInUser._id === post.postedBy._id ? <div className='posts__item' key={post._id}>{<PostCardForOwner post={post} deletePost={deletePost} />}</div> : <div key={post._id} className='posts__item'><PostCard post={post} /></div>)}
                <div />
            </div>
        )
            : <AuthWarning />
    )
}

export default Posts
