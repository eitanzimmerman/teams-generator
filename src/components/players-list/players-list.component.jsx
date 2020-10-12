import React from 'react';
import './players-list.styles.scss';

const PlayersList = ({players, removeItemFromList}) => {
    const opacityObj = {0: 0.7, 1: 0.5}

    return (
        <div className='list-container'>
            <div className='players-list-header'>
                <span className='list-title'>שם</span>
                <span className='list-title'>דירוג</span>
            </div>
            <ul className='players-list-items'>
                {
                    players.map((player,index) =>{
                        const modulo = index%2;
                        const opacity = opacityObj[modulo]
                    return (
                    <li className='players-list-item' onClick={() => removeItemFromList(player.name, player.grade)} style={{opacity : opacity}}>
                        <span className='player-list-item-info'>{player.name}</span>
                        <span className='player-list-item-info'>{player.grade}</span>
                    </li>
                    )
                })
                }
            </ul>
        </div>
    )
}

export default PlayersList;