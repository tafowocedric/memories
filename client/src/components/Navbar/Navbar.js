import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

import memories from '../../images/memories.png';
import useStyles from './styles';
import { logout } from '../../store/actions/auth';

function Navbar() {
    const style = useStyles();
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const handleLogout = () => {
        logout();

        localStorage.clear();
        history.push('/');
        setUser(null);
    };

    return (
        <AppBar className={style.appBar} position='static' color='inherit'>
            <div className={style.brandContainer}>
                <Typography component={Link} to='/' className={style.heading} variant='h2' align='center'>
                    Memories
                </Typography>
                <img className={style.image} src={memories} alt='memories' height='60' />
            </div>

            <Toolbar className={style.toolbar}>
                {user ? (
                    <div className={style.profile}>
                        <Avatar className={style.purple} alt={user.name} src={user.imageUrl}>
                            {user.name.charAt(0)}
                        </Avatar>
                        <Typography className={style.userName} variant='h6'>
                            {user.name}
                        </Typography>
                        <Button variant='contained' className={style.logout} color='secondary' onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>
                        SignIn
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
