import React, {useState} from 'react'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import {TaskConsumer} from '../../context'
import UpdateIcon from '@material-ui/icons/Update'
import UpdateTask from './UpdateTask'

export default function Task({task, num}) {
    const [updateStatus, setUpdateStatus] = useState(false);
    
    let completed = '';
    if (task.completed) {
        completed = "Completed"
    }
    else {
        completed = "Not Completed"
    }

    if (updateStatus) {
        return <div className="TaskCard updateCard">
                    <div className="updateTask">
                        <UpdateTask task={task} toggle={setUpdateStatus} />
                    </div>
                </div>
    }
    else {
    return (
        <div className="TaskCard">
            <div className="TaskBlue">
                <div className="task-num">
                    Task {num}
                </div>
            </div>
            <div className="TaskWhite">
                <div className="task-desc">
                    <span style={{color:"#0460d7"}}>Description: </span>{task.description}
                </div>
                <div className="underline"></div>
                <div className="task-completion">
                    <span style={{color:"#0460d7"}}>Status:</span> {completed}
                </div>
                <TaskConsumer>
                    {(value) => {
                         return (
                            <div> 
                                <div className="delete_task" onClick={() =>  value.deleteTask(task._id)}>
                                    <DeleteForeverIcon />
                                </div>
                                <div className="update_task" onClick={() => setUpdateStatus(true)}>
                                    <UpdateIcon />                   
                                </div>
                            </div>
                         )
                    }}
                </TaskConsumer>
            </div>     
        </div>
    )
    }
}
