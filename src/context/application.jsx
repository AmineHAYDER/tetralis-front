import React, {createContext, useContext, useReducer} from 'react'
import * as ACTIONS from './actions'

export const ENDPOINT = 'http://localhost:5000/'

export const ApplicationContext = createContext(null)
export const useApplication = () => useContext(ApplicationContext)
const initialState = {
    files: null,
    code:null
}

function reducer(state, action) {

    switch (action.type) {
        case ACTIONS.INIT: {
            const {url} = action
            console.log(url)
            return {...state, url}
        }
        case ACTIONS.FILES: {
            const {files} = action
            console.log(files)
            return {...state, files}
        }
        case ACTIONS.ROWS: {
            const {rows} = action
            console.log(rows)
            return {...state, rows}
        }
        default:
            return {...state}
    }
}


export default ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const api = {
        init: async () => {
            const url = await fetch(ENDPOINT + `auth/google`)
                .then(res => res.json())
            dispatch({type: ACTIONS.INIT, url})
        },
        loadFiles: async (connected) => {
            const config = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + connected
                }
            }
            const files = await fetch(ENDPOINT + `drive/spreadsheets`, config)
                .then(res => res.json())
            dispatch({type: ACTIONS.FILES, files})
        },
        getSpreadsheet: async (id) => {
            const config = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('oath2_token')
                }
            }
            const rows = await fetch(ENDPOINT + `spreadsheet/` + id, config)
                .then(res => res.json())
            dispatch({type: ACTIONS.ROWS, rows})
        }
    }
    return <ApplicationContext.Provider value={[state, api]}>
        {children}
    </ApplicationContext.Provider>
}
