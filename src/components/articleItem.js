import React from 'react';
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Colors from '../constants/colors'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    marginTop : "15px",
    fontWeight : 'bold',
    height : "60px"
  },
  pos: {
    fontSize : "14px",
    height : "50px"
  },
  date : {
    fontSize : 12,
    fontStyle : 'italic',
    color : Colors.secondary
},
link : {
    textDecoration : "none",
    color : "#222"
}
});

const ArticleItem = props => {
  const classes = useStyles();
  
  const brief = props.detail

  return (
    <Card className={classes.root} {...props}>
      <CardContent>
     <Link to={`/detail/:${props.id}`} className={classes.link}>
          <img src={props.url} height="250px" width="100%" alt="..."/>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {props.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {brief}
        </Typography>
      </Link>
        <Typography variant="body2" component="p" style={{marginTop : "20px"}}>
          Created at
          <span className={classes.date}> {props.date}</span>
        </Typography>
        {props.children}
      </CardContent>
    </Card>
  );
}

export default ArticleItem