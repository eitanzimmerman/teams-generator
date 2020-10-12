import React, {useState} from 'react';
import './sign-up.styles.scss';

import FormInput from '../../components/form-input/form-input.component';

const SignUp = () => {
    const [userCredentials, setCredentials] = useState({name:'', email:'', password:''})

    const onChangeHandler = (event) => {
        const {name, value} = event.target
        setCredentials({...userCredentials, [name]:value})
    }

    const {name, email, password} = userCredentials;
    return (
        <div className='sign-up'>
            <h1>? עוד לא הצטרפתם</h1>
            <form className='sign-up-form'>
                <FormInput
                name='name'
                type='name'
                label='שם מלא'
                value={name}
                handleChange={onChangeHandler}
                required
                />

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

export default SignUp;