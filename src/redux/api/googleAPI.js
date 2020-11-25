import {ENDPOINT} from '../Constatns'


class GoogleAPI {
    static  getSpreadsheets(token) {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        return  fetch(ENDPOINT+`drive/spreadsheets`, config).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
    static getSpreadsheetKeys(token,spreadsheetId,tables) {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        let query = ""
        if (tables.length)  query = '?tables=' +tables
        return fetch(ENDPOINT+`spreadsheet/`+spreadsheetId+'/keys' + query , config).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
    static getSpreadsheetTables(token,spreadsheetId) {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        return fetch(ENDPOINT+`spreadsheet/`+spreadsheetId+'/tables', config).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
    static deduplicateSpreadsheet(token,spreadsheetID,keys,tables) {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        let query = ""
        if (keys) query += '?keys='+keys
        if (tables) query += '&tables='+tables
        return fetch(ENDPOINT+`spreadsheet/`+spreadsheetID+'/Deduplicate'+query, config).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}
export default GoogleAPI;
