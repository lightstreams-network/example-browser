import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import {
    ROUTE_HOME,
    ROUTE_LOGIN,
    ROUTE_REGISTER
} from './constants';

import store from './store';
import Home from './routes/home';
import Login from './routes/login';
import Register from './routes/register';
import reset from './constants/css/reset';

const GlobalStyle = createGlobalStyle`${reset}`;

ReactDOM.render(
    <BrowserRouter>
        <Fragment>
            <Provider store={store}>
                <Route exact path={ROUTE_HOME} component={Home} />
                <Route path={ROUTE_LOGIN} component={Login} />
                <Route path={ROUTE_REGISTER} component={Register} />
            </Provider>
            <GlobalStyle />
        </Fragment>
    </BrowserRouter>,
    document.getElementById('root')
);
