import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setPostId }) => {
    const posts = useSelector((state) => state.posts);
    const style = useStyles();

    return !posts.length ? (
        <CircularProgress />
    ) : (
        <Grid className={style.mainContainer} container alignItems='stretch' spacing={3}>
            {posts.map((post) => (
                <Grid item key={post._id} xs={12} sm={6}>
                    <Post post={post} setPostId={setPostId} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;
