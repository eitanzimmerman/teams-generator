import React, {useContext, useEffect, useState, useRef} from 'react';
import axios from 'axios';
import './me.styles.scss';

import TeamCard from '../../components/team-card/team-card.component';

import UserContext from '../../context/user-context';

const MePage = () => {
    const userContext = useContext(UserContext);
    const [userTeams, setUserTeams] = useState([]);
    const [selectedTeam, selectTeam] = useState({players: []});
    const [currentLinkId, setCurrentLinkId] = useState('')

    useEffect(() => {
        const url = `http://localhost:5000/api/team/me`
        const token = userContext.currentUser.token
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get(url,config)
        .then( response => response.data)
        .then(data => {
            setUserTeams(data.user_teams)
            selectTeam(data.user_teams[0])
            setCurrentLinkId(data.user_teams[0]._id)
        })
        .catch(err => console.log(err))
    },[]);


    const handleTeamClick = (team) => {
        selectTeam(team);
        document.getElementById(currentLinkId).style.opacity = 0.5
        document.getElementById(team._id).style.opacity = 1;
        setCurrentLinkId(team._id)
    }

    return (
        <div className='me-page-container'>
            <TeamCard team={selectedTeam.players} cardSize={40}/>
            <div className='me-page-list-container' >
                <h2>הקבוצות שלי</h2>
                <ul className='teams-list'>
                    {
                        userTeams.map((team) => {
                            return <li  key={team._id} className='me-team-list-item' id={team._id} onClick={() => handleTeamClick(team) }><h3>{team.title}</h3></li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default MePage;