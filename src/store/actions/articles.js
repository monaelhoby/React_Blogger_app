
import Article from '../../modal'

export const INSERT_ATRICLE = 'INSERT_ATRICLE'
export const FETCH_ATRICLES = 'FETCH_ATRICLES'
export const DELETE_ATRICLE = 'DELETE_ATRICLE'  
export const UPDATE_ATRICLE = 'UPDATE_ATRICLE'  


export const insertArticle = (date,title, imgLink, detail) => {
  return  async (dispatch, getState) => {
    const token = getState().auth.token
    const userId = getState().auth.userId
  const response = await fetch(`https://articles-db-d1d77.firebaseio.com/Articles.json?auth=${token}`,{
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        date,
        title, 
        imgLink,
        detail,
        ownerId : userId
      })
    });

  const resData = await response.json();
  console.log("resData user", resData)
  dispatch ({
    type : INSERT_ATRICLE, 
    ArticleData : {
        id : resData.name,
        date, 
        title,
        imgLink, 
        detail,
        ownerId : userId
    }
  })
}
}

export const fetchArticle = () => {
    return  async (dispatch, getState) => {
      const userId = getState().auth.userId
    try {
    const response = await fetch(`https://articles-db-d1d77.firebaseio.com/Articles.json`);

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
      const resData = await response.json();
      
      const loadedArticles = [];
    
    for (let key in resData) {
      loadedArticles.push(
        new Article(
          key,
          resData[key].date,
          resData[key].ownerId,
          resData[key].title,
          resData[key].imgLink,
          resData[key].detail
        )
      )
    }
    // console.log(loadedArticles)
      dispatch ({
        type : FETCH_ATRICLES, 
        Articles : loadedArticles,
        ArticleUser : loadedArticles.filter(article => article.ownerId === userId)
    })
  }catch(err){
    console.log("Error Message", err)
  }
}
}

export const deleteArticle = articleId => {
  return  async (dispatch, getState) => {
    const token = getState().auth.token
    const response = await fetch(`https://articles-db-d1d77.firebaseio.com/Articles/${articleId}.json?auth=${token}`,{
        method: 'DELETE'
      }
    );
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
      dispatch ({type : DELETE_ATRICLE, id : articleId})
  }
}

export const updateArticle = (id,  title, imgLink, detail) => {
  return  async (dispatch, getState) => {
    // console.log(getState())
    const token = getState().auth.token
  const response = await fetch(`https://articles-db-d1d77.firebaseio.com/Articles/${id}.json?auth=${token}`,{
      method : "PATCH",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        title, 
        imgLink,
        detail
      })
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    // const resData = await response.json();
    // console.log("response", resData)
    dispatch ({
      type : UPDATE_ATRICLE,
      articleId : id, 
      ArticleData : {
          title ,
          imgLink , 
          detail 
      }
  })
}
}