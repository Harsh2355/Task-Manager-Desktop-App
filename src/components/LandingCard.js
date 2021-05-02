import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './styles/Landing.css';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Login from './Login';
import Signup from './Signup';
import {TaskConsumer} from '../context';


const useStyles = makeStyles({
  root: {
    minWidth: 220,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function LandingCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className="card-container">
      <div className="card">
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className="heading" variant="h2">
            <ListAltIcon fontSize="large" style={{ color: "#ffdb58"}} />
            <span style={{marginLeft:"1%"}}>TASK TRACKER</span>
          </Typography>
          
          <ChooseEntry />
        </CardContent>
    </Card>
    </div>  
  </div>
    );
}

function ChooseEntry () {
  return (
  <TaskConsumer> 
  {
    (value) => {
      if (value.newUser) {
        return (
          <div>
            <Signup signup={value.signup} />
            <button  className="new-user-btn btn btn-secondary"  onClick={value.toggleNewUser}>Go to Login</button>
          </div>
        )
      }
      else {
        return (
        <div>
            <Login login={value.login} />
            <button  className="new-user-btn btn btn-secondary" onClick={value.toggleNewUser}>Don't have an account yet</button>
          </div>
        )
      }
    }
  }
  </TaskConsumer>)
  
}