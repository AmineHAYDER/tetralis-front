import * as ACTIONS from './Constatns'
import {NotificationManager} from 'react-notifications';

const initialState = {
    isLogged: false,
    spreadsheets: null,
    token:null,
    error: null
}

export default function googleReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.LOGIN_SUCCESS:
            const {token} = action
            return {
                ...state,
                isLogged: true,
                token
            }
        case ACTIONS.LOGIN_FAILED:
            return {
                ...state,
                isLogged: false,
                token:null,
                error: action.error
            }
        case ACTIONS.SPREADSHEETS_LOAD_SUCCESS:
            NotificationManager.success("Spreadsheets Loaded",'Success')
            const {spreadsheets} = action
            return {
                ...state,
                spreadsheets
            }
        case ACTIONS.SPREADSHEETS_LOAD_FAILED:
            NotificationManager.error(action.error,'Error')
            localStorage.clear()
            return {
                ...state,
                isLogged: false,
                token:null,
                error: action.error
            }
        case ACTIONS.SPREADSHEETS_KEYS_LOAD_SUCCESS:
            const {keys} = action
            return {
                ...state,
                keys
            }
        case ACTIONS.SPREADSHEETS_KEYS_LOAD_FAILED:
            return {
                ...state,
                error: action.error
            }
        case ACTIONS.SPREADSHEETS_KEYS_CLEAR:
            return {
                ...state,
                keys: null
            }
        case ACTIONS.SPREADSHEETS_TABLES_LOAD_SUCCESS:
            const {tables} = action
            return {
                ...state,
                tables
            }
        case ACTIONS.SPREADSHEETS_TABLES_LOAD_FAILED:
            return {
                ...state,
                error: action.error
            }
        case ACTIONS.SPREADSHEETS_TABLES_CLEAR:
            return {
                ...state,
                tables: null
            }
        case ACTIONS.DEDUPLICATION_SUCCESS:
            NotificationManager.success("Deduplication Done",'Success')
            const {results} = action
            console.log(results)
            return {
                ...state,
                results
            }
        case ACTIONS.DEDUPLICATION_FAILED:
            NotificationManager.error(action.error,'Error')
            const {error} = action
            return {
                ...state,
                error
            }
        default:
            return state;
    }
}



