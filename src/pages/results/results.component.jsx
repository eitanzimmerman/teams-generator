
import React,{useContext} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './results.styles.scss';

import useCopyToClipBoard from '../../hooks/useCopyToClipboard';
import { handleArrayCopy } from '../../utils/handle-array-copy';
import UserContext from '../../context/user-context';

import TeamCard from '../../components/team-card/team-card.component';
import { ReactComponent as CopyIcon} from '../../assets/content_copy.svg';
import { ReactComponent as SaveIcon} from '../../assets/floppy-disk.svg';
import { ReactComponent as ReturnIcon} from '../../assets/undo.svg';

import CostumButton from '../../components/costum-button/costum-button.component';
import { useState } from 'react';


const Results = ({location, history}) => {

    const {teams, title, players} = location.state
    const [isCopied, handleCopy] = useCopyToClipBoard(3000);
    const [isSaved, setSaved] = useState(false);

    const userContext = useContext(UserContext);

    const handleSaveTeams = () => {
        if (!userContext.currentUser) {
            alert("רק משתמשים רשומים יכולים לשמור קבוצה")
            return
        }
        const url = `http://localhost:5000/api/team`;
        const token = userContext.currentUser.token
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const data = {
            title,
            players
        }
        axios.post(url,data,config)
        .then(response => {
            console.log(response)
            if (response.status === 201){
                setSaved(true);
                setTimeout(() => {
                    setSaved(false)
                }, 3000)
            }
        })
        .catch(err => console.log(err, 'this came from saving team to user'))
    }


    return (
        <div className='results-page'>
            <div className='results-page-header'>
                <h1 className='results-title'>חלוקת הקבוצות</h1>
                <h2>{ title }</h2>
            </div>
            <div className='results-page-teams'>
               {
                   teams.map((team, index) => <TeamCard key={index} team={team}/>)
               }
            </div>
            <div className='results-page-footer'>
                <div className='icons-container'>
                    <button  style ={{'backgroundColor' : isCopied ? '#e0fbfc' : ''}} className='icon-container' onClick={()=> handleCopy(handleArrayCopy(teams))}>
                    {isCopied ? <div className='copy-success'><span className='copy-success-text'>Copied</span></div> : <CopyIcon className='result-icon'/>}
                    </button>
                    <button style ={{'backgroundColor' : isSaved ? '#e0fbfc' : ''}} className='icon-container'>
                        <SaveIcon className='result-icon' onClick={handleSaveTeams}/>
                    </button>
                    <button className='icon-container' onClick={() => history.goBack()}>
                        <ReturnIcon className='result-icon'/>
                    </button>
                </div>
                <CostumButton size='big' >תן עוד ערבוב</CostumButton>
            </div>
        </div>
    )
}

export default withRouter(Results);