import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';


import * as ArticleAction from '../../store/actions/articles'
import ArticleItem from '../../components/articleItem'
import NavBar from '../../components/navBar'
import Footer from '../../components/footer'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingTop : "80px",
      paddingBottom : "80px"
    },
  }));


const AllArticles = () => {

    const classes = useStyles();
    const dispatch = useDispatch()

    const articles = useSelector(state => state.ArticleReducer.articles);
    // const usersData = useSelector(state => state.User.userArr);

    // console.log("articles", articles)

    React.useEffect(() => {
        dispatch(ArticleAction.fetchArticle())
    },[dispatch])

    return (
      <>
      <NavBar />
        <Container maxWidth="lg" className={classes.root}>
          <CssBaseline/>
            <Grid container spacing={3} >
                {articles.map(item => {
                    return (
                        <Grid key={item.id} item xs={12} md={4} lg={3}>
                            <ArticleItem 
                              url={item.imgLink}
                              title = {item.title}
                              detail = {item.detail.substring(0,70).concat("...")}
                              date = {item.date}
                              id={item.id}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
        <Footer />
     </>
    )
}

export default AllArticles
