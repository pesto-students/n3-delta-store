import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getProduct } from '../main/axios/commerce';
import Error from '../components/Error';
import _ from 'lodash';
import { Box, Button, CardMedia, FormControl, Grid, makeStyles, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Brightness1SharpIcon from '@material-ui/icons/Brightness1Sharp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { ShoppingCart } from '@material-ui/icons';

const PDPContainer = props => {
    const { id } = useParams();
    const [product, setProduct] = useState({})
    const [isError, setError] = useState(false)
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [open, setOpen] = useState(false);

    const useStyles = makeStyles((theme) => {
        return ({
            root: {
                flexGrow: 1,
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
            }, selectedPallette: {
                border: '5px solid',
                borderRadius: '12px',
                borderImageSlice: '1',
                borderImageSource: `linear-gradient(to left, #743ad5, #d53a9d);`
            }, optionPallette: {
                border: '5px solid transparent',
                '&:hover': {
                    boxShadow: theme.shadows[3]
                },
            }
        })

    })
    const classes = useStyles();

    useEffect(() => {
        if (!product || _.isEmpty(product)) {

            getProduct(id).then((productData) => {
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

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    let sizeOptionsEle = [];
    if (product.variant_groups && product.variant_groups.length) {
        const sizeOptions = _.find(product.variant_groups, { name: "Size" })
        if (sizeOptions.options && sizeOptions.options.length) {
            sizeOptionsEle = _.map(sizeOptions.options, (option) => {
                return (<MenuItem value={option.id}>
                    {option.name}
                </MenuItem>)
            })
        }
    }

    let colorEle = [];
    if (product.variant_groups && product.variant_groups.length) {
        const colorOptions = _.find(product.variant_groups, { name: "Color" })
        if (colorOptions && colorOptions.options && colorOptions.options.length) {
            if (!color) {
                setColor(colorOptions.options[0].id);
            }

            colorEle = _.map(colorOptions.options, (option) => {
                return (
                    <Grid item key={option.id}  >
                        <Box borderRadius={16} onClick={() => setColor(option.id)} border={5} className={color === option.id ? classes.selectedPallette : classes.optionPallette}>
                            <Brightness1SharpIcon fontSize="large" style={{ color: option.name }} />
                        </Box>
                    </Grid>)
            })
        }
    }

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
                    {sizeOptionsEle && sizeOptionsEle.length && (<div>

                        <Typography variant="h5">Size:  <FormControl className={classes.formControl}>
                            <Select
                                labelId="size-open-select-label"
                                id="size-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={size}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    Select
                                </MenuItem>
                                {[sizeOptionsEle]}
                            </Select>
                        </FormControl></Typography>

                    </div>)}

                    {colorEle && colorEle.length ? (

                        <Grid container spacing={2} className={classes.gridPadding}>
                            {[colorEle]}
                        </Grid>

                    ) : ""}
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
