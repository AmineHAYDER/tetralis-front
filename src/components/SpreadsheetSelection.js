import React, {useState} from 'react';
import {Button, Col, Dropdown, Row, Alert} from "react-bootstrap";
import {Dots} from 'react-activity';
import {useApplication} from '../context/application'


function SpreadsheetSelection() {
    const [{files}, api] = useApplication()
    const [sheet, setSheet] = useState(null)
    const [isDeduplicating, setIsDeduplicating] = useState(false)
    const [deduplicationSuccess, setDeduplicationSuccess] = useState(null)
    return (
        <>
            <Col>
                <h3>
                    Choose the google sheet to deduplicate
                </h3>
            </Col>
            <Col className={"sheets-container"}>
                {
                    isDeduplicating ? <h4>Data is processing <Dots/></h4>
                        : (deduplicationSuccess === null) ? <Row>
                            <Col>
                                <DropDown setSheet={setSheet} files={files} sheet={sheet}/>
                            </Col>
                            <Col>
                                {sheet ? <DeduplicationButton setIsDeduplicating={setIsDeduplicating}
                                                              setDeduplicationSuccess={setDeduplicationSuccess}
                                                              api={api}
                                                              sheet={sheet}/> : null}
                            </Col>
                        </Row> : <SuccessAlert deduplicationSuccess={deduplicationSuccess}/>
                }

            </Col>
        </>);
}

function DropDown({files, setSheet, sheet}) {

    return <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            {!sheet?.name ? "Sheets" : sheet.name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {files.length ? files.map((file, i) => {
                return <Dropdown.Item key={i} onSelect={() => setSheet(file)}>{file.name}</Dropdown.Item>
            }) : null}
        </Dropdown.Menu>
    </Dropdown>
}

function SuccessAlert({deduplicationSuccess}) {

    return <Row style={{margin:30}}>
        {deduplicationSuccess ?
            <Alert variant={"success"}>
                Deduplication Done, go check your drive !
            </Alert> :
            <Alert variant={"danger"}>
                Deduplication Failed :
                check the file entered or reload page to refresh token
            </Alert>}
    </Row>
}

function DeduplicationButton({setIsDeduplicating, api, sheet, setDeduplicationSuccess}) {

    return <Row>
        <Button onClick={() => {
            setIsDeduplicating(true)
            api.getSpreadsheet(sheet.id)
                .then(() => {
                    setIsDeduplicating(false)
                    setDeduplicationSuccess(true)
                })
                .catch(() => {
                    setIsDeduplicating(false)
                    setDeduplicationSuccess(false)
                })
        }} variant={"warning"}>
            Deduplicate
        </Button>
    </Row>
}

export default SpreadsheetSelection;
