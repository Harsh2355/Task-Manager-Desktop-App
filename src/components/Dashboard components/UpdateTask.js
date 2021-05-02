import React, { Component } from 'react'
import '../styles/UpdateTask.css'
import {TaskConsumer} from '../../context'

export default class UpdateTask extends Component {
    state = {
        description: '',
        completed: ''
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleApply = async (f) => {
        const data = {}
        let counter = 0;
        if (this.state.description !== '') {
            data.description = this.state.description
            counter += 1;
        }
        if (this.state.completed !== '') {
            data.completed = this.state.completed
            counter += 1;
        }

        if (counter === 0) {
            this.props.toggle(false)
            return;
        }
        else {
            this.props.toggle(false)
            await f(this.props.task._id, data)
        }
    }


    render() {
        return (
            <div className="update-container">
            <div className="update-form">
                <input type="text" className="description" name="description" defaultValue={this.props.task.description} onChange={this.handleChange}/>
                <div className="completed">
                    <span><input type="radio" name="completed" value="true" onChange={this.handleChange}/><div>Completed</div></span>
                    <span><input type="radio" name="completed" value="false" onChange={this.handleChange}/> <div>Not Completed</div></span>
                </div>
            </div>
                <TaskConsumer>
                    {(value) => {
                        return (<button id="updateApply" className="apply-update" onClick={() => this.handleApply(value.updateTask)}>
                                    Apply
                                </button>)
                    }}
                </TaskConsumer>
            </div>
        )
    }
}
