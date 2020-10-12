import React, {useState} from 'react';
import './header.styles.scss';

import SignUp from '../sign-up/sign-up.component';
import Modal from '../modal/modal.component';

const Header = () => {
    const [isSignUpShowing, toggleSignUp] = useState(false)

    return(
        <div>
    <div className='header'>
        <span>שלום אורח</span>
        <div className='header-sign'>
            <span className='header-sign-link'>התחבר</span>
            <span className='header-sign-link' onClick={()=>toggleSignUp(!isSignUpShowing)}>הרשם</span>
        </div>
        
    </div>
    <Modal show={isSignUpShowing} clicked={()=>!toggleSignUp(!isSignUpShowing)}><SignUp/></Modal>
    </div>
)}

export default Header;