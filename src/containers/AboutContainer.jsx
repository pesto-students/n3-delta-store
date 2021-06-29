import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const About = (props) => {
    const useStyles = makeStyles((theme) => ({
        page: {
            ...theme.page,
            marginTop: theme.spacing(8)
        }
    }))
    const classes = useStyles();
    return (
        <main>
            <Container maxWidth={'md'} className={classes.page}>
                <Typography align="center" variant="h2">Welcome to Delta Store!</Typography>
                <Typography align="center" variant="h6">
                    We are Delta Store, a small but motivated company specializing in New Arrivals. We believe passionately in great bargains and excellent service, which is why we commit ourselves to giving you the best of both.

                    If you’re looking for something new, you’re in the right place. We strive to be industrious and innovative, offering our customers something they want, putting their desires at the top of our priority list.


                </Typography>

            </Container>

        </main>
    )
}

export default About;