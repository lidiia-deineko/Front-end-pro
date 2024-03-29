import {createStore } from "redux"
import combineReducers from "./reducers"


function configureStore(){
    return createStore(
        combineReducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
}

export default configureStore;