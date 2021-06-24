import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, CardMedia, Divider, Grid, makeStyles, Container, Typography, TextField, Button, Card, CardContent, Link } from '@material-ui/core'
import { getCategories } from '../main/axios/commerce';
import { translate } from '../resources/language/translate';
import { Phone, MailOutline, LocationCityOutlined } from '@material-ui/icons';


const Home = (props) => {
    const useStyles = makeStyles((theme) => {
        console.log(theme); return ({
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
                marginTop: theme.spacing(10),
                marginBottom: 0
            },
            card: {
                padding: '1vh',
            },
            cardItem: {
                padding: theme.spacing(5)
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
            },
            footerColor: {
                background: 'rgb(133, 143, 195)',
                background: 'radial - gradient(circle, rgba(133, 143, 195, 1) 0 %, rgba(252, 70, 107, 0.22172619047619047) 100 %)'

            }
        })
    });

    const classes = useStyles();
    const [categories, setCategories] = useState([])

    useEffect(() => {
        if (!(categories && categories.length)) {
            getCategories().then(
                res => { return setCategories(res.data) }
            )
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    var items = [
        {
            img: 'https://res.cloudinary.com/dwclofpev/image/upload/v1624298910/samples/ecommerce/oie_2120324lgcHQ4Z7_qlia85.jpg'
        },
        {
            img: 'https://res.cloudinary.com/dwclofpev/image/upload/v1624298910/samples/ecommerce/oie_2120723FKM6U6QZ_hoc7wd.jpg'
        }
    ]
    return (
        <main>
            <section>
                <Carousel
                    autoPlay={true}
                    timeout={100}
                    changeOnFirstRender={true}
                    animation="slide"
                    navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                        style: {
                            borderRadius: 10,
                        }
                    }}
                >
                    {
                        items.map((item, i) => (<Paper key={i}>
                            <CardMedia component="img"
                                src={item.img} />
                        </Paper>))
                    }
                </Carousel>
            </section>

            <Divider />

            <section className={classes.root}>
                <Grid container className={classes.card}>
                    {categories.map((category, i) => (
                        <Grid key={category.id} className={classes.cardItem} item xs={12} sm={12} md={6} lg={6}>
                            <Grid style={{ margin: 'auto' }} item xs={12} >
                                <Paper className={classes.paper}>
                                    <CardMedia>
                                        <img className={classes.img} alt={translate(category.name)} src={category.description} />
                                    </CardMedia>
                                    <Typography variant="h4">{translate(category.name)}</Typography>
                                </Paper>
                            </Grid>
                        </Grid>))}
                </Grid>

            </section>

            <Divider />

            <section className={classes.footerColor}>
                <Container className={classes.card}>
                    <Grid layout={'row'} container>
                        <Grid className={classes.cardIFootertem} item xs={12} md={6} >
                            <Card className={classes.cardContent}>
                                <CardContent>
                                    <Typography variant="h4" component="h2" gutterBottom>
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
                                        <Typography variant="h4" component="h2" gutterBottom>
                                            {translate('Receive offers')}
                                        </Typography>
                                        <Typography variant="h6">
                                            {translate('Taste the holidays of the everyday close to home.')}
                                        </Typography>
                                        <TextField type="email" required={true} className={classes.textField} placeholder={translate("Your email")} />
                                        <Button type="submit" color="primary" variant="contained" fullWidth={true}>
                                            {translate('Keep me updated')}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </main >
    )
}

export default Home;
