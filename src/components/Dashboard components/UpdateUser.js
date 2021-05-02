import React, { Component } from 'react'
import '../styles/UpdateUser.css'

export default class UpdateUser extends Component {
    state = {
        name: '',
        age: '',
        email:'',
        password: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value,
        }) 
    } 

    handleApply = async () => {
        const data = {}
        let counter = 0;
        if (this.state.name !== '') {
            data.name = this.state.name
            counter += 1;
        }
        if (this.state.age !== '') {
            data.age = this.state.age
            counter += 1;
        }
        if (this.state.email !== '') {
            data.email = this.state.email
            counter += 1;
        }
        if (this.state.password !== '') {
            data.password = this.state.password
            counter += 1;
        }

        if (counter === 0) {
            return;
        }
        else {
            await this.props.applyChanges(data)
            this.props.return()
        }
    }


    render() {
        const {name, age, email} = this.props.user;
        return (
            <div className="updateContainer">
                <button className="return" onClick={this.props.return}>
                    Return
                </button>
                <div className="data name">
                    <span className="data-label">Name:</span> <br />
                    <input id="name" type="text" defaultValue={name} onChange={this.handleChange} />
                </div>
                <div className="data age">
                    <span className="data-label">Age:</span> <br />
                    <input type="text" id="age" defaultValue={age} onChange={this.handleChange} />
                </div>
                <div className="data name">
                    <span className="data-label">Email:</span> <br />
                    <input type="text" id ="email" defaultValue={email} onChange={this.handleChange} />
                </div>
                <div className="data password">
                    <span className="data-label">Password:</span> <br />
                    <input type="password" id="password" defaultValue="*#@%^&&**" onChange={this.handleChange} /> 
                </div>
                <button className="apply-btn" onClick={this.handleApply}>
                    Apply
                </button>
            </div>
        )
    }
}
