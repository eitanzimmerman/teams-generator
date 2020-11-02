import React, {useState} from 'react';
import './add-player.styles.scss';
import CostumButton from '../costum-button/costum-button.component';
import CostumSelect from '../costum-select/costum-select.component';

const AddPlayer = ({addPlayerToList}) => {
    const [playerName, setPlayerName] = useState('');
    const [playerGrade, setPlayerGrade] = useState(1);

    const addPlayer = () => {
        addPlayerToList(playerName, playerGrade);
        setPlayerName('')
        setPlayerGrade(1)
    }
    return (
        <div className='add-player'>
            <div className='player-info'>
                <div className='player-info-name'>
                    <span className='player-info-name-title'>שם</span>
                    <input value={playerName} className='player-info-name-input' dir='rtl' onChange={(event) => setPlayerName(event.target.value)}/>
                </div>
                <div className='player-info-level'>
                    <span className='player-info-level-title'>דירוג</span>
                    <div className='player-info-level-select'><CostumSelect value={playerGrade} onChangeHandler={(event) => setPlayerGrade(Number(event.target.value))} options={10}/></div>
                </div>
            </div>
            <div className='player-button'>
                <CostumButton clicked={addPlayer}>הוסף</CostumButton>
            </div>
        </div>
    )
}

export default AddPlayer;