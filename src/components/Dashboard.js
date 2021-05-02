import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './styles/Dashboard.css';
import {TaskConsumer} from '../context';
import Appbar from '../components/Dashboard components/Appbar';
import ViewTasks from './Dashboard components/ViewTasks';
import CreateTasks from './Dashboard components/CreateTasks';

export default class Dashboard extends Component {
 
    render() {
        return (
            <div >
                {/* Appbar displays irrespective */}
                <Appbar />

                <TaskConsumer>
                    {
                        (value) => {
                            const currentSelected = value.currentSelected;
                            // currentSelected is the option selected in the menu
                            if (currentSelected == 'View') {
                                return <div className="tasks-container"><ViewTasks /></div>       
                            }
                            else if (currentSelected == 'Create') {
                                return <div className="create-tasks-container"><CreateTasks /></div>
                            }
                        }
                    }
                </TaskConsumer>

            </div>
        )
    }
}
