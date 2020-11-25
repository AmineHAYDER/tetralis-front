import React, {useState} from 'react';
import {Button, Col, Dropdown, Row, Alert} from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import {Dots} from 'react-activity';
import SuccessAlert from "./SuccessAlert";
import DeduplicationButton from "./DeduplicationButton";
import SpreadsheetsSelector from "./SpreadsheetsSelector"
import KeysSection from "./KeysSection";
import SheetsSection from "./SheetsSection";


function SpreadsheetSelection() {
    const spreadsheets = useSelector(state => state.googleStates.spreadsheets)
    const [sheet, setSheet] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [deduplicationSuccess, setDeduplicationSuccess] = useState(null)
    const [isLoadingSheets, setIsLoadingSheets] = useState(false)
    const [isLoadingKeys, setIsLoadingKeys] = useState(false)
    const [tables, setTables] = useState([])
    const [keys, setKeys] = useState([])
    return (
        <>
            <Col>
                <h3>
                    Choose the google sheet to deduplicate
                </h3>
            </Col>
            <Col className={"sheets-container"}>
                {
                    isLoading ?
                        <h4>Data is processing <Dots/></h4>
                        : (deduplicationSuccess === null) ?
                        <Row>
                            <Col>
                                <SpreadsheetsSelector
                                    setSheet={setSheet}
                                    files={spreadsheets}
                                    sheet={sheet}/>
                                <hr/>
                                {sheet && !isLoadingSheets ? <SheetsSection setIsLoading={setIsLoadingSheets}
                                                                            tables={tables}
                                                                            setTables={setTables}
                                                                            sheetId={sheet.id}/>
                                    : isLoadingSheets ?
                                        <h4>Loading Tables <Dots/></h4> : null}
                                <hr/>
                                {sheet && !isLoadingKeys ? <KeysSection setIsLoading={setIsLoadingKeys}
                                                                        tables={tables}
                                                                        keys={keys}
                                                                        setKeys={setKeys}
                                                                        sheetId={sheet.id}/>
                                    : isLoadingKeys ?
                                        <h4>Loading Keys <Dots/></h4> : null}
                                <hr/>
                                {spreadsheets && keys.length ?
                                    <DeduplicationButton
                                        setIsLoading={setIsLoading}
                                        setDeduplicationSuccess={setDeduplicationSuccess}
                                        tables={tables}
                                        keys={keys}
                                        sheetId={sheet.id}/> : null}
                            </Col>
                        </Row> :
                        <SuccessAlert deduplicationSuccess={deduplicationSuccess}/>
                }

            </Col>
        </>);
}


export default SpreadsheetSelection;
