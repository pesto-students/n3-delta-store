import { Card, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getProducts } from '../main/axios/commerce';
import Filter from '../components/filters'
import _ from 'lodash';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoader } from '../main/store/actions/LoadingActions';
import { Skeleton } from '@material-ui/lab';

const ShopContainer = (props) => {
    let params = useParams("categories");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();


    const getFilteredProducts = (productsData, checkedCategories) => {
        return _.compact(_.map(productsData, (prod) => {
            if (prod.categories && prod.categories.length) {

                if (_.compact(_.map(prod.categories, (selectedCat) => {

                    if (_.find(checkedCategories, (checkedCategory) => {
                        return checkedCategory.id === selectedCat.id;
                    })) {
                        return selectedCat;
                    }

                })).length) {
                    return prod;
                }
            }
        }))
    }
    const getCheckedCategories = (filterObj) => {
        return _.compact(_.map(filterObj.categories, (categoryFilter) => categoryFilter.checked === true ? categoryFilter : null))
    }
    const updateFilter = (filterObj) => {
        setFilters(_.cloneDeep(filterObj))
        const checkedCategories = getCheckedCategories(filterObj)

        if (checkedCategories && checkedCategories.length) {
            setFilteredProducts(getFilteredProducts(products, checkedCategories))
        } else {
            setFilteredProducts(products)
        }
    }

    useEffect(() => {
        if (!(products && products.length)) {
            dispatch(setLoader(true));
            getProducts().then(
                res => {
                    setProducts(res.data)
                    const categories = _.uniqBy(_.flattenDeep(res.data.map((product) => product.categories)), 'id')
                    _.each(categories, (category) => {
                        if (params && params.categories) {
                            if (_.lowerCase(category.slug) === _.lowerCase(params.categories)) {
                                category.checked = true;
                            }
                        }
                    })
                    setFilters({ categories })
                    setFilteredProducts(getFilteredProducts(res.data, getCheckedCategories({ categories })))
                    dispatch(setLoader(false));
                }
            )
        }
    })


    const useStyles = makeStyles((theme) => {
        const cardWidth = 240;
        const cardHeight = 290;
        return ({
            cardWidth: {
                maxWidth: cardWidth,
                width: cardWidth,
                height: cardHeight,
                boxShadow: 'none',
                '&:hover': {
                    boxShadow: theme.shadows[18]
                },
            },
            root: {
                ...theme.page,
                marginTop: theme.spacing(8),
                marginBottom: 0,
                [theme.breakpoints.up("sm")]: {
                    display: "flex",
                    flex: 1,
                },
            },
            media: {
                textAlign: 'center'
            }, img: {
                ...theme.img,
                width: '150px',
                height: '200px'
            },

            producName: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }, gridList: {
                margin: theme.spacing(1),
            }, gridContainer: {
                [theme.breakpoints.down("md")]: {
                    justifyContent: "center"
                }

            }


        })
    })
    const classes = useStyles();
    const productsList = filteredProducts && filteredProducts.length ? filteredProducts : products;
    return !(productsList && productsList.length) ? (<>
        <div className={classes.root}>
            <Filter updateFilter={updateFilter} filters={filters}></Filter>
            <main>

                <Grid container className={classes.gridContainer}>
                    {_.times(8, _.constant(0)).map((product, key) => (
                        <Grid key={key} item className={classes.gridList} >
                            <Card className={classes.cardWidth}>
                                <Skeleton variant="rect" className={classes.cardWidth} />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </main>
        </div></>) : (
        <>
            <div className={classes.root}>
                <Filter updateFilter={updateFilter} filters={filters}></Filter>
                <main>
                    <Grid container className={classes.gridContainer}>
                        {productsList.map((product) => (
                            <Grid key={product.id} onClick={() => history.push(`/shop/product/${product.id}`)} item className={classes.gridList} >
                                <Card className={classes.cardWidth}>

                                    <CardMedia
                                        className={classes.media}
                                    >
                                        <img className={classes.img} src={product.media.source} alt={classes.media} />
                                    </CardMedia>
                                    <CardContent >
                                        <Typography className={classes.producName} variant="h5" >
                                            {product.name}
                                        </Typography>
                                        <Typography className={classes.producName} variant="h6" >
                                            {product.price.formatted_with_symbol}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </main>
            </div>
        </>
    )
}
export default ShopContainer;