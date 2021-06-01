import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../store/actions/post';

const initialState = {
    title: '',
    message: '',
    tags: [],
    selectedFile: '',
};

const Form = ({ postId, setPostId }) => {
    const style = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const [post, setPost] = useState(initialState);

    const postData = useSelector((state) => (postId ? state.posts.find((_post) => _post._id === postId) : null));
    useEffect(() => {
        if (postData) setPost(postData);
    }, [postData]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (postId) dispatch(updatePost(postId, { ...post, name: user?.name }));
        else dispatch(createPost({ ...post, name: user?.name }));
        clear();
    };
    const clear = () => {
        setPostId(null);
        setPost(initialState);
    };

    const onChange = (e) => {
        if (e.target.name === 'tags') {
            setPost({ ...post, [e.target.name]: e.target.value.split(',') });
        } else {
            setPost({ ...post, [e.target.name]: e.target.value });
        }
    };

    if (!user?.name) {
        return (
            <Paper className={style.paper}>
                <Typography variant='h6' align='center'>
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={style.paper}>
            <form autoComplete='off' noValidate className={`${style.root} ${style.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{postId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField name='title' variant='outlined' label='Title' fullWidth value={post.title} onChange={onChange} />
                <TextField name='message' variant='outlined' label='Message' fullWidth value={post.message} onChange={onChange} />
                <TextField name='tags' variant='outlined' label='Tags' fullWidth value={post.tags} onChange={onChange} />

                <div className={style.fileInput}>
                    <FileBase type='file' multiple={false} onDone={(base64) => setPost({ ...post, selectedFile: base64.base64 })} />
                </div>

                <Button className={style.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>
                    Submit
                </Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;
