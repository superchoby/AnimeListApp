import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import List from './AnimeList';
import Login from './LoginPage';
import SignupPage from './Signup';

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
