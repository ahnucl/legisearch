import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import Header from '../../components/Header';
import SenatorCard from '../../components/SenatorCard';

interface IBGEUFResponse {
    sigla: string;
    nome: string;
}

interface SenadorListaResponse {
    ListaParlamentarEmExercicio: {
        Parlamentares: {
            Parlamentar: [
                {
                    IdentificacaoParlamentar: {
                        CodigoParlamentar: number;
                        NomeParlamentar: string;
                        NomeCompletoParlamentar: string;
                        UrlFotoParlamentar: string;
                        UrlPaginaParlamentar: string;
                        EmailParlamentar: string;
                        SiglaPartidoParlamentar: string;
                        UfParlamentar: string;
                        MembroMesa: string;
                        MembroLideranca: string;
                    }
                }
            ]
        }
    }
}
interface UF {
    initials: string;
    name: string;
}

interface Senator {
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

const Home = () => {
    const [ ufs, setUfs ] = useState<UF[]>([]);
    const [ filteredUf, setFilteredUf ] = useState('0');
    const [ filteredParty, setFilteredParty ] = useState('')
    const [ senators, setSenators ] = useState<Senator[]>([]);

    /**
     * Carregando UFs da API do IBGE
     */
    useEffect( () => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then( response => {
            const ufs = response.data.map( registro => ({ initials: registro.sigla , name: registro.nome }));
            setUfs(ufs);
        });
    }, []);

    /**
     * Buscando lista de senadores em exercício
     */
    useEffect(()=>{
        axios.get<SenadorListaResponse>('https://legis.senado.leg.br/dadosabertos/senador/lista/atual.json').then( response => {
            const senators = response.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar.map(
                ( parlamentar ) => ({
                    name: parlamentar.IdentificacaoParlamentar.NomeParlamentar,
                    completeName: parlamentar.IdentificacaoParlamentar.NomeCompletoParlamentar,
                    party: parlamentar.IdentificacaoParlamentar.SiglaPartidoParlamentar,
                    img: 'https'+parlamentar.IdentificacaoParlamentar.UrlFotoParlamentar.slice(4), // Solução ruim? Melhorar!
                    boardMember: parlamentar.IdentificacaoParlamentar.MembroMesa,
                    leadershipMember: parlamentar.IdentificacaoParlamentar.MembroLideranca,
                    senatorNumber: parlamentar.IdentificacaoParlamentar.CodigoParlamentar,
                    state: parlamentar.IdentificacaoParlamentar.UfParlamentar,
                    email: parlamentar.IdentificacaoParlamentar.EmailParlamentar,
                    officialSite: parlamentar.IdentificacaoParlamentar.UrlPaginaParlamentar
                })
            );

            setSenators(senators);
        })
    }, []);

    function handleUfChange(event: ChangeEvent<HTMLSelectElement>) {
        const ufToFilter = event.target.value;
        setFilteredUf(ufToFilter);
    }
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const filteredText = event.target.value;
        setFilteredParty(filteredText);
    }

    function renderFilteredSenators() {
   
        return senators
            .filter(senator => filteredUf === '0' || senator.state === filteredUf )
            .filter(senator => filteredParty === '' || (new RegExp(filteredParty, 'i')).test(senator.party))
            
            // Adicionar filtros acima
            .map( (senator) => (  
            // <Link to={`/detail?${senator.senatorNumber}`} // < consultar novamente na página
            <Link to={{                                 // < dados passados como estado
                pathname: '/detail',
                state: senator    
                }} 
                  key={senator.senatorNumber}
            >
                <SenatorCard     
                    senatorName={senator.name}
                    senatorParty={senator.party}
                    img={senator.img}
                    boardMember={senator.boardMember}
                    leadershipMember={senator.leadershipMember}
                    senatorStateInitials={senator.state}
                />
            </Link>
        ));
    }

    return (
        <>
            <Header />
            <div id="home-list">
                <div className="filter-group">
                    <div className="form-group">
                        <select name="uf"
                                id="uf"
                                className="form-control"
                                value={filteredUf}
                                onChange={handleUfChange}>
                            <option value="0">Selecione um Estado</option>
                            {ufs.map( uf =>
                                (<option key={uf.initials} value={uf.initials}> {`${uf.name} - ${uf.initials}`} </option>)
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <input  name="partido"
                                id="partido"
                                className="form-control"
                                placeholder="Selecione um Partido"
                                onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="d-flex flex-wrap justify-content-center">
                    {renderFilteredSenators()}
                </div>
            
            </div>
        </>
    );
};

export default Home;