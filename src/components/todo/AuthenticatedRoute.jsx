import React, {Component} from 'react'
import AuthentificationService from './AuthentificationService.js';
import { Route, Redirect } from 'react-router-dom';

class AuthenticatedRoute extends Component {
    render() {
        if (AuthentificationService.isUserLoggedIn()) {
            return <Route {...this.props}/>
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default AuthenticatedRoute