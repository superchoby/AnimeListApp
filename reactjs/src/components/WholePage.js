import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import List from './AnimeList';
import Login from './LoginPage';
import SignupPage from './Signup';

/**
 * @file WholePage is a React Component that is the highest
 * level component who's child components change depending
 * on the current Route
 * @extends React.Component
 */

class WholePage extends React.Component {
    render() {
        return(
            <BrowserRouter>
                <Route exact path='/' component={Login} />
                <Route path='/sign-up' component={SignupPage} />
                <Route path='/view-list' component={List} />
            </BrowserRouter>
        )
    }
}

export default WholePage;
