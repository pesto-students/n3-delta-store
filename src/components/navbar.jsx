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
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
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

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
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
    const generatedLinks = links.map(({ route, title }) => (
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
      </Button>

      // <Typography variant="h6" className={classes.linkTitle} key={route}>
      //   <Link href="#" to={`/${route}`}>
      //     {title}
      //   </Link>
      // </Typography>
    ));
    return <>{generatedLinks}</>;
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
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          {mainLogo()}
          {pageLinks()}

          <div className={classes.grow} />
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
    </div>
  );
};

export default Navbar;
