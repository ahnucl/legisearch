import React from 'react';

import './styles.css';

interface Props {
    senatorName: string;
    senatorParty: string;
    img: string;
    displayTextBox?:boolean;
}

const SenatorCard: React.FC<Props> = ({senatorName, senatorParty, img, displayTextBox}) => {
    return (
        <div className="card" >    
            <div className="card-body">
                <h3 className="card-title">{senatorName}</h3>
                <p className="card-text">{senatorParty}</p>
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