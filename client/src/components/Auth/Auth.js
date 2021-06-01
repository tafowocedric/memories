import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { GOOGLE_ID } from './Constant';
import { AUTH } from '../../store/constants/actionTypes';
import { signup, signin } from '../../store/actions/auth';

const initialState = {
    showPassword: false,
    isSignUp: false,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const Auth = () => {
    const style = useStyles();
    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(signup(state, history));
        } else {
            dispatch(signin(state, history));
        }
    };

    const handleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

    const handleShowPassword = () => setState({ ...state, showPassword: !state.showPassword });

    const switchMode = () => setState({ ...state, isSignUp: !state.isSignUp });

    const { isSignUp, showPassword } = state;

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: AUTH, payload: { ...result, token } });
            history.push('/');
        } catch (error) {
            alert(error);
        }
    };
    const googleFailure = () => console.log('Google Sign In was unsuccessful. Try Again Later');

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={style.paper} elevation={3}>
                <Avatar className={style.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={style.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                            </>
                        )}

                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />

                        {isSignUp && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password' />}
                    </Grid>
                    {/* google login */}
                    <Button type='submit' fullWidth variant='contained' color='primary' className={style.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId={GOOGLE_ID}
                        render={(renderProps) => (
                            <Button className={style.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon width='20px' height='20px' color='currentColor' />} variant='contained'>
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justify='flex-end'>
                        <Button onClick={switchMode}>{isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}</Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
