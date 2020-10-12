import React from 'react';
import {ReactComponent as DownIcon} from '../../assets/arrow-down2.svg';
import {Link} from 'react-router-dom';
import CostumButton from '../../components/costum-button/costum-button.component'
import './homepage.styles.scss';

const HomePage = ( ) => (
    <div className='homepage'>
        <h1 className='homepage-title'> ? איך מתחילים </h1>
        <div className='homepage-workflow'>

            <span className='workflow-item'>ממלאים את הפרטים של כל החברים</span>
            <div className='workflow-arrow'><DownIcon/></div>

            <span className='workflow-item'>מדרגים</span>
            <div className='workflow-arrow'><DownIcon/></div>

            <span className='workflow-item'>בוחרים כמה קבוצות שתרצו</span>
            <div className='workflow-arrow'><DownIcon/></div>
        </div>
        <Link to='/play'><CostumButton>יאללה בואו נתחיל</CostumButton></Link>
    </div>
)

export default HomePage;