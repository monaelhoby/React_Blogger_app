import React from "react";
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom'
import * as firebase from 'firebase';
import {useSelector, useDispatch} from 'react-redux'


import NavBar from '../../components/navBar'
import Footer from '../../components/footer'
import Color from '../../constants/colors'
import * as UserAction from '../../store/actions/setting'

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  input: {
    width : "100%",
    position : "absolute",
    display : 'block',
  },
  btns : {
      position : "relative",
      width : "100%"
  },
  absolute : {
      position : "absolute",
      left: '12px',
      top: '10px'
  },
  submit : {
    marginTop : "80px",
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
}));

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

export default function UploadButtons() {
  const classes = useStyles();

  const dispatch = useDispatch()

  const storage = firebase.storage()

  const [userName, setUserName] = React.useState('')
  const [image, setImage] = React.useState('')
  const [imageUrl, setImageAsUrl] = React.useState('')
  const [error, setError] = React.useState('')

  const submitHandler =  () => {
     // async magic goes here...
     if(image === '') {
      console.error(`not an image, the image file is a ${typeof(image)}`)
    }
    // const abortController = new AbortController()
    // const signal = abortController.signal
    const uploadTask = storage.ref(`/images/${image.name}`).put(image)
    //initiates the firebase side uploading 
    uploadTask.on('state_changed', 
    () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage.ref('images').child(image.name).getDownloadURL()
       .then(fireBaseUrl => {
        dispatch(UserAction.insertUSerDate(userName, fireBaseUrl))
       })
    })
  }

  const handelChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImage(image);
    }
  }


  return (
    <div>
        <NavBar />
    <Container maxWidth="lg" style={{paddingTop : "80px"}}>
    <CssBaseline/>
    <Card className={classes.card}>
    <CardContent>
    <Grid container spacing={2}>
         <Grid item xs={12}>
          <FormControl style={{width : "100%", marginBottom : "40px"}}>
            <CssTextField
            variant="outlined"
            required
            fullWidth
            id="title"
            label="User Name"
            name="userName"
            autoComplete="userName"
            onChange={e => setUserName(e.target.value)}
            value={userName}
            />
            </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl className={classes.btns}>
            <CssTextField
            variant="outlined"
                required
                fullWidth
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange = {handelChange}
            />
            <label htmlFor="contained-button-file" className={classes.absolute}>
                <Button variant="contained" color="primary" component="span" style={{background : Color.primary}}>
                Upload
                </Button>
            </label>
            </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={submitHandler}
          >
            <Link to="/Profile" className={classes.signup} style={{color:"#FFF"}}>Save</Link>
          </Button>
         </CardContent>
        </Card>
    
    </Container>
    <Footer />
    </div>
  );
}
