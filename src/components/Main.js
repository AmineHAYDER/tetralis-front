import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getSpreadsheets} from "../redux/Actions";
import {Row, Container} from 'react-bootstrap'
import ConnectApi from "./ConnectApi";
import SpreadsheetSelection from "./spreadsheet/SpreadsheetSelection";
import {Dots} from 'react-activity';
import '../css/Main.css'


function Main() {
    const isLogged = useSelector(state => state.googleStates.isLogged)
    const spreadsheets = useSelector(state => state.googleStates.spreadsheets)
    const dispatch = useDispatch()


    useEffect(() => {
        const token = localStorage.getItem('oath2_token')
        if (token) {
            dispatch(getSpreadsheets(token))
        }
    }, [])

    return (
        <Container className="main-container">
            <Row lg={2} xs={1}>
                {!isLogged ? <ConnectApi/> : null}
            </Row>
            <Row lg={2} xs={1} className={{padding: 50}}>
                {isLogged && !spreadsheets ? <Dots size={20}/> : null}
            </Row>
            <Row lg={2} xs={1}>
                {spreadsheets ? <SpreadsheetSelection/> : null}
            </Row>
        </Container>
    );
}

export default Main;
