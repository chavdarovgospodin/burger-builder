import React, { Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        adress: {
            street: '',
            postalCode: ''
        }
    }
    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Type your order here</h4>
                <form>
                <input className={classes.Input} type='text' placeholder="Your Name"/>
                <input className={classes.Input} type='email' placeholder="Email"/>
                <input className={classes.Input} type='text' placeholder="Street adress"/>
                <input className={classes.Input} type='text' placeholder="Postal code"/>
                <Button btnType='Success'>ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;