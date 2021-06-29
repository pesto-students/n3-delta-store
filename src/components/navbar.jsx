import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import TranslateOutlinedIcon from "@material-ui/icons/TranslateOutlined";
import Favorite from "@material-ui/icons/Favorite";
import Badge from "@material-ui/core/Badge";
import AppLogo from "../resources/images/Delta Store.png";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { openLoginModal } from "../main/store/actions/LoginModalActions";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import LoginModal from "./LoginModal";
import { signOut } from "../services/Authentication/auth";
import { setAuth } from "../main/store/actions/AuthActions";
import { Button, CssBaseline, Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import Search from "../components/search";
import { List as ListIcon } from "@material-ui/icons";
import ElevationScroll from "./elevation";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    ...theme.header,
    backgroundColor: "#ffffff",
    color: "black",
  },
  logo: {
    height: "50px",
    display: "flex",
    alignItems: "center",
    padding: 5,
    cursor: "pointer",
  },
  linkTitle: {
    // flexGrow: 1,
    padding: 5,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

const links = [
  {
    route: "/",
    title: "Home",
  },
  {
    route: "/shop",
    title: "Shop",
  },
  {
    route: "/about",
    title: "About",
  },
];

const Navbar = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useSelector((state) => state?.display?.isMobile || false)
  const open = Boolean(anchorEl);

  const totalCartItems = useSelector(
    (state) => state?.cart?.items?.length || 0
  );
  const authState = useSelector((state) => state?.authReducer);

  const { isLoggedIn } = authState;
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  if (pathname.split("/").length > 2) {
    pathname = `/${pathname.split("/")[1]}`;
  }
  const handleProfileIconClick = (event, route) => {
    console.log(authState);
    !isLoggedIn ? dispatch(openLoginModal()) : setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemOnClick = (route = "") => {
    // !isLoggedIn ? dispatch(openLoginModal()) :
    history.push(`/${route}`);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  }
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  }

  const mainLogo = () => {
    return (
      <Typography
        className={classes.title}
        onClick={() => history.push("/")}
        variant="h6"
        noWrap
      >
        <img src={AppLogo} alt="app-logo" className={classes.logo} />
      </Typography>
    );
  };
  const pageLinks = () => {


    const generatedLinks = links.map(({ route, title }) => {

      return isMobile ? (
        <List
          {...{
            component: "nav",
            "aria-label": { title },
            selected: pathname === route,
            color: pathname === route ? "primary" : "inherit",
            style: { textDecoration: "none" },
            key: title,
          }}
        >
          <ListItem button key={title}
            selected={pathname === route}
            onClick={(event) => { handleDrawerClose(); history.push(route) }}
          >
            <ListItemText primary={title} />
          </ListItem>
        </List >) : (

        <Button
          key={title}
          variant={pathname === route ? "contained" : "text"}
          color="primary"
          onClick={() => {
            history.push(route);
          }}
          className={classes.linkTitle}
        >
          {title}
        </Button>)
    });
    return isMobile ? (
      <>
        <IconButton  {...{
          edge: "start",
          color: "inherit",
          "aria-label": "menu",
          "aria-haspopup": "true",
          onClick: handleDrawerOpen,
        }}>
          <ListIcon />
        </IconButton>
        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div>{generatedLinks}</div>
        </Drawer>

      </>) : generatedLinks;
  };

  const profileMenu = () => {
    return (
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleProfileMenuClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            handleProfileMenuClose();
            handleMenuItemOnClick("profile");
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={async () => {
            await signOut();
            dispatch(setAuth(null));
            handleProfileMenuClose();
            history.push("/");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    );
  };

  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {mainLogo()}
            {pageLinks()}

            <div className={classes.grow} />
            <Search />
            <IconButton aria-label={`Language`} color="inherit">
              <TranslateOutlinedIcon />
            </IconButton>
            <div>{profileMenu()}</div>
            <IconButton
              aria-label={`Profile`}
              color="inherit"
              onClick={(e) => {
                handleProfileIconClick(e, "profile");
              }}
            >
              <AccountCircleOutlinedIcon />
            </IconButton>
            <IconButton
              aria-label={`${totalCartItems} item(s) in your cart`}
              color="inherit"
              onClick={() => {
                handleMenuItemOnClick("cart");
              }}
            >
              <Badge badgeContent={totalCartItems} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="Wish list"
              color="inherit"
              onClick={() => {
                handleMenuItemOnClick("wishlist");
              }}
            >
              <Favorite />
            </IconButton>
            <LoginModal />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
};

export default Navbar;
