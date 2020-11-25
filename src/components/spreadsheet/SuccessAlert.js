import React from 'react';
import {Alert, Row} from "react-bootstrap";


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
export default SuccessAlert;
