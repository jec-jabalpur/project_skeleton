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
import auth from './../auth/auth-helper.js';
import {read, update} from './api-user.js';


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


class EditProfile extends Component {

    constructor({match}) {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            redirectToProfile: false,
            error: ''
        }
        this.match = match;
    }

    componentDidMount = () => {
        const jwt = auth.isAuthenticated();
        read(
            {userId: this.match.params.userId},
            {t: jwt.token}
         ).then((data) => {
             if (data.error) {
                 this.setState({error: data.error});
             }
             else {
                 this.setState({name: data.name, email: data.email});
             }
         });
    }

    clickSubmit = () => {
        const jwt = auth.isAuthenticated();
        const user = {
            name: this.state.name || undefined,
            email: this.state.email || undefined,
            password: this.state.password || undefined
        };
        update(
            {userId: this.match.params.userId},
            {t: jwt.token},
             user
        ).then((data) => {
            if (data.error) {
                this.setState({error: data.error});
            }
            else {
                this.setState({userId: data._id, redirectToProfile: true});
            }
        });
    }

    handleChange = state_var => event => {
        this.setState({[state_var]: event.target.value})
    }

    render() {
        const {classes} = this.props;

        if (this.state.redirectToProfile) {
            return (<Redirect to={'/user/' + this.state.userId} />);
        }

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography type="headline" component="h2" className={classes.title}>                        
                        Edit Profile
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
        );
    }
}

EditProfile.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles (styles) (EditProfile);
