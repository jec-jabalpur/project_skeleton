import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Card, CardContent, CardMedia} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import baatein_home from './../assets/images/baatein_home.png';

const styles = theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        color: theme.palette.homeTitle,
        backgroundColor: theme.palette.backgroundTitle,
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`
    },
    media: {
        minHeight: 450,
        backgroundColor: theme.palette.mediaBackground
    },
    textMatter: {
        textAlign: "center",
        fontSize: "30px",
        color: theme.palette.homeTitle
    },
    content: {
        backgroundColor: theme.palette.contentBackground
    }
});

class Home extends Component {

    render() {

        const {classes} = this.props;

        return (
            <Card className={classes.card}>
                <Typography type="headline" component="h2" className={classes.title}>
                    Home Page
                </Typography>
                <CardMedia className={classes.media} image={baatein_home} title="Baatein Home">
                </CardMedia>
                <CardContent className={classes.content}>
                    <Typography type="body1" className={classes.textMatter} component="p">
                        बातें
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles) (Home);
