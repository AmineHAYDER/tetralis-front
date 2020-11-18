import React, {useEffect, useState} from 'react';
import {Row, Container} from 'react-bootstrap'
import {useApplication} from '../context/application'
import ConnectApi from "./ConnectApi";
import SpreadsheetSelection from "./SpreadsheetSelection";
import {NotificationManager} from 'react-notifications';
import '../css/Main.css'
import {Dots} from 'react-activity';

function Main() {

    const [{files, code}, api] = useApplication()
    const [connected, setConnected] = useState(null)

    useEffect(() => {
        setConnected(localStorage.getItem('oath2_token'))
        if (connected) api
            .loadFiles(connected)
            .then(() => NotificationManager.success('Spreadsheets Loaded', 'success'))
            .catch(() => {
                NotificationManager.error('Spreadsheets can\'t be Loaded', 'Api error')
                localStorage.clear()
                setConnected(null)
            })
    }, [connected])
    return (
        <Container className="main-container">
            <Row lg={2} xs={1}>
                {!connected ? <ConnectApi/> : null}
            </Row>
            <Row lg={2} xs={1} className={{padding: 50}}>
                {connected && !files ? <Dots size={20}/> : null}
            </Row>
            <Row lg={2} xs={1}>
                {files ? <SpreadsheetSelection/> : null}
            </Row>
        </Container>
    );
}

export default Main;
