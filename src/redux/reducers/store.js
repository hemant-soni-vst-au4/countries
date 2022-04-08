import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import mainReducer from ".";

let composeEnhancers = compose;

// redux dev tool setup 
if (process.env.NODE_ENV === 'development') {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
}
const rootReducer = combineReducers({
    main: mainReducer
})

const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)))

export default store;