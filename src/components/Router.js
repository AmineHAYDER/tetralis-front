import React from 'react';
import Main from "./Main";
import TokenHandler from "../lib/TokenHandler";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {NotificationContainer} from 'react-notifications';

function router() {

    return (
        <Router>
                <NotificationContainer/>
                <Switch>
                    <Route path="/" children={<Main/>}/>
                </Switch>
                <Switch>
                    <Route path="/token/:token?" children={<TokenHandler/>}/>
                </Switch>
        </Router>
    );
}

export default router;
