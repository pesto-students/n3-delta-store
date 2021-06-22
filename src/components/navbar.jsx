import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
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
import { signOut } from "../service/auth";
import { setAuth } from "../main/store/actions/AuthActions";

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
    flexGrow: 1,
    padding: 5,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const totalCartItems = useSelector((state) => state?.cart?.length || 0);
  const authState = useSelector((state) => state?.authReducer);

  const { isLoggedIn } = authState;
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {}, []);

  const handleProfileIconClick = (event, route) => {
    !isLoggedIn
      ? handleMenuItemOnClick(route)
      : setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const mainLogo = () => (
    <Typography
      className={classes.title}
      onClick={() => history.push("/")}
      variant="h6"
      noWrap
    >
      <img src={AppLogo} alt="app-logo" className={classes.logo} />
    </Typography>
  );

  const links = [
    {
      route: "home",
      title: "Home",
    },
    {
      route: "shop",
      title: "Shop",
    },
    {
      route: "about",
      title: "About",
    },
    {
      route: "contact",
      title: "Contact",
    },
  ];

  const pageLinks = () => {
    const generatedLinks = links.map(({ route, title }) => (
      <Typography variant="h6" className={classes.linkTitle} key={route}>
        <Link href="#" to={`/${route}`}>
          {title}
        </Link>
      </Typography>
    ));
    return <>{generatedLinks}</>;
  };

  const handleMenuItemOnClick = (route = "") => {
    !isLoggedIn ? dispatch(openLoginModal()) : history.push(`/${route}`);
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
          <div>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleProfileMenuClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
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
                  const result = await signOut();
                  console.log("signout", result);
                  dispatch(setAuth({}));
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
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
}

export default Navbar;
