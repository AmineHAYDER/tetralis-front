import React, {useState} from 'react';
import {Button, Row} from "react-bootstrap";
import {getSpreadsheetTables} from "../../redux/api/SpreadsheetAction";
import {useDispatch, useSelector} from "react-redux";

function SheetsSection({setIsLoading, sheetId, tables, setTables}) {
    const token = useSelector(state => state.googleStates.token)
    const Tables = useSelector(state => state.googleStates.tables)
    const dispatch = useDispatch()

    const handleTableClick = (table) => {
        if (selected(tables, table)) {
            var filtered = tables.filter(function (value, index, arr) {
                return value != table;
            });
            setTables(filtered)
        } else {
            setTables([...tables, table])
        }
    }
    return (<>
            <Row style={{margin: 20}}>
                <Button onClick={() => {
                    setIsLoading(true)
                    dispatch(getSpreadsheetTables(token, sheetId)).then(() => setIsLoading(false))
                }}
                        variant={"danger"}>
                    Select Tables
                </Button>
            </Row>

            {Tables && Tables.length ? <>
                <h5>Select tables to deduplicate:(Not required)</h5>
                {Tables.map((table, i) => {
                    return <Button key={i} onClick={() => handleTableClick(table)}
                                   style={{opacity: selected(tables, table) ? 1 : 0.6, margin: 10}}>
                        {table}
                    </Button>
                })} </> : null}

        </>
    );
}

export function selected(tables, table) {
    return tables.indexOf(table) !== -1
}

export default SheetsSection;
