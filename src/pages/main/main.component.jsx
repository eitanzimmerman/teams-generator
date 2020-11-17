import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import './main.styles.scss';

import AddPlayer from '../../components/add-player/add-player.component';
import PlayersList from '../../components/players-list/players-list.component';
import CostumSelect from '../../components/costum-select/costum-select.component';
import CostumButton from '../../components/costum-button/costum-button.component';



const MainPage = ({history}) => {

    const [players , setPlayers] = useState( sessionStorage.getItem('players') ? JSON.parse(sessionStorage.getItem('players')) : []);
    const [teamName, setTeamName] = useState(sessionStorage.getItem('teamName') || '');
    const [teamsNum, setTeamsNum] = useState(2);
    

    useEffect(() => {
        sessionStorage.setItem('players', JSON.stringify(players))
    }, [players]);

    useEffect(() => {
        sessionStorage.setItem('teamName',teamName)
    }, [teamName])

    const addPlayerToList = (name, grade) => {
        if (!validatePlayerInput(name)) {
            return
        }
        setPlayers([...players, {name, grade}])
    }

    const removeItemFromList = (name, grade) => {
       const newPlayers = players.filter(player => player.name !== name || player.grade !== grade)
        setPlayers(newPlayers)
    }

    const validatePlayerInput = (name) => {
        if (!name) {
            alert('אי אפשר להוסיף שחקן ללא שם')
            return false
        }
        for (const player of players) {
            if (player.name === name) {
                alert('שם של שחקן צריך להיות ייחודי')
                return false
            }
        }
        return true
    }

    const handleClicked = () => {
        const isDivisionValid = players.length % teamsNum === 0;
        if (!teamName || !isDivisionValid) {
            alert('מספר השחקנים צריך להתחלק במספר הקבוצות')
            return
        }
        const url = `http://localhost:5000/api/calc?divide=${teamsNum}`
        const data = {title : teamName, players: players}
        axios.post(url,data)
        .then(respone => {
            if (respone.status !== 201) {
                console.log('error with response')
                return
            }
            return respone.data
        })
        .then(data => {
            return history.push({
                pathname: '/play/results',
                state : {teams : data.teams, title: data.title, players : players}
            })
        })

    }

    return (
        <div className='main-page'>
        <div className='main-page-grid'>
            <div className='box b-1'>
                <div className='with-title-container'>
                    <span className='features-titles'>מס קבוצות</span>
                    <div className='teams-divide'>
                        <span className='teams-divide-text'>חלק אותנו ל</span>
                        <div className='teams-divide-select'><CostumSelect value={teamsNum} onChangeHandler={(event) =>setTeamsNum(event.target.value)} options={10}/></div>
                        <span className='teams-divide-text'>קבוצות</span>
                    </div>
                </div>
                <div className='with-title-container'>
                    <span className='features-titles'>שם הקבוצה</span>
                    <div className='team-name'>
                        <input value={teamName} onChange={(event)=>setTeamName(event.target.value)} className='team-name-input' dir='rtl'/>
                    </div>
                </div>
            </div>
            <div className='box b-2'>
                <span className='features-titles'>הקבוצה שלי</span>
                <PlayersList removeItemFromList={removeItemFromList} players={players}/>
                <span className='reset-team'  onClick={() => setPlayers([])}>אפס קבוצה</span>
            </div>
            <div className='box b-3'>
                <div className='generate-button'>
                    <CostumButton size='big' clicked={handleClicked}>אפשר להתחיל</CostumButton>
                </div>
            </div>
            <div className='box b-4'>
                <span className='features-titles'>הוספת שחקן</span>
                <AddPlayer addPlayerToList={addPlayerToList}/>
            </div>
        </div>
        </div>
    )
}

export default withRouter(MainPage);