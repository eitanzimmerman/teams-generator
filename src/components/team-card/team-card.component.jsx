import React from 'react';
import './team-card.styles.scss';


const TeamCard = ({team, cardSize}) => { 
    const reducerFunc = (acc, item) => acc + item.grade;
    const mean = team.reduce(reducerFunc, 0)/team.length
    return (
        <div className='team-card' style={{minHeight : `${cardSize}rem`}}>
            <div className='team-card-header'>
                <span className='card-text'>שם</span>
                <span className='card-text'>דירוג</span>
            </div>
            <ul className='team-card-list'>
                {
                team.map((player, index) => {
                return(
                <li key={index} className='card-list-item'>
                    <span className='list-item-detail'>{player.name}</span>
                    <span className='list-item-detail'>{player.grade}</span>
                </li>
                )
            }) 
                }
            </ul>
            <div className='team-card-footer'>
                <h3 className='footer-text'><span className='mean-text'>{mean.toFixed(1)}</span> : ממוצע הקבוצה</h3>
            </div>
        </div>
    )
}

export default TeamCard;