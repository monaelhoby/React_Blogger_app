
import { USER_SEETING, FETCH_SETTING } from '../actions/setting'
import User from '../../modal/user'

const initialState = {
    userArr : []
}


const UserReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_SETTING :
            return {
                userArr : action.data
            }
        case USER_SEETING : 
          const newUser = new User(
              action.userData.id,
              action.userData.userName,
              action.userData.photo,
              action.userData.ownerId
          )
          return {
              ...state,
              userArr : state.userArr.concat(newUser)
          }
        default :
            return state
    }
}


export default UserReducer