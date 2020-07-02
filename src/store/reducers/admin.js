
import {AUTHENTICATE, LOGOUT} from '../actions/admin'

const initialState = {
    token : null,
    userId : null
}

const adminReducer = (state = initialState, action) => {
    switch(action.type){
        case AUTHENTICATE :
            return{
                token : action.token,
                userId : action.userId
            }
        case LOGOUT : 
            return initialState
        default : 
         return state
    }
}

export default adminReducer