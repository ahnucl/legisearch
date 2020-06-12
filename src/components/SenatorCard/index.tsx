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
    senatorStateInitials: string;
}

const SenatorCard: React.FC<Props> = ({senatorName, senatorParty, img, displayTextBox, boardMember, leadershipMember, senatorStateInitials}) => {
    return (
        <div className="senatorCard card" >    
            <div className="card-body">
                <h3 className="card-title">{senatorName}</h3>
                <div className="">
                    <p className="card-text">{`${senatorParty} - ${senatorStateInitials}`}</p>
                    <div className="membership">
                        <span> 
                            {boardMember === 'Sim' ? <FiUsers/> : '' }
                        </span>
                        <span> 
                            {leadershipMember === 'Sim' ?  <FiStar/> : '' }   
                        </span>
                    </div>
                </div>
            </div>

            <img src={img} className="card-img-top" alt={senatorName}/>
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