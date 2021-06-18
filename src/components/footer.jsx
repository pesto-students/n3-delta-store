import React from 'react';
import { getCurrentFullYear } from '../utils/util';

const Footer = (props) => {

    return (
        <footer >
            <div className="copyright">
                Copyright © {getCurrentFullYear()} template
            </div>
        </footer >
    );

}

export default Footer;
