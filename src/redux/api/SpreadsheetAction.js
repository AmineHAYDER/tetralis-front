import authAPI from './googleAPI';
import * as ACTIONS from '../Constatns'

export function getSpreadsheetTables(token, spreadsheetId) {
    return async function (dispatch) {
        if (!token) {
            dispatch(SpreadsheetsTablesClear())
        } else {
            const tables = await authAPI.getSpreadsheetTables(token, spreadsheetId)
            if (tables.code && tables.code > 200) dispatch(SpreadsheetsTablesLoadFailed(tables.errors[0].message))
            else dispatch(SpreadsheetsTablesLoadSuccess(tables))
        }

    };
}

export function SpreadsheetsTablesLoadSuccess(data) {
    return {type: ACTIONS.SPREADSHEETS_TABLES_LOAD_SUCCESS, tables: data};
}

export function SpreadsheetsTablesLoadFailed(error) {
    return {type: ACTIONS.SPREADSHEETS_TABLES_LOAD_FAILED, error};
}

export function SpreadsheetsTablesClear() {
    return {type: ACTIONS.SPREADSHEETS_TABLES_CLEAR};
}

export function getSpreadsheetKeys(token, spreadsheetId, tables) {
    return async function (dispatch) {
        console.log(spreadsheetId, tables)

        if (!token) {
            dispatch(SpreadsheetsKeysClear())
        } else if (tables) {
            const keys = await authAPI.getSpreadsheetKeys(token, spreadsheetId, tables)
            if (keys.code && keys.code > 200) dispatch(SpreadsheetsKeysLoadFailed(keys.errors[0].message))
            else dispatch(SpreadsheetsKeysLoadSuccess(keys))
        } else {
            const keys = await authAPI.getSpreadsheetKeys(token, spreadsheetId)
            if (keys.code && keys.code > 200) dispatch(SpreadsheetsKeysLoadFailed(keys.errors[0].message))
            else dispatch(SpreadsheetsKeysLoadSuccess(keys))
        }

    };
}

export function SpreadsheetsKeysLoadSuccess(data) {
    return {type: ACTIONS.SPREADSHEETS_KEYS_LOAD_SUCCESS, keys: data};
}

export function SpreadsheetsKeysLoadFailed(error) {
    return {type: ACTIONS.SPREADSHEETS_KEYS_LOAD_FAILED, error};
}

export function SpreadsheetsKeysClear() {
    return {type: ACTIONS.SPREADSHEETS_KEYS_CLEAR};
}
