import {createStore, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import {combineReducers} from 'redux'


import ArticleReducer from './reducers/articles'
import adminReducer from './reducers/admin'
import UserReducer from './reducers/setting'

const rootReducer = combineReducers({
    ArticleReducer : ArticleReducer,
    auth : adminReducer,
    User : UserReducer
})

const Store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default Store