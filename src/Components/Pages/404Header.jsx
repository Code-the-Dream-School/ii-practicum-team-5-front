import React, { useState } from "react";
import RegisterPage from "../Auth/Register";
import LoginPage from "../Auth/Login";
import AlertDialog from "../Common/AlertDialog";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const NotFoundHeader = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickRegisterOpen = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  const handleClickLoginOpen = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const handleLogoutClick = () => setOpenLogoutDialog(true);
  const handleLogoutConfirm = () => {
    logout();
    setOpenLogoutDialog(false);
    navigate("/");
  };
  const handleLogoutCancel = () => setOpenLogoutDialog(false);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "primary.default",
          boxShadow: "none",
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Toolbar sx={{ px: 2, py: isMobile ? 1 : 0 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/">
              <img
                src="/images/logo-text-3.png"
                width={isMobile ? "100px" : "140px"}
                alt="ZipTrip Logo"
              />
            </Link>
          </Box>

          {/* Mobile menu */}
          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <List sx={{ width: 200 }}>
                  {user ? (
                    <>
                      <ListItem>
                        <Typography sx={{ ml: 1 }}>
                          👋 Hello, {user.name.split(" ")[0]}!
                        </Typography>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton onClick={handleLogoutClick}>
                          <ListItemText primary="Logout" />
                        </ListItemButton>
                      </ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton onClick={handleClickLoginOpen}>
                          <ListItemText primary="Login" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton onClick={handleClickRegisterOpen}>
                          <ListItemText primary="Register" />
                        </ListItemButton>
                      </ListItem>
                    </>
                  )}
                </List>
              </Drawer>
            </>
          ) : (
            // Desktop menu
            <>
              {user ? (
                <>
                  <Typography
                    sx={{ mr: 2, fontSize: "1rem", whiteSpace: "nowrap" }}
                  >
                    👋 Hello, {user.name.split(" ")[0]}!
                  </Typography>
                  <Button
                    sx={{
                      minWidth: "6%",
                      backgroundColor: "white",
                      color: "#45a049",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "white", color: "#45a049" },
                    }}
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    sx={{
                      minWidth: "6%",
                      mr: 1,
                      backgroundColor: "white",
                      color: "#45a049",
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "white", color: "#45a049" },
                    }}
                    onClick={handleClickLoginOpen}
                  >
                    Login
                  </Button>
                  <Button
                    color="inherit"
                    sx={{ minWidth: "6%" }}
                    onClick={handleClickRegisterOpen}
                  >
                    Register
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Dialogs */}
      <RegisterPage
        open={openRegister}
        handleClose={handleCloseRegister}
        onSwitchToLogin={() => {
          setOpenRegister(false);
          setOpenLogin(true);
        }}
      />
      <LoginPage
        open={openLogin}
        handleClose={handleCloseLogin}
        onSwitchToRegister={() => {
          setOpenRegister(true);
          setOpenLogin(false);
        }}
      />
      <AlertDialog
        isOpen={openLogoutDialog}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        title="Log out?"
        message="Are you sure you want to log out?"
        confirmText="Log out"
        cancelText="Cancel"
      />
    </>
  );
};

export default NotFoundHeader;
