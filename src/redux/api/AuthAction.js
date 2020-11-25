import * as ACTIONS from '../Constatns'

export function loginGoogle(token) {
    return function(dispatch) {
        if (token) return dispatch(LoginSuccess(token))
        return dispatch(LoginFailed())
    };
}

export function LoginSuccess(token) {
    return {type: ACTIONS.LOGIN_SUCCESS,token};
}
export function LoginFailed() {
    return {type: ACTIONS.LOGIN_FAILED,error:"invalid or missing token try reLogin"};
}
