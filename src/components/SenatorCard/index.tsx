import React from 'react';
import { FiUsers, FiStar } from 'react-icons/fi';

import './styles.css';

interface Props {
    senatorName: string;
    senatorParty: string;
    img: string;
    displayTextBox?:boolean;
    boardMember: string;
    leadershipMember: string;
    senatorState: string;
}

const SenatorCard: React.FC<Props> = ({senatorName, senatorParty, img, displayTextBox, boardMember, leadershipMember, senatorState}) => {
    return (
        <div className="card" >    
            <div className="card-body">
                <h3 className="card-title">{senatorName}</h3>
                <p className="card-text">{`${senatorParty} - ${senatorState}`}</p>
                <div className="membership">
                    <span> 
                        {boardMember === 'Sim' ? <FiUsers/> : '' }
                    </span>
                    <span> 
                    {leadershipMember === 'Sim' ?  <FiStar/> : '' }   
                    </span>
                </div>
            </div>

            <img src={img} className="card-img-top" alt="lasier"/>
            { displayTextBox && (
                    <div className="textBox">
                        <div >Clique para visualizar</div>
                    </div>
                )
            }
        </div>
    );
}

export default SenatorCard;