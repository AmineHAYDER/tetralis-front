import React, {useState} from 'react';
import {Button, Row} from "react-bootstrap";
import {getSpreadsheetKeys} from "../../redux/Actions";
import {useDispatch, useSelector} from "react-redux";

function KeysSection({setIsLoading, sheetId, keys, setKeys,tables}) {
    const token = useSelector(state => state.googleStates.token)
    const Keys = useSelector(state => state.googleStates.keys)
    const dispatch = useDispatch()

    const handleTableClick = (key) => {
        if (selected(keys, key)) {
            var filtered = keys.filter(function (value, index, arr) {
                return value != key;
            });
            setKeys(filtered)
        } else {
            setKeys([...keys, key])
        }
    }
    return (<>
            <Row style={{margin: 20}}>
                <Button onClick={() => {
                    setIsLoading(true)
                    dispatch(getSpreadsheetKeys(token, sheetId,tables)).then(() => setIsLoading(false))
                }}
                        variant={"danger"}>
                    Select Keys
                </Button>
            </Row>

            {Keys && Keys.length ? <>
                <h5>Select keys:</h5>
                {Keys.map((key, i) => {
                    return <Button key={i} onClick={() => handleTableClick(key)}
                                   style={{opacity: selected(keys, key) ? 1 : 0.6, margin: 10}}>
                        {key}
                    </Button>
                })} </> : null}

        </>
    );
}

export function selected(tables, table) {
    return tables.indexOf(table) !== -1
}

export default KeysSection;
