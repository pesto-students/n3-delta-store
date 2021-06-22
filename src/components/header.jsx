import { AppBar, Button, Toolbar } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = (props) => {
    const { pathname } = useLocation();

    return (
        <AppBar position="static" color="transparent">
            <Toolbar >
                <Button variant="contained" className={pathname === '/' ? 'active' : ''} color="primary">Home</Button>
                <Button variant="contained" className={pathname === '/shop' ? 'active' : ''} color="primary">Shop</Button>
                <Button variant="contained" className={pathname === '/about' ? 'active' : ''} color="primary">About</Button>
            </Toolbar>
        </AppBar>
    );

}

export default Header;
