import React, {useState, useContext} from 'react';
import axios from 'axios';
import './header.styles.scss';

import SignUp from '../sign-up/sign-up.component';
import Modal from '../modal/modal.component';
import LogIn from '../log-in/log-in.component';
import UserContext from '../../context/user-context';

const Header = () => {
    const [isSignUpShowing, toggleSignUp] = useState(false)
    const [isLogInShowing, toggleLogIn] = useState(false)
    const userContext = useContext(UserContext);

    const handleLogOut = () => {
        const url  = `http://localhost:5000/api/user/logout`;
        const token = userContext.currentUser.token
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.post(url,null,config)
        .then(response => {
            if (response.status == 201) {
                userContext.logoutUser()
            }
        })
    }
    
    return(
    <div className='test'>
        <div className='header'>
                <span>{userContext.currentUser ? <p> שלום {userContext.currentUser.user.name} </p> : <p>שלום אורח</p>}</span>
            {
                userContext.currentUser ?
                <div className='header-sign'>
                    <span className='header-sign-link' onClick={userContext.logoutUser}>התנתק</span>
                </div>
                :
                <div className='header-sign'>
                    <span className='header-sign-link' onClick={() => toggleLogIn(!isLogInShowing)}>התחבר</span>
                    <span className='header-sign-link' onClick={()=>toggleSignUp(!isSignUpShowing)}>הרשם</span>
                </div>
            }
        </div>
        <Modal show={isSignUpShowing} clicked={()=>toggleSignUp(!isSignUpShowing)}><SignUp/></Modal>
        <Modal show={isLogInShowing} clicked={()=>toggleLogIn(!isLogInShowing)}><LogIn/></Modal>
    </div>
)}

export default Header;