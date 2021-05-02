import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {TaskConsumer} from '../context'
import './styles/Login.css';
import GiveError from './GiveError';
import LoginButton from './LoginButton';

export default class Login extends Component {

    state = {
        email: '',
        password: '',
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id] : e.target.value,
        });
    }

    render() {
        return (
            <div className="form-container">
              <h4 style={{color:"#097bed"}}>Login</h4>
              <GiveError error_type="login" />
              <form >
                <div className="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={this.handleChange} />
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control" id="password" onChange={this.handleChange}/>
                </div>
                <LoginButton type="login" state={this.state} login={this.props.login} />
              </form>
            </div>
        )
    }
}

