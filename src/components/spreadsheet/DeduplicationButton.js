import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {deduplicateSpreadsheet} from "../../redux/Actions";


function DeduplicationButton({setIsLoading,sheetId, tables, keys}) {
    const token = useSelector(state=>state.googleStates.token)
    const dispatch = useDispatch()
    return <Row style={{margin:40}}>
        <Button onClick={() => {
            setIsLoading(true)
            dispatch(deduplicateSpreadsheet(token,sheetId, keys, tables)).then(()=>{
                setIsLoading(false)
            })
        }} variant={"warning"}>
            Deduplicate
        </Button>
    </Row>
}


export default DeduplicationButton;
