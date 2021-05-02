import React from 'react';
import Task from './Task';
import '../styles/TaskList.css';

export default function TaskList({data}) {
    console.log(typeof data.data)
    let i = 0;
    const tasks = data.map((task) => {
        i += 1;
        return <Task task={task} num={i} key = {task._id} />
     })
    return <div className="taskdetails">{tasks}</div>;
}
