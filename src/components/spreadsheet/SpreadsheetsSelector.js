import React from 'react';
import {Dropdown, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {getSpreadsheetKeys, getSpreadsheetTables} from "../../redux/Actions";


function SpreadsheetsSelector({files, setSheet, sheet}) {
    const dispatch = useDispatch()

    return <Row style={{margin:10}}>
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {!sheet?.name ? "Sheets" : sheet.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {files.length ? files.map((file, i) => {
                    return <Dropdown.Item key={i} onSelect={() => {
                        setSheet(file)
                        dispatch(getSpreadsheetTables())
                        dispatch(getSpreadsheetKeys())
                    }}>{file.name}</Dropdown.Item>
                }) : null}
            </Dropdown.Menu>
        </Dropdown>
    </Row>
}


export default SpreadsheetsSelector;
