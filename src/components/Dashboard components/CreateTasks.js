import React, { Component } from 'react'
import '../styles/CreateTasks.css'
import {TaskConsumer} from '../../context'

export default class CreateTasks extends Component {
    state = {
        is_created: false,
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
            return;
        }
        else {
            await f(data)
            this.setState({
                is_created: true,
            })
        }
    }

    return_to_new_task = () => {
        this.setState({
            is_created: false,
        })
    }

    render() {
        if (this.state.is_created) {
            return <div className="create-task-container">
               <h3 className="done">DONE!</h3>
               <button className="apply new-task-btn" onClick={this.return_to_new_task}>
                   Create New Task
               </button>
            </div>
        }
        return (
            <div>
                <div className="create-task-container">
                    <h6>
                        Create New Task    
                    </h6>    
                    <div className="partition"></div>
                    <div className="task-form">
                        <div className="desc">
                            <p>Describe the task...</p>
                            <input type="text" name="description" placeholder="Task Description" onChange={this.handleChange} />
                        </div>
                        <div className="comp">
                            <p>Has is it been completed ?</p>
                            <div>
                                <input type="radio" name="completed" value="true" onChange={this.handleChange} /><span>Completed</span>
                                <input type="radio" name="completed" value="false" onChange={this.handleChange} /><span>Not Completed</span>
                            </div>
                        </div>
                        <TaskConsumer>
                            {(value) => {
                                return (
                                    <button className="apply create-btn" onClick={() => this.handleApply(value.createTask)}>
                                        Create
                                    </button>
                                )
                            }}
                        </TaskConsumer>
                    </div>
                </div>
            </div>
        )
    }
}
