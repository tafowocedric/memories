import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from '../Posts/Posts';
import Form from '../Forms/Form';

// Actions
import { getPosts } from '../../store/actions/post';
import useStyles from './styles';

const Home = () => {
    const [postId, setPostId] = useState(null);
    const style = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [postId, dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid container className={style.mainContainer} justify='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} md={7}>
                        <Posts postId={postId} setPostId={setPostId} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Form postId={postId} setPostId={setPostId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
