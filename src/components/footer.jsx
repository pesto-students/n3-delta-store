import { Typography } from '@material-ui/core';
import React from 'react';
import { getCurrentFullYear } from '../utils/util';

const Footer = (props) => {

    return (
        <footer >
            <Typography align="center" >
                Copyright © {getCurrentFullYear()} template
            </Typography>
        </footer >
    );

}

export default Footer;
