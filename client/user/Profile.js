import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Person from '@material-ui/icons/Person';
import {Redirect} from 'react-router-dom';
import auth from './auth-helper.js';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5),
    }),
    title: {
        margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
        color: theme.palette.backgroundTitle
    }
});

class Profile extends Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps = (props) => {

    }
    componentDidMount() {

    }
    render() {

    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles (styles) (Profile);
