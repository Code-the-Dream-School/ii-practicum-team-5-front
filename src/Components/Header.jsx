import React, { useState } from "react";
import RegisterPage from "./Auth/Register";
import LoginPage from "./Auth/Login";
import AlertDialog from "./Common/AlertDialog";
import SearchBar from "./Common/search/SearchBar";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useAuthModal } from "../context/AuthModalContext";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    isLoginOpen,
    isRegisterOpen,
    openLogin,
    openRegister,
    closeLogin,
    closeRegister,
  } = useAuthModal();

  const handleClickMenu = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElement(null);
  };

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setOpenLogoutDialog(false);
    navigate("/");
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  const mobileMenu = (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <Box sx={{ width: 250, padding: 2 }}>
        <List>
          {user ? (
            <>
              <ListItem button onClick={() => navigate("/account")}>
                <ListItemText primary="My Plans" />
              </ListItem>
              <ListItem button onClick={handleLogoutClick}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button onClick={openLogin}>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button onClick={openRegister}>
                <ListItemText primary="Register" />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <div>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "primary.default",
          boxShadow: "none",
          "& .MuiToolbar-root": { padding: 0 },
        }}
      >
        <Toolbar sx={{ padding: 0 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/">
              <img
                src="/images/logo-text-3.png"
                width="140px"
                alt="ZipTrip Logo"
              />
            </Link>
          </Box>

          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              {mobileMenu}
            </>
          ) : user ? (
            <>
              <Button
                sx={{
                  minWidth: "6%",
                  mr: "8px",
                  backgroundColor: "white",
                  color: "inherit",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#inherit",
                  },
                }}
                onClick={() => {
                  navigate("/account");
                }}
              >
                {<PersonIcon />}My Plans
              </Button>
              <Button
                sx={{
                  maxWidth: 180,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  justifyContent: "flex-start",
                  minWidth: "6%",
                  mr: "8px",
                  backgroundColor: "white",
                  color: "inherit",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "inherit",
                  },
                }}
                onClick={handleClickMenu}
              >
                👋 Hello, {user.name.split(" ")[0]}! {<ArrowDropDownIcon />}
              </Button>
              <Menu
                anchorEl={anchorElement}
                open={Boolean(anchorElement)}
                onClose={handleCloseMenu}
                // PaperProps={{
                //   sx: { minWidth: 130 },
                // }}
              >
                <MenuItem
                  sx={{
                    minHeight: "32px",
                    fontSize: "0.9rem",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                  }}
                  onClick={handleLogoutClick}
                >
                  {<LogoutIcon fontSize="small" sx={{ mr: 1 }} />}
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                sx={{
                  minWidth: "6%",
                  marginRight: "1%",
                  backgroundColor: "white",
                  color: "#45a049",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#45a049",
                  },
                }}
                onClick={openLogin}
              >
                Login
              </Button>
              <Button
                color="inherit"
                sx={{ minWidth: "6%" }}
                onClick={openRegister}
              >
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Register Dialog */}
      <RegisterPage
        open={isRegisterOpen}
        handleClose={closeRegister}
        onSwitchToLogin={() => {
          closeRegister();
          openLogin();
        }}
      />
      {/* Login Dialog */}
      <LoginPage
        open={isLoginOpen}
        handleClose={closeLogin}
        onSwitchToRegister={() => {
          openRegister();
          closeLogin();
        }}
      />

      {/* image */}
      <Box
        sx={{
          backgroundImage: "url(/images/main-header.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "230px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant={isMobile ? "h5" : "h4"} color="white">
          Plan your perfect day with ease!
        </Typography>
      </Box>

      {/* Search Bar */}
      <SearchBar />

      {/* Alert Dialog for Logout */}
      <AlertDialog
        isOpen={openLogoutDialog}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        title="Log out?"
        message="Are you sure you want to log out?"
        confirmText="Log out"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Header;
