import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiUsers, FiStar, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './styles.css';

import Header from '../../components/Header';

interface Props {
    location:  {   
        state: {
            senatorNumber: number;
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

interface ComissaoResponse {
    MembroComissaoParlamentar: {
        Parlamentar: {
            MembroComissoes: {
                Comissao: [
                    {
                        IdentificacaoComissao: {
                            CodigoComissao: number;
                            SiglaComissao: string;
                            NomeComissao: string;
                            SiglaCasaComissao: string;
                            NomeCasaComissao: string;
                        },
                        DataInicio: string;
                        DescricaoParticipacao: string;
                        DataFim: string;
                    }
                ]
            }
        }
    }
}

interface Comissao {
        CodigoComissao: number;
        SiglaComissao: string;
        NomeComissao: string;
        SiglaCasaComissao: string;
        NomeCasaComissao: string;
        DataInicio: string;
        DescricaoParticipacao: string;
        DataFim: string;
    }
    
const Detail: React.FC<Props> = (props) => {
    const [ comissoesTitular, setComissoesTitular ] = useState<Comissao[]>([]);
    const [ comissoesSuplente, setComissoesSuplente ] = useState<Comissao[]>([]);
    const [ iconTitular, setIconTitular ] = useState(<FiChevronUp/>); // o TS não está acusando aqui, mas seria interessante descobrir que tipo é esse
    const [ iconSuplente, setIconSuplente ] = useState(<FiChevronUp/>);
        
    const { senatorNumber, name, completeName, party, img, boardMember, leadershipMember, state, email, officialSite } = props.location.state;

    useEffect(() => {
        axios.get<ComissaoResponse>(`https://legis.senado.leg.br/dadosabertos/senador/${senatorNumber}/comissoes.json`).then( response => {
            
            const comissoes = response.data.MembroComissaoParlamentar.Parlamentar.MembroComissoes.Comissao.map( comissao => ({
                CodigoComissao: comissao.IdentificacaoComissao.CodigoComissao,
                SiglaComissao: comissao.IdentificacaoComissao.SiglaComissao,
                NomeComissao: comissao.IdentificacaoComissao.NomeComissao,
                SiglaCasaComissao: comissao.IdentificacaoComissao.SiglaCasaComissao,
                NomeCasaComissao: comissao.IdentificacaoComissao.NomeCasaComissao,
                DataFim:comissao.DataFim, 
                DataInicio: comissao.DataInicio,
                DescricaoParticipacao: comissao.DescricaoParticipacao
            }));
            
            setComissoesTitular(comissoes.filter((comissao)=> comissao.DescricaoParticipacao === 'Titular'));
            setComissoesSuplente(comissoes.filter((comissao)=> comissao.DescricaoParticipacao === 'Suplente'));
        })
    }, [senatorNumber]);
    
    return (
        <>
            <Header/>
            <div id="detail-page">
                <div className="voltar d-flex flex-row-reverse">
                    <Link to="/"><FiArrowLeft/> Voltar </Link>
                </div>
                <div className="panel d-flex flex-wrap justify-content-between">
                    <div className="img-container">
                        <img src={img} alt={name}></img>
                    </div>
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
                        <div className="texto texto-email row">{email}</div>
                        
                    </div>
                </div>
  
                <div className="comissoes accordion" >
                    <ul className="list-group titular">
                        <li className="list-group-item mb-0 titulo"
                            id="headingOne" 
                            data-toggle="collapse" 
                            data-target=".collapseOne" 
                            aria-expanded="true" 
                            aria-controls="collapseOne"
                            onClick={() => { iconTitular.type.displayName === 'FiChevronUp' ? setIconTitular(<FiChevronDown/>) : setIconTitular(<FiChevronUp/>)}}
                        >   
                            Comissões como Titular ({comissoesTitular.length}) <span>{iconTitular}</span>
                        </li>
                        <div className="collapseOne collapse show">
                            {comissoesTitular.map( comissao => (
                                <li key={comissao.CodigoComissao} className="list-group-item " aria-labelledby="headingOne" data-parent=".titular">
                                    {`${comissao.NomeComissao} - ${comissao.SiglaComissao}`}
                                </li>
                            ))}                   
                        </div>
                    </ul>

                    <ul className="list-group suplente">
                        <li className="list-group-item mb-0 titulo" 
                            id="headingOne" 
                            data-toggle="collapse" 
                            data-target=".collapseTwo" 
                            aria-expanded="true" 
                            aria-controls="collapseOne"
                            onClick={()=>{ iconSuplente.type.displayName === 'FiChevronUp' ? setIconSuplente(<FiChevronDown/>) : setIconSuplente(<FiChevronUp/>)}}
                        >
                            Comissões como Suplente ({comissoesSuplente.length}) <span>{iconSuplente}</span>
                        </li>
                        <div className="collapseTwo collapse show">
                            {comissoesSuplente.map( comissao => (
                                <li key={comissao.CodigoComissao} className=" list-group-item " aria-labelledby="headingOne" data-parent=".suplente">
                                    {`${comissao.NomeComissao} - ${comissao.SiglaComissao}`}
                                </li>
                            ))}
                        </div>
                    </ul>
                </div>

            </div>
        </>
    )
};

export default Detail;