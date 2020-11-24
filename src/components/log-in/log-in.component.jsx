import React, {useState, useContext} from 'react';
import {withRouter} from 'react-router-dom';
import './log-in.styles.scss';

import Swal from 'sweetalert2';

import UserContext from '../../context/user-context';
import FormInput from '../../components/form-input/form-input.component';
import CostumButton from '../costum-button/costum-button.component';
import WithSpinner from '../../hoc/with-spinner/with-spinner.component';

const CostumButtonWithSpinner = WithSpinner(CostumButton);

const LogIn = ({toggleModal}) => {
    const [userCredentials, setCredentials] = useState({ email:'', password:''})
    const [isLoading, setLoadingState] = useState(false);
    const [showError, setShowErrorState ] = useState(false);
    const userContext = useContext(UserContext);


    const onChangeHandler = (event) => {
        const {name, value} = event.target
        setCredentials({...userCredentials, [name]:value})
    }
    
    const { email, password} = userCredentials;

    const handleButtonClick = async () => {
        // simple validtaion -- need to be further developed
        if ( password.length < 7 || !email.includes('@')){
            Swal.fire({
                title: "בעיה בהזנת הפרטים",
                icon: "warning"
            })
            return
        }
        setLoadingState(true)
        const isAuth = await userContext.authenticateUser(email, password, '', 'login');
        if (!isAuth) {
            setLoadingState(false)
            setCredentials({email:'', password:''});
            setShowErrorState(true);
        } else {
            setLoadingState(false);
            toggleModal(false)
        }

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
            {
                showError ? (
                    <h3>שם משתמש או סיסמא שגויים. נסה שוב</h3>
                ) : (
                    null
                )
            }
            <CostumButtonWithSpinner isLoading={isLoading} size='big' color='blue' clicked={handleButtonClick}>יאללה</CostumButtonWithSpinner>
        </div>
    )
}

export default withRouter(LogIn);