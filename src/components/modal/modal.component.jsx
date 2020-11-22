import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './modal.styles.scss';


import Backdrop from '../backdrop/backdrop.component';

const Modal = ({ ref,show, clicked, children }) => {
    const nodeRef = React.useRef()
    return(
            <div>
                <Backdrop show={show} clicked={clicked}/>
                <CSSTransition
                ref={nodeRef}
                in={show}
                timeout={100}
                classNames='modal-container'
                unmountOnExit>
                <div className='Modal' ref={nodeRef}>
                    {children}
                </div>
                </CSSTransition>
            </div>
        
)};

export default Modal;