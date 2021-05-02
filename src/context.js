import React, {Component} from 'react';
import axios from 'axios';

const TaskContext = React.createContext();

export default class TaskProvider extends Component {
    
    // global state
    state = {
        isLoggedin : false,
        currentToken: '',
        newUser : false,
        loginError: false,
        currentSelected: 'View',
        filter_options: {},
        user: {},
        data : [],
    }
    
    // getUser() uses axios to request the user info from the backend api.
    // requires: user is logged in
    // effects: non-blocking I/O
    //          mutates state 
    getUser = async () => {
        try {
            const response = await axios({
                url:`${process.env.REACT_APP_URL}/users/me`,
                method:'get',
                headers: {
                    'Authorization': `Bearer ${this.state.currentToken}`,
                }
            })
            this.setState({
                user: response.data,
            })
            this.getTasks();
        }
        catch (error) {
            console.log('Encountered an error while requesting user information.')
        }
    }
    
    // updateUser(update_data) updates the user data in the database by
    //   by using axios to communicate with backend api. 
    // requires: user is logged in
    // effects: non-blocking I/O
    //          mutates state 
    updateUser = async (update_data) => {
        try {
            console.log(update_data)
            const data = await axios({
                url:`${process.env.REACT_APP_URL}/users/me`,
                method:'patch',
                headers: {
                    'Authorization': `Bearer ${this.state.currentToken}`,
                },
                data: {
                    ...update_data
                },
            })
            await this.getUser();
        }
        catch (err) {
            console.log('Encountered an error while updating user information.')
        }
    }
    
    // toggleNewUser() sets the newUser and loginError properties in 
    //   state to false if user is new.
    // effects: mutates state 
    toggleNewUser = () => {
        if(this.state.newUser) {
            this.setState({
                newUser: false,
                loginError: false,
            })
        }
        else {
            this.setState({
                newUser: true,
                loginError: false,
            })
        }
    }
 
    // toggleLoginError(status, token) sets the login status, auth_token, 
    //   login_error based on the status.
    // effects: mutates state
    toggleLoginError = (status, token) => {
        if (status === 200 || status === 201) {
            this.setState({
                isLoggedin: true,
                currentToken: token,
                loginError: false,
            })
        }
        else {
            this.setState({
                isLoggedin: false,
                currentToken: '',
                loginError: true,
            })
        }
    }

    // login(body) logs in the user in the database using axios to
    //   communicate with the backend api.
    // Note: If login fails login error is displayed.
    // requires: body is valid (object having fields username and password)
    // effects: non-blocking I/O
    //          mutates state  
    login = async (body) => {
        try {
            const response = await axios({
                url:`${process.env.REACT_APP_URL}/users/login`,
                method:'post',
                data: {
                    "email": body.email,
                    "password": body.password, 
                },
            })
            this.toggleLoginError(response.status, response.data.token)
            await this.getUser();
            return true;
        }
        catch (error) {
            this.toggleLoginError();
            console.log('Encountered an error while logging in.')
            return false;
        } 
    } 
    
    // signup(body) signs up a new user in the database using axios to
    //   communicate with the backend api.
    // Note: If signup fails signup error is displayed.
    // requires: body is valid (object having fields name, age, 
    //           username and password)
    // effects: non-blocking I/O
    //          mutates state
    signup = async (body) => {
        try {
            const response = await axios({
                url:`${process.env.REACT_APP_URL}/users`,
                method:'post',
                data: {
                    "name": body.name,
                    "age": body.age,
                    "email": body.email,
                    "password": body.password,
                },
            })
            this.toggleLoginError(response.status, response.data.token)
            await this.getUser();
            return true;
        }
        catch (error) {
            this.toggleLoginError();
            console.log('Encountered an error while signing up.')
            return false;
        } 
    }
    
    // logout() logs out the user in the database using axios to
    //   communicate with the backend api.
    // requires: user is logged in
    // effects: non-blocking I/O
    //          mutates state 
    logout = async () => {
        try {
            const response = await axios({
                url:`${process.env.REACT_APP_URL}/users/logout`,
                method:'post',
                headers: {
                    'Authorization': `Bearer ${this.state.currentToken}`,
                }
            })
            console.log(response);
            this.setState({
                isLoggedin : false,
                currentToken: '',
                newUser : false,
                loginError: false,
                currentSelected: 'View',
                user: {},
                filter_options: {},
                data: [],
            })
        }
        catch (error) {
            console.log('Encountered an error while logging out.')
        } 
    }
    
    // filterResult(filterSettings) set the value of filter_options in the
    //   state to filterSettings.
    // effects: mutates state
    filterResult = (filterSettings) => {
        const {limit, skip, completed, sortby} = filterSettings;
        const filter = {}
        if (limit !== "") {
            filter.limit = limit
        }
        if (skip !== "") {
            filter.skip = skip
        }
        if (completed !== "") {
            filter.completed = completed
        }
        if (sortby !== "") {
           filter.sortby = sortby
        }
        this.setState({
            filter_options: {
                ...filter,
            },
        })
    }
    
