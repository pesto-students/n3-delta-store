import React, { useState } from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { CardMedia, CircularProgress, IconButton, InputBase, Typography } from '@material-ui/core';
import { SearchOutlined, SearchRounded } from '@material-ui/icons';
import { searchProduct } from '../main/axios/commerce';
import { useHistory } from 'react-router-dom';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const Search = (props) => {


    const StyledMenuItem = makeStyles((theme) => ({
        root: {
            '&:focus': {
                //backgroundColor: theme.palette.primary.main,
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: theme.palette.common.white,
                },
            },
        }, search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 'auto',
            },
        },
        img: {
            height: '40px'
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
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
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
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchResult, setSearchResult] = useState([]);
    const [searching, setSearching] = useState(false);
    const history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton onClick={handleClick} aria-label={`Language`} color="inherit">
                <SearchOutlined />
            </IconButton>

            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem className={classes.root}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchRounded />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            onKeyUp={(e) => {
                                if (!e.currentTarget.value) {
                                    setSearching(false);
                                    setSearchResult([])
                                    return;
                                }
                                setSearching(true);
                                searchProduct(e.currentTarget.value).then((res) => {
                                    setSearching(false);
                                    setSearchResult(res.data)
                                })
                            }}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </MenuItem>
                {searching ? (
                    <MenuItem className={classes.root}>
                        <CircularProgress />
                    </MenuItem>) : searchResult && searchResult.map((product) => {
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
            </StyledMenu>
        </div>
    );
}

export default Search;