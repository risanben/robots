import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { robotReducer } from './reducers/robot.reducer'
import { userReducer } from './reducers/user.reducer'
import { appReducer } from './reducers/app.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    robotModule: robotReducer,
    userModule: userReducer,
    appModule: appReducer,
})

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store