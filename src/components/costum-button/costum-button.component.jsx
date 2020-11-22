import React from 'react';
import './costum-button.styles.scss';

const CostumButton = (props) => (
    <button disabled={props.disabled ? props.disabled : false} className={`costum-button ${props.size} ${props.color} ${props.disabled ? 'disabled' : ''} `} type='submit' onClick={props.clicked}>
        {props.children}
    </button>
)

export default CostumButton;