    // navigateMenu(selected) changes the value of currentSelected in the
    //   state to selected.
    // effects: mutates state
    navigateMenu = (selected) => {
        this.setState({
            currentSelected: selected,
        })
    }
    
    // getTasks() procures the tasks created by the logged in user from the
    // database using axios to communicate with the backend api.
    // Note: api call is different if !state.filter_options.completed
    // requires: user is logged in 
    // effects: non-blocking I/O
    //          mutates state
    getTasks = async () => {
        try {
            const {limit, skip, completed, sortby} = this.state.filter_options;
            let tasks;
            console.log('Hello', completed)
            if (completed !== undefined) {
                tasks = await axios({
                    url: `${process.env.REACT_APP_URL}/tasks?limit=${limit}&skip=${skip}&completed=${completed}&sortBy=createdAt_${sortby}`,
                    method:'get',
                    headers: {
                        'Authorization': `Bearer ${this.state.currentToken}`,
                    }
                })
            }
            else {
                tasks = await axios({
                    url: `${process.env.REACT_APP_URL}/tasks?limit=${limit}&skip=${skip}&sortBy=createdAt_${sortby}`,
                    method:'get',
                    headers: {
                        'Authorization': `Bearer ${this.state.currentToken}`,
                    }
                })
            }
            this.setState({
                data: tasks.data,
            })
        }
        catch (err) {
            console.log('Encountered an error while procuring tasks.')
        }
    }

    // deleteTasks(id) deletes the task having id from the
    // database using axios to communicate with the backend api.
    // requires: user is logged in
    //           id is valid (belongs to a task)
    // effects: non-blocking I/O
    //          mutates state
    deleteTask = async (id) => {
        try {
            const data = await axios({
                url: `${process.env.REACT_APP_URL}/tasks/${id}`,
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${this.state.currentToken}`,
                }
            })
            await this.getTasks();
        }
        catch (err) {
            console.log('Encountered an error while deleting task.')
        }
    }
    
    // updateTask(id, task) updates the task having id in the
    // database using axios to communicate with the backend api.
    // requires: user is logged in
    //           id is valid (belongs to a task)
    //           task is valid (object having description and/or completed fields) 
    // effects: non-blocking I/O
    //          mutates state   
    updateTask = async (id, task) => {
        try {
            const data = await axios({
                url: `${process.env.REACT_APP_URL}/tasks/${id}`,
                method: 'patch',
                headers: {
                    'Authorization': `Bearer ${this.state.currentToken}`,
                },
                data: {
                    ...task,
                }
            })
            console.log(data);
            await this.getTasks()
        }
        catch (err) {
            console.log('Encountered an error while updating task')
        }
    }
    
    // deleteUser() deletes the logged in user from the
    // database using axios to communicate with the backend api.
    // requires: user is logged in 
    // effects: non-blocking I/O
    //          mutates state
    deleteUser = async () => {
        try {
            const data = await axios({
                url:`${process.env.REACT_APP_URL}/users/me`,
                method: "delete",
                headers: {
                    'Authorization': `Bearer ${this.state.currentToken}`,
                }
            })
            
            this.setState({
                isLoggedin : false,
                currentToken: '',
                newUser : false,
                loginError: false,
                currentSelected: 'View',
                user: {},
                filter_options: {},
                data: [],
            })
        }
        catch (err) {
            console.log('Encountered an error while deleting user account.')
        }
    }
    
    // createTask(task) creates a new task {...task} in the
    // database using axios to communicate with the backend api.
    // requires: user is logged in
    //           task is valid (object having description and/or completed fields)
    // effects: non-blocking I/O
    //          mutates state
    createTask = async (task) => {
        try {
            const data = await axios ({
                url: `${process.env.REACT_APP_URL}/tasks`,
                method: "post",
                headers: {
                    'Authorization': `Bearer ${this.state.currentToken}`,
                },
                data: {
                    ...task,
                }
            })
            
            await this.getTasks();
        }
        catch (err) {
            console.log('Encountered an error while creating task.')
        }
    }

    render() {
        return (
            <TaskContext.Provider value = {{
                ...this.state,
                toggleNewUser: this.toggleNewUser,
                getUser: this.getUser,
                login: this.login,
                signup: this.signup,
                logout: this.logout,
                navigateMenu: this.navigateMenu,
                filterResult: this.filterResult,
                getTasks: this.getTasks,
                updateUser: this.updateUser,
                deleteTask: this.deleteTask,
                updateTask: this.updateTask,
                deleteUser: this.deleteUser,
                createTask: this.createTask,
            }}>
                {this.props.children}
            </TaskContext.Provider>
        )
    }
}

const TaskConsumer = TaskContext.Consumer;

export {TaskProvider, TaskConsumer}