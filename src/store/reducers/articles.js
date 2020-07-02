
import {
    INSERT_ATRICLE,
    FETCH_ATRICLES,
    DELETE_ATRICLE,
    UPDATE_ATRICLE
}from '../actions/articles'
import Article from '../../modal'


const initialState = {
    articles : [],
    userArticles : []
}

const ArticleReducer = (state = initialState, action) => {
    switch(action.type) {

        case FETCH_ATRICLES : 
         return {
            articles : action.Articles,
            userArticles : action.ArticleUser
         }

        case INSERT_ATRICLE :
            const newArticle = new Article(
                action.ArticleData.id,
                action.ArticleData.date,
                action.ArticleData.ownerId,
                action.ArticleData.title,
                action.ArticleData.imgLink,
                action.ArticleData.detail
            );
            return {
                ...state,
                articles : state.articles.concat(newArticle),
                userArticles : state.userArticles.concat(newArticle)
            }
            case DELETE_ATRICLE :
                return {
                    ...state,
                    articles : state.articles.filter(article => article.id !== action.id),
                    userArticles : state.userArticles.filter(article => article.id !== action.id)
                }
            case UPDATE_ATRICLE : 
                const articleIndex = state.userArticles.findIndex(
                    article => article.id === action.articleId
                )
                const updatedArticle = new Article(
                    action.articleId,
                    action.ArticleData.date,
                    state.userArticles[articleIndex].ownerId ,  
                    action.ArticleData.title,
                    action.ArticleData.imgLink,
                    action.ArticleData.detail
                )
                const allUserArticle = [...state.userArticles]
                allUserArticle[articleIndex] = updatedArticle
                const allAvalArticlesIndex = state.articles.findIndex(
                    article => article.id === action.articleId
                )
                const allAvalaibleArticles = [...state.articles]
                allAvalaibleArticles[allAvalArticlesIndex] = updatedArticle
                return {
                    ...state,
                    articles : allAvalaibleArticles,
                    userArticles : allUserArticle
                }

        default :
         return state
             
    }
}


export default ArticleReducer