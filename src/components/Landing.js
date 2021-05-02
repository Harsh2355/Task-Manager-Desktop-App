import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './styles/Landing.css';
import Grid from '@material-ui/core/Grid';
import LandingCard from './LandingCard';
import {TaskConsumer} from '../context';

export default class Landing extends Component {

    state = {
        newUser : false,
    }
    
    render() {
        return (
            <div className = "container-main">
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={11} sm={10} md={9} lg={9}>
                       <TaskConsumer>
                       {
                         (value) => {
                            return <LandingCard />
                         }
                       }
                       </TaskConsumer>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
