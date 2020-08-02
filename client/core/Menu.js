import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import auth from './../auth/auth-helper';
import {Link, withRouter} from 'react-router-dom';


const isCurrent = (history, path) => {
    if (history.location.pathname == path) {
        return {color: '#ff4081'};
    }
    else {
         return {color: '#ffffff'};
    }
};

const Menu = withRouter(({history}) => (
    <AppBar position="static">
        <Toolbar>
            <Typography type="title" color="inherit">
                Project Skeleton
            </Typography>
            <Link to="/">
                <IconButton aria-label="Home" style={isCurrent(history, "/")}>
                    <HomeIcon />
                </IconButton>
            </Link>
           <Link to="/users">
               <Button style={isCurrent(history, "/users")}>Users</Button>
           </Link>
           {
               !auth.isAuthenticated() && (<span>
                   <Link to="/signup">
                       <Button style={isCurrent(history, "/signup")}>Sign Up</Button>
                   </Link>
                   <Link to="/signin">
                       <Button style={isCurrent(history, "/signin")}>Sign In</Button>
                   </Link>
               </span>)
            }
            {
                auth.isAuthenticated() && (<span>
                    <Link to={"/user/" + auth.isAuthenticated().user._id}>
                       <Button style={isCurrent(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
                   </Link>
                   <Button color="inherit" onClick={() => {
                       auth.signout(() => history.push('/'))
                   }}>
                       Sign Out
                   </Button>
                </span>)
            }
        </Toolbar>
    </AppBar>
))

export default Menu;
