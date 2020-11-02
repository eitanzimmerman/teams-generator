import React from 'react';
import './costum-select.styles.scss';

const CostumSelect = ({ value, onChangeHandler, options}) => {
    const optionsArr = [...Array(options)]
    return(
    <select  value={value} className='costum-select'  onChange={onChangeHandler}>
      {
          
          optionsArr.map((item,index) => <option key={index} className='costum-select-option'>{index+1}</option>)
      }
    </select>

)}

export default CostumSelect;