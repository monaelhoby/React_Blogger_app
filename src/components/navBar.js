import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

import Color from '../constants/colors'
import * as UserAction from '../store/actions/setting'
import * as AuthAction from '../store/actions/admin'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  navBar : {
    background : Color.primary
  },
  link : {
      color : "#FFF",
      textDecoration : "none",
      marginRight : "20px"
  },
  btn : {
      background : 'rgba(50, 180, 180, 0.9)'
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch()

  const userToken = useSelector(state => state.auth.token)
  const userId = useSelector(state => state.auth.userId)
  // console.log(userId)

  React.useEffect(() => {
    dispatch(UserAction.fetchUserData())
},[dispatch])

const users = useSelector(state => state.User.userArr );


const userProfile = users.find(arr => arr.id === userId)
// console.log("userProfile", userProfile)

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          <Link to="/" className={classes.link}>Home</Link>
          {userToken ? (<Link to="/Profile" className={classes.link}>Profile</Link>) : null}
          </Typography>
          {!userToken ? (<Button color="inherit" className={classes.btn}>
                <Link to="/Login" className={classes.link}>Login</Link>
              </Button>) :
              (
              <>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.btn}>
                  <Avatar alt="Remy Sharp" 
                  src={userProfile ? userProfile.photo : null}
                  className={classes.orange}>
                    {
                    userProfile ? userProfile.userName.slice(0,1)
                    :  " "
                    }
                     </Avatar>
                     <span style={{marginLeft : '10px'}}>{userProfile ? userProfile.userName : " "}</span>
                  </Button>
                  
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link to="/Setting" style={{textDecoration : "none", color : "#000"}}>Setting</Link>
                      </MenuItem>
                    <MenuItem onClick={() => dispatch(AuthAction.Logout())}>
                    <Link to="/" style={{textDecoration : "none", color : "#000"}}>Logout</Link>
                    </MenuItem>
                  </Menu>
               </>
              )
            }
        </Toolbar>
      </AppBar>
    </div>
  );
}
