import React, {useState, useEffect} from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import CssBaseline from '@material-ui/core/CssBaseline';
// import { Alert } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Link} from 'react-router-dom'


import Color from '../../constants/colors'
import * as AuthAction from '../../store/actions/admin'
import imgUrl from '../../images/bkg.jpg'


const Schema = yup.object({
    email: yup.string().email("email invalid").required('email invalid'),
    password: yup.string().required('Password must be more than 6 charachter').min(5)
  });

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
      backgroundImage : `url('${imgUrl}')`,
      backgroundSize : "cover"
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
  errorText : {
    display : "block",
      color : 'crimson',
      fontStyle:'italic',
      marginBottom:35,
      marginTop : 5,
      fontSize : 12
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
      background : Color.primary,
      color : "#FFF",
      '&:hover': {
          background : Color.primary,
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

const Login = () => {

const classes = useStyles();

   const [loading, setLoading] = useState(false)

   const [error, setError] = useState('')

   useEffect(() => {
    if(error){
      // return<Alert severity="error">{error}</Alert>
    alert(error)

    }
  },[error])

   const dispatch = useDispatch()

   useEffect(() => {
    const tryLogin = async () => {
      const userData = await localStorage.getItem('userData');
      if (!userData) {
        return;
      }
      const dateTransformation = JSON.parse(userData)
      const {token, userId, expiryDate} = dateTransformation
      const expirationDate = new Date(expiryDate)

      if(expirationDate <= new Date() || !token || !userId){
        return
      }
      const expirationTime = expirationDate.getTime() -  new Date().getTime()
      dispatch(AuthAction.authenticate(userId, token, expirationTime))
    }

    tryLogin()
},[dispatch]) 


   const handleLogin =  async (email, password) => {
    setLoading(true)
    try{
      await dispatch(AuthAction.Login(email, password))
     }catch(err){
      setError(err.message)
      setLoading(false)
     }
   }

    return (
    <div  className={classes.root} justify="center">
    <Container maxWidth="lg" style={{paddingTop : "80px"}}>
    <CssBaseline/>
    <div>
    <Formik
        initialValues={{email: '', password: '' }}
        validationSchema={Schema}
        onSubmit={async (values, actions) => {
            // console.log("values", values)
            await handleLogin(values.email, values.password)
            // actions.resetForm();
        }}
    >
    {props => (
    <Card className={classes.card}>
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5" style={{marginBottom : "20px"}}>
      Login
    </Typography>
      <CardContent>
      <Grid container spacing={2}>
         <Grid item xs={12}>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <CssTextField
            variant="outlined"
            required
            fullWidth
            id="mui-theme-provider-outlined-input"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.email}
            />
        </FormControl>
        <span className={classes.errorText}>{props.touched.email && props.errors.email}</span>
         </Grid>   
         <Grid item xs={12}>    
        <FormControl className={clsx(classes.margin, classes.textField)}>
         <CssTextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.password}
          />
        </FormControl>
        <span className={classes.errorText}>{props.touched.password && props.errors.password}</span>
        </Grid>
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={props.handleSubmit}
          >
            <Link to="/" className={classes.signup} style={{color:"#FFF"}}>Login</Link>
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link to="/Signup" className={classes.signup}>
                Create an account? Sign up
              </Link>
            </Grid>
          </Grid>
      </CardContent>    
    </Card>
        )}
        </Formik>
      </div>
      </Container>
      </div>  
    )
}


export default Login
