import React from 'react';
import './form-input.styles.scss';

const FormInput = ({handleChange, label, ...otherProps}) => (
    <div className='input-group'>
        <input className='form-input'  dir='rtl' onChange={handleChange} {...otherProps}/>
        <label className='form-input-label'>{label}</label>
    </div>
)

export default FormInput;