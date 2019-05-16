import React from 'react';
import classes from './Modal.css'
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <Aux>
        <Backdrop show={props.show}/>
        <div className={classes.Modal}
            style={{
            transform: props.show ? 'translate(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
       <span className={classes.Exit} onClick={props.modalClosed}>&#10007;</span>
            {props.children}
        </div>
    </Aux>

)

export default modal;