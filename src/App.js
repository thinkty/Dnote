/**
 * This component contains all the routes for different pages
 * It is using the react-router-dom package for routing and redirection
 */

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';



function App() {

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LoginPage} />
            </Switch>
        </Router>
    );

}

export default App;
