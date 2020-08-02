import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './core/Home';
import Users from './user/Users';
import Signup from './user/Signup';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile';
import Signin from './auth/Signin';
import PrivateRoute from './auth/PrivateRoute';
import Menu from './core/Menu';


class MainRouter extends Component {

    componentDidMount() {
        const jss_styles = document.getElementById('jss-server-side');
        if (jss_styles && jss_styles.parentNode) {
            jss_styles.parentNode.removeChild(jss_styles);
        }
    }

    render() {
        return (
            <div>
                <Menu />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/signin" component={Signin} />
                    <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
                    <PrivateRoute exact path="/user/:userId" component={Profile} />
                </Switch>
            </div>
        )
    }
}

export default MainRouter;
