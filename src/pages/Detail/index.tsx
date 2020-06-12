import React, { useEffect } from 'react';
import { FiArrowLeft, FiUsers, FiStar, FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './styles.css';

import Header from '../../components/Header';

interface Props {
    location:  {   
        state: {
            number: number;
            name: string;
            completeName: string;
            party: string;
            img: string;
            boardMember: string;
            leadershipMember: string;
            state: string;
            email: string;
            officialSite: string;
        }  
    }
}

const Detail: React.FC<Props> = (props) => {
    const { number, name, completeName, party, img, boardMember, leadershipMember, state, email, officialSite } = props.location.state;

    useEffect(() => {
        axios.get(`http://legis.senado.leg.br/dadosabertos/senador/${number}/comissoes.json`).then( response => {
            console.log(response);
        })
    }, [])

    return (
        <>
            <Header/>
            <div id="detail-page">
                <div className="voltar d-flex flex-row-reverse">
                    <Link to="/"><FiArrowLeft/> Voltar </Link>
                </div>
                <div className="panel d-flex flex-wrap justify-content-between">
                    <img src={img} alt={name}></img>
                    {/* <div className="gap"></div> */}
                    <div className="dados">
                        <h3 className="row">{`Senador ${name}`}</h3>

                        <div className="membership row ">
                            { boardMember === 'Sim' ? (
                                <div className="texto">
                                    <span><FiUsers/></span>Membro da Mesa
                                </div>
                                ) : '' 
                            }
                            { leadershipMember === 'Sim' ? (
                                <div className="texto">
                                    <span><FiStar/></span>Membro da Liderança
                                </div>
                                ) : ''
                            }
                        </div>

                        <div className="nomeSenador row">{completeName}</div>
                        <div className="texto row">{`${party} (${state})`}</div>
                        <div className="texto row">Acesse a <a href={officialSite} target="_blank" rel="noopener noreferrer"> Página Oficial</a></div>
                        <div className="texto row">{email}</div>
                        
                    </div>
                </div>
    {/** Estrutura inicial */}
    {/*            
                <div className="comissoes">
                    <ul className="list-group">
                        <li className="list-group-item">Comissões como Titular (4)</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Morbi leo risus</li>
                        <li className="list-group-item">Porta ac consectetur ac</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>

                    <ul className="list-group">
                        <li className="list-group-item">Comissoes como Suplente (3)</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Morbi leo risus</li>
                        <li className="list-group-item">Porta ac consectetur ac</li>
                    </ul>
                </div> 
     */}

                <div className="comissoes accordion" >
                    <ul className="list-group titular">
                        <li className="list-group-item mb-0" id="headingOne" data-toggle="collapse" data-target=".collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Comissões como Titular (4) <span><FiChevronDown/></span>
                        </li>

                        <li className="collapseOne list-group-item collapse show" aria-labelledby="headingOne" data-parent=".titular">
                            Anim pariatur cliche reprehenderit
                        </li>
                        <li className="collapseOne list-group-item collapse show" aria-labelledby="headingOne" data-parent=".titular">
                            Anim pariatur cliche reprehenderit
                        </li>
                        <li className="collapseOne list-group-item collapse show" aria-labelledby="headingOne" data-parent=".titular">
                            Anim pariatur cliche reprehenderit
                        </li>
                        <li className="collapseOne list-group-item collapse show" aria-labelledby="headingOne" data-parent=".titular">
                            Anim pariatur cliche reprehenderit
                        </li>
                    
                     </ul>

                    <ul className="list-group suplente">
                        <li className="list-group-item mb-0" id="headingOne" data-toggle="collapse" data-target=".collapseTwo" aria-expanded="true" aria-controls="collapseOne">
                            Comissões como Suplente (3) <span><FiChevronDown/></span>
                        </li>

                        <li className="collapseTwo list-group-item collapse show" aria-labelledby="headingOne" data-parent=".suplente">
                            Anim pariatur cliche reprehenderit
                        </li>
                        <li className="collapseTwo list-group-item collapse show" aria-labelledby="headingOne" data-parent=".suplente">
                            Anim pariatur cliche reprehenderit
                        </li>
                        <li className="collapseTwo list-group-item collapse show" aria-labelledby="headingOne" data-parent=".suplente">
                            Anim pariatur cliche reprehenderit
                        </li>
                        <li className="collapseTwo list-group-item collapse show" aria-labelledby="headingOne" data-parent=".suplente">
                            Anim pariatur cliche reprehenderit
                        </li>
                    
                     </ul>
                </div>

            </div>
        </>
    )
};

export default Detail;