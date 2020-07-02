// import {AsyncStorage} from 'react-native'


export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

let timer

export const authenticate = (userId, token, expiryTime) => {
    return dispatch =>  {
      dispatch(setLogoutTimer(expiryTime));
      dispatch({ type: AUTHENTICATE, userId: userId, token: token });
    }
  };


export const Signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEImcMHKqdG1JP7-UYmrHIcfyKvIetJNg`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true
            })
          }
          );

          if(!response.ok){
            const errorData = await response.json();
            // console.log(errorData)
            const errorId = errorData.error.message;
            let message = ''
            if(errorId === 'WEAK_PASSWORD : Password should be at least 6 characters'){
               message = 'Password is weak. Password should be at least 6 characters'
            }else if (errorId === 'EMAIL_EXISTS'){
                message = 'Email exists'
            }else if (errorId === 'INVALID_EMAIL'){
                message = 'Invalid email'
            }
            throw new Error(message)
        }

        const resData = await response.json()
        // console.log("resData Signup", resData)

      dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      ); // date of token
      saveStorage(resData.idToken, resData.localId, expirationDate)
  }
}

export const Login = (email, password) => {
    return async (dispatch, getState) => {
        // console.log("getState()", getState().auth)
      const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEImcMHKqdG1JP7-UYmrHIcfyKvIetJNg`,
            {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    email : email,
                    password : password,
                    returnSecureToken : true
                })
            })
  
            if (!response.ok) {
                const errorResData = await response.json();
                const errorId = errorResData.error.message;
                // console.log("errorId", errorId)
                let message = 'Something went wrong!';
                if (errorId === 'EMAIL_NOT_FOUND') {
                  message = 'This email not found!';
                } else if (errorId === 'INVALID_PASSWORD') {
                  message = 'This password is not valid!';
                }
                throw new Error(message);
              }
  
          const resData = await response.json()
        // console.log("resData login", resData)
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))

          const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
          ); // date of token
          saveStorage(resData.idToken, resData.localId, expirationDate)
    }
  }

  export const Logout = () => {
    clearLogoutTimer()
    localStorage.removeItem('userData')
    return {
        type : LOGOUT
    }
  }

 const clearLogoutTimer = () => {
   if(timer){
    clearTimeout(timer)
   }
   
 } 

  const setLogoutTimer = expirationTime => {
    return dispatch => {
      timer = setTimeout(() => {
        dispatch(Logout())
      }, expirationTime )
    }
  }

const saveStorage = (token, userId, expirationDate) => {
    localStorage.setItem(
        'userDate',
        JSON.stringify({
            token : token,
            userId : userId,
            expiryDate : expirationDate.toISOString()
        })
    )
}