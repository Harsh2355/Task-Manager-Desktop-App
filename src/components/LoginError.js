import React from 'react'
import './styles/Login.css'

export default function LoginError({error_type}) {
    if (error_type == 'login') {
        return ( 
            <div className="alert alert-danger" role="alert">
                <h6>Incorrect Email Address or Password</h6>
            </div>
        )
    }
    else {
        return (
            <div className="alert alert-danger" role="alert">
                <h6>Please check all the fields follow the required instructions</h6>
            </div>
        )
    }
}
