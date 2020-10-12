import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './modal.styles.scss';


import Backdrop from '../backdrop/backdrop.component';

const Modal = ({ show, clicked, children }) => (
            <div>
                <Backdrop show={show} clicked={clicked}/>
                <CSSTransition
                in={show}
                timeout={100}
                classNames='modal-container'
                unmountOnExit>
                <div className='Modal'>
                    {children}
                </div>
                </CSSTransition>
            </div>
        
);

export default Modal;