import React, { Component } from 'react';
import GiveError from './GiveError';
import './styles/Signup.css';
import LoginButton from './LoginButton';

export default class Signup extends Component {
    state = {
        name: '',
        age: '',
        email: '',
        password: '',
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id] : e.target.value,
        });
    }

    // handleSubmit = async (e) => {
    //    e.preventDefault();
    //    const signupDetails = {
    //      name: this.state.name,
    //      age: this.state.age,
    //      email: this.state.email,
    //      password: this.state.password,
    //    }
    //    this.props.signup(signupDetails);
    // }

    render() {
        return (
            <div className="form-container">
                <h4 style={{color:"#097bed"}}>Signup</h4>
                <GiveError error_type="signup" />
                <div className="signup-area">
                <div className="password-restrictions">
                    <div>
                      <h6>Password must contain:</h6>
                      <ul>
                        <li>atleast 8 characters</li>
                        <li>one number</li>
                      </ul>
                    </div>
                    <div>
                      <h6>Password must not contain:</h6>
                      <ul>
                        <li>the term "password"/"Password"</li>
                      </ul>
                    </div>
                </div>
                <form className="signup-fields">
                <div className="form-group">
                    <input type="text" placeholder = "Full Name" className="form-control" id="name" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder ="Age" className="form-control" id="age" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <input type="email" placeholder = "Email" className="form-control" id="email" aria-describedby="emailHelp" onChange={this.handleChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                <div className="form-group">
                    <input type="password" placeholder = "Password" className="form-control" id="password" onChange={this.handleChange} />
                </div>
                <div>
                    <LoginButton className="signup-btn" type="signup" state={this.state} signup={this.props.signup} />
                </div>
              </form>
              </div>
            </div>
        )
    }
}
