import React, {useState} from 'react';
import './log-in.styles.scss';

import FormInput from '../../components/form-input/form-input.component';

const LogIn = () => {
    const [userCredentials, setCredentials] = useState({ email:'', password:''})

    const onChangeHandler = (event) => {
        const {name, value} = event.target
        setCredentials({...userCredentials, [name]:value})
    }

    const { email, password} = userCredentials;
    return (
        <div className='log-in'>
            <h1>אנחנו כבר מכירים</h1>
            <form className='log-in-form'>
                <FormInput
                name='email'
                type='email'
                label='מייל'
                value={email}
                handleChange={onChangeHandler}
                required
                />
                <FormInput
                name='password'
                type='password'
                label='סיסמא'
                value={password}
                handleChange={onChangeHandler}
                required
                />
            </form>
        </div>
    )
}

export default LogIn;