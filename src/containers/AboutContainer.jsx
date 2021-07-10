import { Container, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import AppLogo from "../resources/images/Delta Store.png";

const About = (props) => {
    const useStyles = makeStyles((theme) => ({
        page: {
            [theme.breakpoints.up("sm")]: {
                ...theme.page,
            },
            marginTop: theme.spacing(8)
        }, paper: {
            [theme.breakpoints.up("sm")]: {

                padding: theme.spacing(2),
                position: 'absolute',
                top: '50%',
                left: '50%',
                '-ms-transform': 'translateX(-50%) translateY(-50%)',
                '-webkit-transform': 'translate(-50%, -50%)',
                transform: 'translate(-50%, -50%)',
            }
        }
    }))
    const classes = useStyles();
    return (
        <main>
            <Container maxWidth={'md'} className={classes.page}>
                <Paper className={classes.paper}>
                    <Container align="center">
                        <img src={AppLogo} alt="app-logo" className={classes.logo} />
                    </Container>
                    <Typography align="center" color="primary" variant="h2" gutterBottom>About Delta Store</Typography>
                    <Typography align="center" color="secondary" variant="h6" gutterBottom>
                        We are small but motivated company specializing in New Arrivals. We believe passionately in great bargains and excellent service, which is why we commit ourselves to giving you the best of both.
                        If you’re looking for something new, you’re in the right place. We strive to be industrious and innovative, offering our customers something they want, putting their desires at the top of our priority list.
                    </Typography>
                </Paper>
            </Container>
        </main>
    )
}

export default About;