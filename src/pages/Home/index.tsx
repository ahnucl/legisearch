import React from 'react';

import lasier from '../../assets/senador5533.jpg';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import Header from '../../components/Header';
import SenatorCard from '../../components/SenatorCard'

const Home = () => {
    return (
        <>
            <Header />
            <div id="home-list">
                <div className="filter-group">
                    <div className="form-group">
                        <select name="uf"
                                id="uf"
                                className="form-control">
                            <option value="0">Selecione um Estado</option>
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

                    <SenatorCard 
                        senatorName="Lasier Martins"
                        senatorParty="PODEMOS - RS"
                        img={lasier}
                    />                    
                          
                </div>
            
            </div>
        </>
    );
};

export default Home;