import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { createPost } from '../../store/actions/post';

const Form = () => {
    const style = useStyles();
    const dispatch = useDispatch();

    const [post, setPost] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createPost(post));
    };
    const clear = () => {};
    const onChange = (e) => setPost({ ...post, [e.target.name]: e.target.value });

    return (
        <Paper className={style.paper}>
            <form autoComplete='off' noValidate className={`${style.root} ${style.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>Creating a Memory</Typography>
                <TextField name='creator' variant='outlined' label='Creator' fullWidth value={post.creator} onChange={onChange} />
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
