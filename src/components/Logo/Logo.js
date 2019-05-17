import React from 'react';
import classes from './Logo.css'
import burgerLogo from '../../assets/images/logo.jpg';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="myBurger"/>
    </div>
)

export default logo;