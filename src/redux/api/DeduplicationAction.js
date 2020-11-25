import authAPI from './googleAPI';
import * as ACTIONS from '../Constatns'

export function deduplicateSpreadsheet(token, spreadsheetID, keys, tables) {
    return async function (dispatch) {


        const data = await authAPI.deduplicateSpreadsheet(token, spreadsheetID, keys, tables)
        if (tables.code && tables.code > 200) dispatch(DeduplicationFailed(tables.errors[0].message))
        else dispatch(DeduplicationSuccess(data))
    };
}

export function DeduplicationSuccess(data) {
    return {type: ACTIONS.DEDUPLICATION_SUCCESS, results: data};
}

export function DeduplicationFailed(error) {
    return {type: ACTIONS.DEDUPLICATION_FAILED, error};
}
