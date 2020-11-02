
import React, {useState, useEffect} from 'react';
import './results.styles.scss';

import useCopyToClipBoard from '../../hooks/useCopyToClipboard';
import { handleArrayCopy } from '../../utils/handle-array-copy';

import TeamCard from '../../components/team-card/team-card.component';
import { ReactComponent as CopyIcon} from '../../assets/content_copy.svg';


const Results = ({location}) => {
    const {teams, title, players} = location.state
    const [isCopied, handleCopy] = useCopyToClipBoard(3000);
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
            <button  style ={{'backgroundColor' : isCopied ? '#e0fbfc' : ''}} className='copy-container' onClick={()=> handleCopy(handleArrayCopy(teams))}>
               {isCopied ? <div className='copy-success'><span className='copy-success-text'>Copied</span></div> : <CopyIcon className='copy-icon'/>}
            </button>
        </div>
    )
}

export default Results;