import React, { Fragment } from "react";
import logo from '../assets/logo.png';
import './Header.css';

let Header = () => {
    return (
        <Fragment>
            <nav>
                <img className='logo' src={logo} alt="logo" />
            </nav>

        </Fragment>
    );
}

export default Header;