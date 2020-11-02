import React from 'react';
import './costum-button.styles.scss';

const CostumButton = (props) => (
    <button className={`costum-button ${props.size}`} type='submit' onClick={props.clicked}>
        {props.children}
    </button>
)

export default CostumButton;