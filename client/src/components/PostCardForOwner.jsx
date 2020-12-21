import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const PostCardForOwner = ({ post, deletePost }) => {
    return (
        <>
            <Link to={`profile/${post.postedBy && post.postedBy._id}`} >
                <div className="posts__item-avatar">
                    <img src={post.postedBy && `https://mern-social-network-test.herokuapp.com/uploads/${post.postedBy.avatar}`} alt="avatar" />
                </div>
            </Link>
            <div className='posts__item-info'>
                <span>{post.postedBy && post.postedBy.name[0].toUpperCase() + post.postedBy.name.slice(1)}</span>
                <br />
                <Moment format="HH:mm YYYY-MM-DD">{post.createdAt}</Moment>
                <p className='posts__item-text'>{post.text}</p>
            </div>
            <div className='posts__item-button'>
                <button className='button' onClick={() => deletePost(post._id)}>&times;</button>
            </div>
        </>
    )
}

export default PostCardForOwner;
