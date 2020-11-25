import {createStore,combineReducers ,applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import googleReducer from './Reducers';
import thunk from "redux-thunk"

const rootReducer = combineReducers({
    googleStates :googleReducer
})

export default function configureStore() {
    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
}
