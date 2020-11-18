import React from 'react';
import {  useParams} from "react-router-dom";
import { useHistory } from "react-router-dom";
function TokenHandler(props) {
    let history = useHistory();

    const {token} = useParams()
    localStorage.setItem('oath2_token', token);
    history.push("/")
    return <></>
}

export default TokenHandler;
