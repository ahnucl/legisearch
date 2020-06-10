import React from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import Header from '../../components/Header';

const Home = () => {
    return (
        <>
            <Header />
            <div id="home-list">
                <div className="filter-group">
                    <div className="filter">
                        <select name="uf"
                                id="uf">
                            <option value="0">Selecione um Estado</option>
                        </select>
                    </div>
                    <div className="filter">
                        <select name="partido"
                                id="partido">
                            <option value="0">Selecione um Partido</option>
                        </select>
                    </div>
                </div>
            
                    <Card >
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <div className="row">
                        {/* <div className="col-sm-3"> */}
                            <div className="card" >
                            <img src="..." className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                            </div>

                            <div className="card" >
                            <img src="..." className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                            </div>

                            <div className="card" >
                            <img src="..." className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                            </div>

                            <div className="card" >
                            <img src="..." className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                            </div>
                            </div>
                <div className="row">
                            <div className="card" >
                            <img src="..." className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                            </div>
                </div>
                        {/* </div> */}
                    {/* </div>  */}

                <p>Primeira página</p>
            </div>
        </>
    );
};

export default Home;