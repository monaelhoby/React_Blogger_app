



import User from '../../modal/user'


export const USER_SEETING = 'USER_SEETING'
export const FETCH_SETTING = 'FETCH_SETTING'


export const insertUSerDate = (userName, photo) => {
    return  async (dispatch, getState) => {
        const token = getState().auth.token
        const userId = getState().auth.userId
        // console.log("resData userId", userId, "token", token)
      const response = await fetch(`https://articles-db-d1d77.firebaseio.com/Users/${userId}.json?auth=${token}`,{
          method : "POST",
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
            userName,
            photo,
            ownerId : userId
          })
        });
    
      const resData = await response.json();
      // console.log("resData user", resData)
      dispatch ({
        type : USER_SEETING,
        userData : {
            id : resData.name,
            userName,
            photo,
            ownerId : userId
        }
      })
    }
}

export const fetchUserData = () => {
  return  async (dispatch, getState) => {
    const token = getState().auth.token
    const userId = getState().auth.userId
    try {
      const response = await fetch(`https://articles-db-d1d77.firebaseio.com/Users.json`)
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    const resData = await response.json();

    const user = []

    for (let key in resData) {
      let userName = ''
      let image = ''
      for(let name in resData[key]){
        userName = resData[key][name].userName
      }
      for(let name in resData[key]){
        image = resData[key][name].photo
      }
      // console.log("userName" , userName)
      user.push(
      new User(
        key,
        userName,
        image,
        resData[key].ownerId
      )
     ) 
    }
      
    // console.log("resData resData", resData)

      dispatch ({
        type : FETCH_SETTING,
        data : user
      })
    }catch(err){
      console.log(err)
    }
  }
}
