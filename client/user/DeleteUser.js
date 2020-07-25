import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {DialogActions, DialogContent} from '@material-ui/core';
import {DialogContentText, DialogTitle} from '@material-ui/core';
import {remove} from './api-user.js';
import auth from './../auth/auth-helper';
import {Redirect, Link} from 'react-router-dom';


class DeleteUser extends Component {
    state = {
        redirect: false,
        open: false
    }

    handleClick = () => {
        this.setState({open: true});
    }

    deleteAccount = () => {
        const jwt = auth.isAuthenticated();
        remove(
            {userId: this.props.userId},
            {t: jwt.token}
         ).then((data) => {
             if (data.error) {
                 console.log(data.error);
             }
             else {
                 auth.signout(() => console.log("Account Deleted!"))
                 this.setState({redirect: true});
             }
        });
    }

    handleClose = () => {
        this.setState({open: false});
    }

    render() {
        const redirect = this.state.redirect;
        if (redirect) {
            return (<Redirect to="/" />);
        }

        return (
            <span>
                <IconButton aria-label="Delete" onClick={this.handleClick} color="secondary">
                    <DeleteIcon />
                </IconButton>

                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>
                        {"Delete Account"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Confirm to delete your account.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" variant="contained">
                            Cancel
                        </Button>
                        <Button onClick={this.deleteAccount} color="secondary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </span>
        );
    }
}

DeleteUser.propTypes = {
    userId: PropTypes.string.isRequired
}

export default DeleteUser;
