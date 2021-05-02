import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {TaskConsumer} from './context';
import {Link, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard'; 


export default class App extends Component { 
  render() {
    return (
      <div>
        <MyRouter />
      </div>
    )
  }
}


function MyRouter() {
  return (
    <TaskConsumer>
      {
        (value) => {
          if (value.isLoggedin) {
            return (
              <Switch>
               <Route exact path="/" component={Dashboard}/>
               <Route exact path="/landing" component={Landing}/>
              </Switch>
            )
          }
          else {
            return (
              <Switch>
                <Route exact path="/" component={Landing}/>
                <Route exact path="/dashboard" component={Dashboard}/>
              </Switch>
            )
          }
        }
      }
    </TaskConsumer>
  )
}
