import React, { useEffect, useMemo, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import {
  CardMedia,
  CircularProgress,
  IconButton,
  InputBase,
  Menu,
  Paper,
  Typography,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { searchProduct } from "../main/axios/commerce";
import { useHistory } from "react-router-dom";
import _ from "lodash";

const Search = (props) => {
  const StyledMenuItem = makeStyles((theme) => ({
    img: {
      height: "40px",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    paper: {
      display: "flex",
    },
    searchStatus: {
      width: theme.spacing(8),
      height: "100%",
    },
    endIcon: {
      padding: 0,
    },

    inputRoot: {
      color: theme.palette.primary.main,
    },
    form: {
      display: "flex",
    },
    input: {
      padding: theme.spacing(1),
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    },
    media: {
      paddingRight: theme.spacing(2),
    },
    productName: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "20ch",
    },
  }));

  const classes = StyledMenuItem();
  const [searchResult, setSearchResult] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const debounceCallBack = (searchString) => {
    setSearching(true);
    if (!searchString) {
      setSearching(false);
      setSearchResult([]);
      return;
    }
    setSearching(true);
    searchProduct(searchString).then((res) => {
      setSearching(false);
      setSearchResult(res.data);
    });
  };
  const debounce_fun = useMemo(() => _.debounce(debounceCallBack, 1000), []);

  useEffect(() => {
    debounce_fun(searchString);
  }, [debounce_fun, searchString]);

  const searchResultInput = (e) => {
    setSearchString(e.currentTarget.value);
  };

  const handleClose = () => {
    setSearchResult([]);
  };

  return (
    <div className={classes.search}>
      <Paper className={classes.paper} elevation={2}>
        <InputBase
          endAdornment={
            <div className={classes.searchStatus}>
              {searching ? <CircularProgress color="primary" /> : null}
            </div>
          }
          value={searchString}
          placeholder="Search.."
          onClick={handleClick}
          onChange={(e) => {
            searchResultInput(e);
          }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{
            "aria-label": "search",
          }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchOutlined />
        </IconButton>
      </Paper>
      <Menu
        open={
          anchorEl && searchString && !!(searchResult && searchResult.length)
            ? true
            : false
        }
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        getContentAnchorEl={null}
        elevation={18}
      >
        {searchResult &&
          searchResult.map((product) => {
            return (
              <MenuItem
                tabIndex={0}
                onClick={() => {
                  setSearchString("");
                  setSearchResult([]);
                  setAnchorEl(null);
                  history.push(`/shop/product/${product.id}`);
                }}
                key={product.id}
                className={classes.root}
              >
                <CardMedia className={classes.media}>
                  <img
                    className={classes.img}
                    src={product.media.source}
                    alt={classes.media}
                  />
                </CardMedia>
                <Typography
                  aria-label={product.name}
                  variant="h6"
                  className={classes.productName}
                >
                  {product.name}
                </Typography>
              </MenuItem>
            );
          })}
      </Menu>
    </div>
  );
};

export default Search;
