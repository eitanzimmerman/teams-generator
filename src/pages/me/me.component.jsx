import React, {useContext, useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './me.styles.scss';

import WithSpinner from '../../hoc/with-spinner/with-spinner.component';

import TeamCard from '../../components/team-card/team-card.component';
import CostumButton from '../../components/costum-button/costum-button.component';

import UserContext from '../../context/user-context';

const TeamCardWithSpinner = WithSpinner(TeamCard)

const MePage = ({history}) => {
    const userContext = useContext(UserContext);
    const [userTeams, setUserTeams] = useState([]);
    const [selectedTeam, selectTeam] = useState({players: []});
    const [currentLinkId, setCurrentLinkId] = useState('');
    const [isLoading, setLoadingState] = useState(false);

    useEffect(() => {
        setLoadingState(true);
        const url = `http://localhost:5000/api/team/me`
        const token = userContext.currentUser.token
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get(url,config)
        .then( response => {
            return response.data
        })
        .then(data => {
            if(data.user_teams.length > 0) {
                setUserTeams(data.user_teams)
                selectTeam(data.user_teams[0])
                setCurrentLinkId(data.user_teams[0]._id)
                setLoadingState(false)
            } else {
                setLoadingState(false)
            }
        })
        .catch(err => console.log(err))
    },[]);


    const handleTeamClick = (team) => {
        selectTeam(team);
        document.getElementById(currentLinkId).style.opacity = 0.5
        document.getElementById(team._id).style.opacity = 1;
        setCurrentLinkId(team._id)
    }

    const handleButtonClick = () => {
        sessionStorage.setItem('players', JSON.stringify(selectedTeam.players));
        sessionStorage.setItem('teamName',selectedTeam.title)
        history.push('/play')
    }

    return (
        <div className='me-page-container'>
            
            { 
                selectedTeam.players.length > 0 ? (
                    <TeamCardWithSpinner isLoading={isLoading} team={selectedTeam.players} cardSize={40}/>
                    ) : (
                        null
                    )
           
                }
            <div className='me-page-list-container' >
                <h2>הקבוצות שלי</h2>
                <ul className='teams-list'>
                    {
                        userTeams.length > 0 ? (
                            userTeams.map((team) => {
                                return <li  key={team._id} className='me-team-list-item' id={team._id} onClick={() => handleTeamClick(team) }><h3>{team.title}</h3></li>
                            })
                        ) : (
                            <h3 style={{alignSelf: "center", color:"white", marginTop:"5rem"}}> אין לך שום קבוצות שמורות</h3>
                        )
                    }
                </ul>
                <CostumButton size='big' clicked={handleButtonClick}>עשה כוחות</CostumButton>
            </div>
            
        </div>
    )
}

export default withRouter(MePage);