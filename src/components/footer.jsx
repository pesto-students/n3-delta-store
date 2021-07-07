import { Button, Link, TextField } from '@material-ui/core';
import { Card, CardContent, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { LocationCityOutlined, MailOutline} from '@material-ui/icons';
import React from 'react';
import { translate } from '../resources/language/translate';
import { getCurrentFullYear } from '../utils/util';

const Footer = (props) => {
    const useStyles = makeStyles((theme) => {
        return ({
            cardIFootertem: {
                padding: theme.spacing(1)
            },
            cardContent: {
                height: "100%"
            },textField: {
                width: '100%',
                marginTop: theme.spacing(3),
                marginBottom: theme.spacing(2),
            }
        })
    })
    const classes = useStyles();
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <footer >
            <Divider />


            <Grid layout={'row'} container>
                <Grid className={classes.cardIFootertem} item xs={12} md={6} >
                    <Card className={classes.cardContent}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                {translate('Contact Us')}
                            </Typography>
                            <Typography variant="subtitle1">
                                {translate('Need a hand? Or a high five?')}
                            </Typography>
                            <Typography variant="subtitle1">
                                {translate("Here's how to reach us.")}
                            </Typography>
                            
                            <Typography variant="subtitle1">
                                <Link href="mailto:mitesh.jethmalani@gmail.com" onClick={(e) => e.preventDefault()}>
                                    <MailOutline fontSize="small" /> mitesh.jethmalani@gmail.com
                                </Link>
                            </Typography>
                            <Typography variant="subtitle1">
                                <LocationCityOutlined /> Address:
                            </Typography>
                            <Typography variant="subtitle2">
                                Pesto Tech
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid className={classes.cardIFootertem} item xs={12} md={6} >
                    <Card className={classes.cardContent}>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Typography variant="h4" gutterBottom>
                                    {translate('Receive offers')}
                                </Typography>
                                <Typography variant="h6">
                                    {translate('Taste the holidays of the everyday close to home.')}
                                </Typography>
                                <TextField type="email" required={true} title="Your Email" className={classes.textField} placeholder={translate("Your email")} />
                                <Button type="submit" color="primary" aria-label={translate('Keep me updated')} variant="contained" fullWidth={true}>
                                    {translate('Keep me updated')}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


            <Typography align="center" >
                Copyright © {getCurrentFullYear()} template
            </Typography>
        </footer >
    );

}

export default Footer;
