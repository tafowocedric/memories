import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';

const Posts = () => {
    const post = useSelector((state) => state.posts);

    console.log(post);

    return (
        <div>
            <>
                POSTS
                <Post />
            </>
        </div>
    );
};

export default Posts;
