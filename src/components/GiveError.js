import React from 'react';
import {TaskConsumer} from '../context';
import LoginError from './LoginError';

export default function GiveError ({error_type}) {
    return (
            <TaskConsumer>
              {
                (value) => {
                  console.log(value.loginError);
                  if (value.loginError) {
                    return ((error_type === 'login') ? <LoginError error_type="login" /> : <LoginError error_type="signup" />)
                  }
                  else {
                    return <h1></h1>
                  }
                }
              }
            </TaskConsumer>
          )
  }