import React, {useState} from 'react';
import './main.styles.scss';

import AddPlayer from '../../components/add-player/add-player.component';
import PlayersList from '../../components/players-list/players-list.component';

const MainPage = () => {
    const [players , setPlayers] = useState([])
    

    const addPlayerToList = (name, grade) => {
        setPlayers([...players, {name, grade}])
    }

    const removeItemFromList = (name, grade) => {
       const newPlayers = players.filter(player => player.name !== name || player.grade !== grade)
        setPlayers(newPlayers)
    }

    return (
        <div className='main-page'>
            <div className='box b-1'>tems</div>
            <div className='b-2'><PlayersList removeItemFromList={removeItemFromList} players={players}/></div>
            <div className='box b-3'>picknumberoftems</div>
            <div className='b-4'><AddPlayer addPlayerToList={addPlayerToList}/></div>
        </div>
    )
}

export default MainPage;