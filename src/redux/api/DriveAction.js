import authAPI from './googleAPI';
import * as ACTIONS from '../Constatns'

export function getSpreadsheets(token) {
    return async function (dispatch) {
        const spreadsheets = await authAPI.getSpreadsheets(token)
        if (spreadsheets.code && spreadsheets.code > 201) dispatch(SpreadsheetsLoadFailed(spreadsheets.errors[0].message))
        else dispatch(SpreadsheetsLoadSuccess(spreadsheets))
    };
}

export function SpreadsheetsLoadSuccess(data) {
    return {type: ACTIONS.SPREADSHEETS_LOAD_SUCCESS, spreadsheets: data};
}

export function SpreadsheetsLoadFailed(error) {
    return {type: ACTIONS.SPREADSHEETS_LOAD_FAILED, error};
}
