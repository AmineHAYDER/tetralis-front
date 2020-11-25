import React from 'react';
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import {loginGoogle} from "../redux/Actions";

function TokenHandler(props) {
    let history = useHistory();
    const {token} = useParams();
    const dispatch = useDispatch()
    localStorage.setItem('oath2_token', token);
    dispatch(loginGoogle(token))
    history.push("/")
    return <></>
}

export default TokenHandler;
