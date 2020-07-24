import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import {CardContent, CardActions} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';
import auth from './auth-helper.js';
import {signin} from './api-auth.js';


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


class Signin extends Component {
    state = {
        password: '',
        email: '',
        error: '',
        redirectToReferrer: false
    }

    handleChange = state_var => event => {
        this.setState({[state_var]: event.target.value});
    }

    clickSubmit = () => {
        const user = {
            email: this.state.email || undefined,
            password: this.state.password || undefined
        };
        signin(user).then((data) => {
            if (data.error) {
                this.setState({error: data.error});
            }
            else {
                auth.authenticate(data, () => {
                    this.setState({redirectToReferrer: true});
                });
            }
        });
    }

    render() {
        const {classes} = this.props;

        const {from} = this.props.location.state || {
            from: {
                pathname: '/'
            }
        }

        const {redirectToReferrer} = this.state;
        if (redirectToReferrer) {
            return (<Redirect to={from} />);
        }

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography type="headline" component="h1" className={classes.title}>                        
                        Sign In
                    </Typography>
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
        );
    }
}

Signin.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles (styles) (Signin);
