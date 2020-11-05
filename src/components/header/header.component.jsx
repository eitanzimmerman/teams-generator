import React, {useState} from 'react';
import './header.styles.scss';

import SignUp from '../sign-up/sign-up.component';
import Modal from '../modal/modal.component';
import LogIn from '../log-in/log-in.component';

const Header = () => {
    const [isSignUpShowing, toggleSignUp] = useState(false)
    const [isLogInShowing, toggleLogIn] = useState(false)

    return(
    <div className='test'>
        <div className='header'>
            <span>שלום אורח</span>
            <div className='header-sign'>
                <span className='header-sign-link' onClick={() => toggleLogIn(!isLogInShowing)}>התחבר</span>
                <span className='header-sign-link' onClick={()=>toggleSignUp(!isSignUpShowing)}>הרשם</span>
            </div>
        </div>
        <Modal show={isSignUpShowing} clicked={()=>toggleSignUp(!isSignUpShowing)}><SignUp/></Modal>
        <Modal show={isLogInShowing} clicked={()=>toggleLogIn(!isLogInShowing)}><LogIn/></Modal>
    </div>
)}

export default Header;