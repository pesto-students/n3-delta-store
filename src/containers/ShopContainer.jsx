import { Card, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getProducts } from '../main/axios/commerce';
import Filter from '../components/filters'
import _ from 'lodash';
import { useParams } from 'react-router-dom';

const ShopContainer = (props) => {
    let params = useParams("categories");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({});

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
                }
            )
        }
    })


    const useStyles = makeStyles((theme) => {
        const cardWidth = 240;
        return ({
            cardWidth: {
                maxWidth: cardWidth,
                width: cardWidth,
                '&:hover': {
                    boxShadow: theme.shadows[18]
                },
            },
            root: {
                minHeight: "90vh",
                display: "flex",
                flex: 1,
            },
            media: {
                textAlign: 'center'
            }, img: {
                ...theme.img,
                height: '200px'
            },

            producName: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }, gridList: {
                margin: theme.spacing(2)
            }


        })
    })
    const classes = useStyles();
    const productsList = filteredProducts && filteredProducts.length ? filteredProducts : products;
    return (
        <>
            <div className={classes.root}>
                <Filter updateFilter={updateFilter} filters={filters}></Filter>
                <main className={classes.main}>
                    <Grid container>
                        {productsList.map((product) => (
                            <Grid key={product.id} item className={classes.gridList} >
                                <Card className={classes.cardWidth}>

                                    <CardMedia
                                        className={classes.media}
                                    >
                                        <img className={classes.img} src={product.media.source} alt={classes.media} />
                                    </CardMedia>
                                    <CardContent >
                                        <Typography className={classes.producName} variant="subtitle2" >
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