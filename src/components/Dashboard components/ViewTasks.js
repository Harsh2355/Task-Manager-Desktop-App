import React, { Component } from 'react';
import {TaskConsumer} from '../../context.js';
import '../styles/ViewTasks.css';
import TaskList from './TaskList';
import UpdateUser from './UpdateUser';

export default class ViewTasks extends Component {
    state = {
        limit: '',
        skip: '', 
        completed: '',
        sortby: '',
        update: false,
    }

    // handlechange(e) mutates values of limit, skip, completed, sortby
    // in the state whenever there is change in input
    // effect: mutates state
    handlechange = (e) => {
        const {name, value} = e.target;
        if (name == "radio1") {
            this.setState({
                limit: value, 
            })
        }
        else if (name == "radio2") {
            this.setState({
                skip: value
            })
        }
        else if (name == "radio3"){
            this.setState({
                completed: value
            })
        }
        else if (name == "radio4") {
            this.setState({
                sortby: value
            })
        }
    }
     
    handleSubmit = async (f1, f2) => {
        const filter = {
            limit: this.state.limit,
            skip: this.state.skip,
            completed: this.state.completed,
            sortby: this.state.sortby,
        }
        await f1(filter);    
        await f2();
    }

    ToggleUpdateUser = () => {
        this.setState({
            update: true,
        })
    }
    
    ReturnToHome = () => {
        this.setState({
            update: false,
        })
    }

    
    render() {
        if (this.state.update) {
            return <TaskConsumer>
                    {(value) => {
                        return <UpdateUser user={value.user} return={this.ReturnToHome} applyChanges={value.updateUser} />
                    }}            
                </TaskConsumer>
        }
        return (
            <div>
                    <TaskConsumer>
                        {(value) => {
                            if (value.user.name ===  undefined) {
                                return <div className="loading"><p>Loading...</p></div>
                            }
                            const {name, age, email} = value.user;
                            return (
                                <div className="TasksContainer">
                                    <div className="ViewContainer">
                                        <div className="account-card-container">
                                            <div className="info avatar-name">
                                                <p>Name : {name}</p>
                                            </div>
                                            <div className="info avatar-age">
                                                <p>Age: {age} </p>
                                            </div>
                                            <div className="info avatar-email">
                                                <p>Email: {email} </p>
                                            </div>
                                            <button onClick={this.ToggleUpdateUser} style={{padding:"3px 10px", fontSize:"14px"}}>
                                                Update User
                                            </button>
                                            <button onClick={value.deleteUser} style={{padding:"3px 10px", fontSize:"14px", marginLeft:"20px"}}>
                                                Delete Account
                                            </button>
                                        </div>
                                        <div className="filter-container">
                                            <div className="filter-heading">
                                                <p>Filter Settings</p> 
                                            </div>
                                            <div className="filter-options">
                                                <div className = "options limit">
                                                    Limit <br />
                                                   <input type="radio"  name="radio1" value="5"  onClick={this.handlechange} /> 5 <br />
                                                   <input type="radio"  name="radio1" value="10" onClick={this.handlechange}  /> 10 <br />
                                                   <input type="radio"  name="radio1" value="20" onClick={this.handlechange}  /> 20 <br />
                                                   <input type="radio"  name="radio1" value="50" onClick={this.handlechange}  /> 50 <br/>
                                                   <input type="radio"  name="radio1" value="" onClick={this.handlechange}  /> None
                                                </div>
                                                <div className = "options skip">
                                                    Skip <br />
                                                    <input type="radio"  name="radio2" value="50" onClick={this.handlechange} /> 50 <br />
                                                    <input type="radio"  name="radio2" value="100" onClick={this.handlechange} /> 100 <br />
                                                    <input type="radio"  name="radio2" value="150" onClick={this.handlechange}  /> 150 <br />
                                                    <input type="radio"  name="radio2" value="200" onClick={this.handlechange}  /> 200 <br />
                                                    <input type="radio"  name="radio2" value="" onClick={this.handlechange}  /> None
                                                </div>
                                                <div className = "options complete">
                                                    Completed <br />
                                                    <input type="radio"  name="radio3" value="true" onClick={this.handlechange} /> True <br />
                                                    <input type="radio"  name="radio3" value="false" onClick={this.handlechange} /> False <br />
                                                    <input type="radio"  name="radio3" value="" onClick={this.handlechange} /> None <br /> 
                                                </div> 
                                                <div className = "options sort">
                                                    Sort By <br />
                                                    <input type="radio"  name="radio4" value="desc" onClick={this.handlechange} /> Descending Order <br />
                                                    <input type="radio"  name="radio4" value="asc" onClick={this.handlechange} /> Ascending Order <br />
                                                    <input type="radio"  name="radio4" value="" onClick={this.handlechange} /> None
                                                </div>
                                                <button className="apply resize" onClick = {() => this.handleSubmit(value.filterResult, value.getTasks)} >
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <TaskList data={value.data}/>
                                </div>
                            )
                       }}
                    </TaskConsumer>
            </div>
        )
    }
}
