import React, {useState, useContext} from 'react';
import Swal from 'sweetalert2';

import './sign-up.styles.scss';



import UserContext from '../../context/user-context';
import FormInput from '../../components/form-input/form-input.component';
import CostumButton from '../costum-button/costum-button.component';
import WithSpinner from '../../hoc/with-spinner/with-spinner.component';

const CostumButtonWithSpinner = WithSpinner(CostumButton);


const SignUp = ({toggleModal}) => {
    const [userCredentials, setCredentials] = useState({name:'', email:'', password:''})
    const [isLoading, setLoadingState] = useState(false);
    const [showError, setShowErrorState ] = useState(false);


    const userContext = useContext(UserContext);

    const onChangeHandler = (event) => {
        const {name, value} = event.target
        setCredentials({...userCredentials, [name]:value})
    }

    const {name, email, password} = userCredentials;

    const handleButtonClick = async () => {
        // simple validtaion -- need to be further developed
        if ( password.length < 7 || !email.includes('@')){
            Swal.fire({
                title: "בעיה בהזנת הפרטים",
                icon: "warning"
            })
            return
        }
        
        const isAuth = await userContext.authenticateUser(email, password, name, 'signup');
        if (!isAuth) {
            setLoadingState(false)
            setShowErrorState(true)
        } else {
            setLoadingState(false)
            toggleModal(false)
        }
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
            {
                showError ? (
                    <h3>משהו קרה. נסה שוב</h3>
                ) : null
            }
            <CostumButtonWithSpinner isLoading={isLoading} size='big' color='blue' clicked={handleButtonClick}>יאללה</CostumButtonWithSpinner>
        </div>
    )
}

export default SignUp;