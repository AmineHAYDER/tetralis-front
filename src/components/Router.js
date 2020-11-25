import React,{useEffect} from 'react';
import Main from "./Main";
import TokenHandler from "../lib/TokenHandler";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {NotificationContainer} from 'react-notifications';
import {useDispatch} from 'react-redux'
import {loginGoogle} from "../redux/Actions";


function Routes() {
    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.getItem('oath2_token')
        if (token) {
            dispatch(loginGoogle(token))
        }
    }, [])
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

export default Routes;
