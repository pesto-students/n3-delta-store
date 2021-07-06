import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { CardMedia, CircularProgress, IconButton, InputBase, Menu, Paper, Typography } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { searchProduct } from '../main/axios/commerce';
import { useHistory } from 'react-router-dom';


const Search = (props) => {


    const StyledMenuItem = makeStyles((theme) => ({
        img: {
            height: '40px'
        }, search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchStatus: {
            width: theme.spacing(8),
            height: '100%'
        }, endIcon: {
            padding: 0
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'primary',
        }, form: {
            display: 'flex'
        },
        input: {
            padding: theme.spacing(1),
        }, inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        }, media: {
            paddingRight: theme.spacing(2)
        }, productName: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '20ch',
        }
    }));

    const classes = StyledMenuItem()
    const [searchResult, setSearchResult] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSearchResult([])
    };

    return (
        <div className={classes.search}>
            <Paper component="form" className={classes.form} onSubmit={(e) => {
                e.preventDefault(); setSearching(true);
                if (!searchString) {
                    setSearching(false);
                    setSearchResult([])
                    return;
                }
                setSearching(true);
                searchProduct(searchString).then((res) => {
                    setSearching(false);
                    setSearchResult(res.data)
                })
            }} >
                <InputBase
                    endAdornment={
                        <div className={classes.searchStatus}>

                            {searching ? (
                                <CircularProgress color="primary" />
                            ) : null}
                        </div>
                    }
                    value={searchString}
                    placeholder="Search.."
                    onClick={handleClick}
                    onChange={(e) => { setSearchString(e.currentTarget.value) }}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{
                        'aria-label': 'search'
                    }}
                />
                <IconButton type="submit" className={classes.searchIcon} aria-label="search">
                    <SearchOutlined />
                </IconButton>
            </Paper>
            <Menu open={anchorEl && searchString && !!(searchResult && searchResult.length) ? true : false}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                getContentAnchorEl={null}
                elevation={0}
            >

                {searchResult && searchResult.map((product) => {
                    return (<MenuItem onClick={() => {
                        history.push(`/shop/product/${product.id}`)
                        setSearchResult([]);
                        setAnchorEl(null);
                    }} key={product.id} className={classes.root}>
                        <CardMedia
                            className={classes.media}
                        >
                            <img className={classes.img} src={product.media.source} alt={classes.media} />
                        </CardMedia>
                        <Typography aria-label={product.name} variant="h6" className={classes.productName}>{product.name}</Typography>
                    </MenuItem>)
                })}
            </Menu>

        </div>
    );
}

export default Search;