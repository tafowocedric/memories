import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import memories from './images/memories.png';
import Posts from './components/Posts/Posts';
import Form from './components/Forms/Form';

// Actions
import { getPosts } from './store/actions/post';

import useStyles from './styles';

const App = () => {
    const [postId, setPostId] = useState(null);
    const style = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [postId, dispatch]);

    return (
        <Container maxidth='lg'>
            <AppBar className={style.appBar} position='static' color='inherit'>
                <Typography className={style.heading} variant='h2' align='center'>
                    Memories
                </Typography>
                <img className={style.image} src={memories} alt='memories' height='60' />
            </AppBar>
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
        </Container>
    );
};

export default App;
