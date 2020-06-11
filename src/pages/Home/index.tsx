import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import Header from '../../components/Header';
import SenatorCard from '../../components/SenatorCard'

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
    name: string;
    party: string;
    img: string;
    boardMember: string;
    leadershipMember: string;
}

const Home = () => {
    const [ ufs, setUfs ] = useState<UF[]>([]);
    const [ filteredUf, setFilteredUf ] = useState('0');
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
        axios.get<SenadorListaResponse>('http://legis.senado.leg.br/dadosabertos/senador/lista/atual.json').then( response => {
            const senators = response.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar.map(
                ( parlamentar ) => ({
                    name: parlamentar.IdentificacaoParlamentar.NomeParlamentar,
                    party: parlamentar.IdentificacaoParlamentar.SiglaPartidoParlamentar,
                    img: parlamentar.IdentificacaoParlamentar.UrlFotoParlamentar,
                    boardMember: parlamentar.IdentificacaoParlamentar.MembroMesa,
                    leadershipMember: parlamentar.IdentificacaoParlamentar.MembroLideranca
                })
            );

            setSenators(senators);
        })
    }, []);

    function handleUfChange(event: ChangeEvent<HTMLSelectElement>) {
        const ufToFilter = event.target.value;
        setFilteredUf(ufToFilter);
    }
    
    /**
     * TODO: sempre que mudar o filtro de UF, atualizar um array que tem os senadores filtrados e renderizar esse array apenas
     */


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
                        <select name="partido"
                                id="partido"
                                className="form-control">
                            <option value="0">Selecione um Partido</option>
                            
                        </select>
                    </div>
                </div>

                <div className="d-flex flex-wrap justify-content-between">
                    {senators.map( (senator) => (
                        <SenatorCard 
                            senatorName={senator.name}
                            senatorParty={senator.party}
                            img={senator.img}
                            boardMember={senator.boardMember}
                            leadershipMember={senator.leadershipMember}
                        />                    
                    ))}
                          
                </div>
            
            </div>
        </>
    );
};

export default Home;