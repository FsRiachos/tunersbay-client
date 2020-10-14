import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import About from '../pages/about/About';
import NavbarComponent from "../components/global/Navbar";
import PrivateRoute from "../components/global/PrivateRoute";
import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import BuildListPage from '../pages/builds/List';
import BuildDetailsPage from '../pages/builds/Details';


export default class RouterComponent extends React.Component {
    render() {
        return (
            <Router>
                <NavbarComponent />
                <Switch>
                    <Route exact path="/register" component={RegisterPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/about" component={About} />
                    <PrivateRoute roles={[1, 2]} exact path="/build/list" component={BuildListPage} />
                    <PrivateRoute roles={[1, 2]} exact path="/build/details/:id" component={BuildDetailsPage} />
                    <PrivateRoute roles={[1, 2]} exact path="/build/favorites" component={BuildListPage} />
                    <Route path="*" component={Home} />
                </Switch>
            </Router>
        );
    }
}
