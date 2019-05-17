import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div onClick={props.click}>
        {props.children}
    </div>
)

export default drawerToggle;