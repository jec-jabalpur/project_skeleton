import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import {CardContent, CardActions} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import {DialogActions, DialogContent} from '@material-ui/core';
import {DialogContentText, DialogTitle} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {create} from './api-user.js';


const styles = theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(2),
        color:theme.palette.backgroundTitle
    },
    textField: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
});


class Signup extends Component {
    state = {
        name: '',
        password: '',
        email: '',
        error: '',
        open: false
    }

    handleChange = state_var => event => {
        this.setState({[state_var]: event.target.value})
    }

    clickSubmit = () => {
        const user = {
            name: this.state.name || undefined,
            email: this.state.email || undefined,
            password: this.state.password || undefined
        };
        create(user).then((data) => {
            if (data.error) {
                this.setState({error: data.error});
            }
            else {
                this.setState({error: '', open: true});
            }
        });
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography type="headline" component="h1" className={classes.title}>                        
                            Sign Up
                        </Typography>
                        <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"></TextField> <br />
                        <TextField id="email" label="Email" type="email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="normal"></TextField> <br />
                        <TextField id="password" label="Password" type="password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal"></TextField> <br />
                        {
                            this.state.error && (
                                    <Typography component="p" color="error">
                                        <Icon color="error" className={classes.error}>error</Icon>
                                        {this.state.error}
                                    </Typography>
                                )
                        }
                    </CardContent>
                    <CardActions>
                        <Button color="primary" variant="contained" onClick={this.clickSubmit} className={classes.submit}>
                            Submit
                        </Button>
                    </CardActions>
                </Card>
                <Dialog open={this.state.open} disableBackdropClick>
                    <DialogTitle>Account Created</DialogTitle>
                    <DialogContent>
                    {
                        this.state.error === '' ?
                        (<DialogContentText>
                            Congrats! You have created a new account.
                        </DialogContentText>)
                        :
                        (<DialogContentText>
                            {this.state.error}
                        </DialogContentText>)
                    }
                    </DialogContent>
                    <DialogActions>
                        <Link to="/signin">
                            <Button color="primary" autoFocus="autoFocus" variant="contained">
                                Sign In
                            </Button>
                        </Link>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles (styles) (Signup);
