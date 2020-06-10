import React from 'react';

import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Detail from './pages/Detail';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Detail} path="/detaile" />

        </BrowserRouter>
    )
}

export default Routes;