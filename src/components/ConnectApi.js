import React from 'react';
import {Button, Col} from "react-bootstrap";


function ConnectApi() {
    return (
        <>
            <Col>
                <h3>
                    Connect to your Api with Google
                </h3>

            </Col>
            <Col className={"sheets-container"}>
                <Button href={"http://localhost:5000/auth/google"} variant={"primary"}>
                    Connect Api
                </Button>
            </Col>
        </>
    );
}

export default ConnectApi;
