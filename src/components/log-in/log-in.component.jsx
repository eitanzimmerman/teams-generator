import React, {useState, useContext} from 'react';
import './log-in.styles.scss';

import UserContext from '../../context/user-context';
import FormInput from '../../components/form-input/form-input.component';
import CostumButton from '../costum-button/costum-button.component';

const LogIn = () => {
    const [userCredentials, setCredentials] = useState({ email:'', password:''})

    const userContext = useContext(UserContext);


    const onChangeHandler = (event) => {
        const {name, value} = event.target
        setCredentials({...userCredentials, [name]:value})
    }
    
    const { email, password} = userCredentials;

    const handleButtonClick = () => {
        // simple validtaion -- need to be further developed
        if ( password.length < 7 || !email.includes('@')){
            alert("בעיה בהזנת הפרטים")
        }
        const isAuth = userContext.authenticateUser(email, password, '', 'login');
        setCredentials({email:'', password:''})
    }

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
            <CostumButton size='big' color='blue' clicked={handleButtonClick}>יאללה</CostumButton>
        </div>
    )
}

export default LogIn;