import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './core/Home';
import Users from './user/Users';
import Signup from './user/Signup';
import Profile from './user/Profile';
import Signin from './auth/Signin';


class MainRouter extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/signin" component={Signin} />
                    <Route exact path="/user/:userId" component={Profile} />
                </Switch>
            </div>
        )
    }
}

export default MainRouter;
