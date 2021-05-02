import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TaskProvider from './context';
import {HashRouter as Router} from 'react-router-dom';

ReactDOM.render(
<TaskProvider>
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Router>
</TaskProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
