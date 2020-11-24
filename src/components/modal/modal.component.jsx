import React from 'react';
import './modal.styles.scss';


import Backdrop from '../backdrop/backdrop.component';

const Modal = ({ show, clicked, children }) => {
    return(

        show ? (<div>
            <Backdrop show={show} clicked={clicked}/>
            <div className='Modal'>
                {children}
            </div>
        </div>)
    : null
         
)};

export default Modal;