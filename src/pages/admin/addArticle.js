import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import {useSelector, useDispatch} from 'react-redux'

import Color from '../../constants/colors'
import NavBar from '../../components/navBar'
import Footer from '../../components/footer'
import * as ArticleAction from '../../store/actions/articles'



const useStyles = makeStyles( (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
      margin: "15px auto",
      backgroundColor: Color.primary,
    },
    root : {
        textAlign : 'center',
        margin : "auto",
        paddignTop : "80px",
        paddingBottom : "80px",
    },
    form: {
      margin: 20,
      textAlign : 'center',
      margin : "auto"
    },
    margin : {
        display : 'block',
        width : "100%"
    },
    formControl: {
        width: '100%'
    },
    card : {
        maxWidth : "600px",
        minWidth : "300px",
        margin : "auto",
        textAlign : "center",
        marginBottom : "30px",
        paddingTop : "20px",
        paddingBottom : "20px"
    },
    submit : {
        marginTop : "20px",
        marginBottom : "20px",
        background : Color.accent,
        color : "#FFF",
        '&:hover': {
            background : Color.accent,
        }
    },
    signup : {
        textDecoration : "none",
        color : Color.secondary,
        width : "100%"
    }
  })
  )

  const CssTextField = withStyles({
    root: {
      "& label.Mui-focused": {
        color: Color.primary
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: Color.primary
      },
      "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
          borderColor: Color.primary
        },
        "&.Mui-focused fieldset": {
          borderColor: Color.primary
        }
      }
    }
  })(TextField);

const AddArticle = (props) => {
    const classes = useStyles()
    
    let selectedArticleId = props.location.pathname.slice(10)
    

    console.log(selectedArticleId)

  const editArticle = useSelector(state => 
                    state.ArticleReducer.userArticles.find(article => article.id === selectedArticleId))

    // Date
    const formatDate = date => {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return date.getDate() + "/" + (date.getMonth()+1) +  "/" + date.getFullYear() + "at" + strTime;
    }
    const insertDate = new Date();
    
    const date = formatDate(insertDate);
    const [title, setTitle] = React.useState(editArticle ? editArticle.title : '')
    const [imgLink, setImgLink] = React.useState(editArticle ? editArticle.imgLink : '')
    const [detail, setDetail] = React.useState(editArticle ? editArticle.detail : '')

    const dispatch = useDispatch()

    const handleSubmit = React.useCallback(() => {
        
      if(editArticle){
        dispatch(ArticleAction.updateArticle(selectedArticleId,title,imgLink, detail ))
      }else{
        dispatch(ArticleAction.insertArticle(date, title,imgLink, detail ))
      }
    },[dispatch,selectedArticleId,date, title,imgLink, detail])

    return (
    <div>
    <NavBar />
    <Container maxWidth="lg" style={{paddingTop : "80px"}}>
    <CssBaseline/>
    <Card className={classes.card}>
    <CardContent>
      <Grid container spacing={2}>
         <Grid item xs={12}>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <CssTextField
            variant="outlined"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            onChange={e => setTitle(e.target.value)}
            value={title}
            />
        </FormControl>
        </Grid>  
         <Grid item xs={12}>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <CssTextField
            variant="outlined"
            required
            fullWidth
            id="image"
            label="Image"
            name="image"
            autoComplete="image"
            onChange={e => setImgLink(e.target.value)}
            value={imgLink}
            />
        </FormControl>
        </Grid> 
         <Grid item xs={12}>    
        <FormControl className={clsx(classes.margin, classes.textField)}>
         <CssTextField
            variant="outlined"
            id="outlined-multiline-static"
            multiline
            rows="4"
            required
            fullWidth
            name="detail"
            label="Detail"
            type="text"
            id="detail"
            onChange={e => setDetail(e.target.value)}
            value={detail}
          />
        </FormControl>
        </Grid>
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={handleSubmit}
          >
            <Link to="/Profile" className={classes.signup} style={{color:"#FFF"}}>
              {selectedArticleId ? "Update Article" : "Add Article"}
              </Link>
          </Button>
      </CardContent>
      </Card> 
      </Container>
      <Footer />
     </div>
    )
}

export default AddArticle
