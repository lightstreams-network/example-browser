import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import {
    ROUTE_HOME,
    ROUTE_LOGIN,
    ROUTE_REGISTER,
    ROUTE_DASHBOARD
} from './constants';

// import {
//     firebaseApp,
//     FirebaseContext
// } from './components/firebase';

import store from './store';
import Home from './routes/home';
import Login from './routes/login';
import Register from './routes/register';
import Dashboard from './routes/dashboard';
import NoMatch from './routes/404';
import reset from './css/reset';
import styles from './css/styles';
import Firebase from './components/firebase';

const GlobalStyle = createGlobalStyle`${reset}${styles}`;

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Firebase>
                <Switch>
                    <Route exact path={ROUTE_HOME} component={Home} />
                    <Route path={ROUTE_LOGIN} component={Login} />
                    <Route path={ROUTE_REGISTER} component={Register} />
                    <Route path={ROUTE_DASHBOARD} component={Dashboard} />
                    <Route component={NoMatch} />
                </Switch>
            </Firebase>
        </Provider>
        <GlobalStyle />
    </BrowserRouter>,
    document.getElementById('root')
);
