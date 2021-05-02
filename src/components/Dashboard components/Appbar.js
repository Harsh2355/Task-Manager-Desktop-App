import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {TaskConsumer} from '../../context';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuOptions from './MenuOptions';
import '../styles/Appbar.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    top: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Appbar() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ width:"100vw", zIndex:5}}>
      <AppBar position="static" style={{backgroundColor:"#FDCB6E"}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuOptions />
          </IconButton>
          <Typography style={{letterSpacing:"1px"}} variant="h6" className={classes.title}>
            <span className="title">TASK TRACKER</span>
          </Typography>
          <TaskConsumer>
           {
             (value) => {
               return (   
                 <Link to = "/">
                   <Button style={{color:"white"}} onClick={value.logout}><span className="logout">Logout</span></Button>
                </Link>
                )
              }
           }
          </TaskConsumer>
        </Toolbar>
      </AppBar>
    </div>
  );
}
