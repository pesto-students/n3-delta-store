import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Paper, CardMedia, Divider, Grid, makeStyles, Container, Typography } from '@material-ui/core'
import { getCategories } from '../main/axios/commerce';
import { translate } from '../resources/language/translate';
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
            sectionMargin: {
                marginTop: theme.spacing(2)
            },
            cardItem: {
                padding: theme.spacing(5),
                [theme.breakpoints.down("sm")]: {
                    padding: theme.spacing(2)
                },
            },

            img: {
                ...theme.img,
                borderBottomRightRadius: "50px"
            }

        })
    });

    const classes = useStyles();
    const homeState = useSelector((state) => state?.homeReducer);
    const loader = useSelector(state => state.loader.loading);
    const { categories } = homeState;
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!(categories && categories.length) && !loader) {
            dispatch(setLoader(true))
            getCategories().then(
                res => { dispatch(setHomeCategories(res.data)); dispatch(setLoader(false)); }
            )
        }
    }, [categories, dispatch, loader])


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
            <Divider className={classes.sectionMargin} />
            <Container component="section" >


                <section className={classes.root}>
                    <Typography variant="h3" align="center" >{translate('Categories')}</Typography>
                    <Grid container >
                        {categoriesList.map((category, i) => (
                            <Grid key={i} className={classes.cardItem} item xs={12} sm={12} md={6} lg={6}>
                                <Grid style={{ margin: 'auto' }} item xs={12} >
                                    <Paper tabIndex={0} onClick={() => { history.push(`/shop/${category.slug}`) }} className={classes.paper}>
                                        <CardMedia>
                                            <img className={classes.img} alt={category.slug ? `alt-${category.slug}` : ""} src={category.description} />
                                        </CardMedia>
                                        <Typography variant="h4">{translate(category.name)}</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>))}
                    </Grid>

                </section>


            </Container>

        </main >
    )
}

export default Home;
