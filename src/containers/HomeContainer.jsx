import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Paper, CardMedia, Divider, Grid, makeStyles, Container, Typography, TextField, Button, Card, CardContent, Link } from '@material-ui/core'
import { getCategories } from '../main/axios/commerce';
import { translate } from '../resources/language/translate';
import { Phone, MailOutline, LocationCityOutlined } from '@material-ui/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useHistory } from 'react-router-dom';
import { setHomeCategories } from '../main/store/actions/HomeActions';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../main/store/actions/LoadingActions';
import _ from 'lodash';

const Home = (props) => {
    const useStyles = makeStyles((theme) => {
        return ({
            page: {
                ...theme.page,
                marginTop: theme.spacing(8)
            },
            paper: {
                ...theme.typography.h5,
                textAlign: 'center',
                color: theme.palette.text.secondary,
                boxShadow: theme.shadows[3],
                '&:hover': {
                    boxShadow: theme.shadows[18]
                },
            },
            root: {
                marginTop: theme.spacing(5),
                marginBottom: 0
            },
            cardItem: {
                padding: theme.spacing(5),
                [theme.breakpoints.down("sm")]: {
                    padding: theme.spacing(2)
                },
            },
            cardIFootertem: {
                padding: theme.spacing(1)
            },
            cardContent: {
                height: "100%"
            },
            img: {
                ...theme.img,
                borderBottomRightRadius: "50px"
            },
            textField: {
                width: '100%',
                marginTop: theme.spacing(3),
                marginBottom: theme.spacing(2),
            }
        })
    });

    const classes = useStyles();
    const homeState = useSelector((state) => state?.homeReducer)
    const { categories } = homeState;
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!(categories && categories.length)) {
            dispatch(setLoader(true))
            getCategories().then(
                res => { dispatch(setLoader(false)); return dispatch(setHomeCategories(res.data)) }
            )
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const categoriesList = categories && categories.length ? categories : _.times(4, _.constant({}))
    return (
        <main className={classes.page}>
            <section>
                <Carousel
                    infiniteLoop={true}
                    showStatus={false}
                    centerMode={true}
                    autoPlay={true}
                    showThumbs={false} >
                    <div>
                        <img alt="Discount" src="https://res.cloudinary.com/dwclofpev/image/upload/v1624298910/samples/ecommerce/oie_2120324lgcHQ4Z7_qlia85.jpg" />

                    </div>
                    <div>
                        <img alt="Payment" src="https://res.cloudinary.com/dwclofpev/image/upload/v1624298910/samples/ecommerce/oie_2120723FKM6U6QZ_hoc7wd.jpg" />

                    </div>
                </Carousel>
            </section>
            <Container>

                <Divider />

                <section className={classes.root}>
                    <Typography variant="h3" align="center" >{translate('Categories')}</Typography>
                    <Grid container >
                        {categoriesList.map((category, i) => (
                            <Grid key={i} className={classes.cardItem} item xs={12} sm={12} md={6} lg={6}>
                                <Grid style={{ margin: 'auto' }} item xs={12} >
                                    <Paper onClick={() => { history.push(`/shop/${category.slug}`) }} className={classes.paper}>
                                        <CardMedia>
                                            <img className={classes.img} alt={category.slug ? `alt-${category.slug}` : ""} src={category.description} />
                                        </CardMedia>
                                        <Typography variant="h4">{translate(category.name)}</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>))}
                    </Grid>

                </section>

                <Divider />

                <section className={classes.footerColor}>
                    <Container >
                        <Grid layout={'row'} container>
                            <Grid className={classes.cardIFootertem} item xs={12} md={6} >
                                <Card className={classes.cardContent}>
                                    <CardContent>
                                        <Typography variant="h4" gutterBottom>
                                            {translate('Contact Us')}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            {translate('Need a hand? Or a high five?')}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            {translate("Here's how to reach us.")}
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            <Link href="tel:9619207440" onClick={(e) => e.preventDefault()}>
                                                <Phone fontSize="small" /> 9619207440
                                            </Link>
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
                    </Container>
                </section>
            </Container>
        </main >
    )
}

export default Home;
