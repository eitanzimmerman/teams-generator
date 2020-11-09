import React, {useState, useContext} from 'react';

import './sign-up.styles.scss';

import UserContext from '../../context/user-context';
import FormInput from '../../components/form-input/form-input.component';
import CostumButton from '../costum-button/costum-button.component';

const SignUp = () => {
    const [userCredentials, setCredentials] = useState({name:'', email:'', password:''})

    const userContext = useContext(UserContext);

    const onChangeHandler = (event) => {
        const {name, value} = event.target
        setCredentials({...userCredentials, [name]:value})
    }

    const {name, email, password} = userCredentials;

    const handleButtonClick = () => {
        // simple validtaion -- need to be further developed
        if ( password.length < 7 || !email.includes('@')){
            alert("בעיה בהזנת הפרטים")
            return
        }
        
        const isAuth = userContext.authenticateUser(email, password, name, 'signup');
        setCredentials({name:'', email:'', password:''})

    }
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
            <CostumButton size='big' color='blue' clicked={handleButtonClick}>יאללה</CostumButton>
        </div>
    )
}

export default SignUp;