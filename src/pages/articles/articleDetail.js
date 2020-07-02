import React from 'react'
import {useParams} from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


import Colors from '../../constants/colors'
import NavBar from '../../components/navBar'
import Footer from '../../components/footer'

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      paddingTop : "30px",
      paddingBottom : "30px"
    },
    wrapper: {
        padding : "40px 20px",
    },
    title: {
      marginTop : "15px",
      fontWeight : 'bold',
      marginBottom : '40px',
      textAlign : "center",
      color : "#000"
    },
    pos: {
        fontSize : "14px",
        lineHeight : "36px",
        letterSpacing : "1px",
        marginTop : "30px"
      },
      date : {
        fontSize : 12,
        fontStyle : 'italic',
        color : Colors.secondary,
        paddingBottom : '2px',
        textDecoration : "underline"
    }
  });

const ArticleDetail = () => {

    const articles = useSelector(state => state.ArticleReducer.articles);
    let { id } = useParams();
    const selectedArticleId = id.slice(1)
    const selectedArticle = articles.find(article => article.id === selectedArticleId)
    // console.log(selectedArticle)

    const classes = useStyles()

    return (
      <>
        <NavBar />
        <Container maxWidth="lg" className={classes.root}>
          <CssBaseline/>
          <Card className={classes.wrapper}>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {selectedArticle.title}
              </Typography>
              <img src={selectedArticle.imgLink} width="100%" height="550px"/>
              <Typography variant="body2" component="p" style={{marginTop : "20px"}}>
                Created at
                <span className={classes.date}> {selectedArticle.date}</span>
                </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {selectedArticle.detail}
              </Typography>
              
          </Card>
        </Container>
        <Footer />
      </>
    )
}

export default ArticleDetail
