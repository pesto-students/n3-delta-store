import { AppBar, Button, Toolbar } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = (props) => {
    const { pathname } = useLocation();

    return (
        <AppBar position="static" color="transparent">
            <Toolbar >
                <Button variant={pathname === '/' ? 'contained' : 'text'} color="primary">Home</Button>
                <Button variant={pathname === '/shop' ? 'contained' : 'text'} color="primary">Shop</Button>
                <Button variant={pathname === '/about' ? 'contained' : 'text'} color="primary">About</Button>
            </Toolbar>
        </AppBar>
    );

}

export default Header;
