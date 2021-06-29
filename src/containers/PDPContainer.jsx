import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getProduct } from '../main/axios/commerce';
import Error from '../components/Error';
import _ from 'lodash';
import { Button, CardMedia, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { ShoppingCart } from '@material-ui/icons';
import SizeSelector from '../components/SizeSelector';
import ColorSelector from '../components/ColorSelector';
import { useDispatch } from 'react-redux';
import { setLoader } from '../main/store/actions/LoadingActions';

const PDPContainer = props => {
    const { id } = useParams();
    const [product, setProduct] = useState({})
    const [isError, setError] = useState(false)
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const dispatch = useDispatch();

    const useStyles = makeStyles((theme) => {
        return ({
            root: {
                flexGrow: 1,
                marginTop: theme.spacing(5)
            },
            gridList: {
                padding: theme.spacing(6)
            }, gridPadding: {
                padding: theme.spacing(2)
            }, img: {
                ...theme.img,
                boxShadow: theme.shadows[3]
            }, cartButton: {
                paddingTop: theme.spacing(2)
            }
        })

    })
    const classes = useStyles();

    useEffect(() => {
        console.log(product);
        if (!product || _.isEmpty(product)) {
            dispatch(setLoader(true))
            getProduct(id).then((productData) => {
                dispatch(setLoader(false))
                setProduct(productData)
            }).catch((err) => {
                setError(true);
                console.log(err)
            });
        } else if (product && id !== product.id) {

            dispatch(setLoader(true))
            getProduct(id).then((productData) => {
                dispatch(setLoader(false))
                setProduct(productData)
            }).catch((err) => {
                setError(true);
                console.log(err)
            });
        }
    }, [product, id])
    if (isError) {
        return (
            <main>
                <Error />
            </main>
        )
    }
    if (_.isEmpty(product)) {
        return (<Paper>
            <Skeleton variant="rect" width={210} height={'50%'} />
        </Paper>)
    }

    const handleChange = (event) => {
        setSize(event.target.value);
    };

    return (
        <main className={classes.root}>
            <Grid container className={classes.gridList}>
                <Grid key={product.id} xs={5} item className={classes.gridPadding}>
                    <CardMedia
                        className={classes.media}
                    >
                        <img className={classes.img} src={product.media.source} alt={classes.media} />
                    </CardMedia>
                </Grid>
                <Grid xs={6} item className={classes.gridPadding}>
                    <Typography variant="h3">
                        {product.name}
                    </Typography>
                    <Typography variant="subtitle2">
                        <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    </Typography>
                    <Typography variant="h5" className={classes.gridPadding}>
                        {product.price.formatted_with_symbol}
                    </Typography>

                    <SizeSelector product={product}
                        handleChange={handleChange}
                        size={size} />

                    <ColorSelector product={product} setColor={setColor} color={color} ></ColorSelector>
                    <div className={classes.cartButton}>
                        <Button size="large" fullWidth variant="contained" color="secondary"><FavoriteIcon /> Add to Wishlist</Button>
                        <Button size="large" fullWidth variant="contained" color="primary"><ShoppingCart /> Add to Cart</Button>
                    </div>
                </Grid>
            </Grid>


        </main>
    )
}

PDPContainer.propTypes = {
    id: PropTypes.string
}

export default PDPContainer
