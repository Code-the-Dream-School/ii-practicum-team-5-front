import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  Divider,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { postData } from "../../util";
import { useAuth } from "../../context/AuthContext";

const LOGIN_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`;
const FORGOT_PASSWORD_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/request-reset-password`;

const LoginPage = ({ open, handleClose, onSwitchToRegister }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setErrorMessage("");

    if (!newEmail) {
      setEmailError("Email is required.");
      setIsValid(false);
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(newEmail)
    ) {
      setEmailError("Email is invalid.");
      setIsValid(false);
    } else {
      setEmailError("");
      setIsValid(true);
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setErrorMessage("");

    if (!newPassword || newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      setIsValid(false);
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(newPassword)) {
      setPasswordError(
        "Password must include at least one uppercase letter, one lowercase letter, and one number.",
      );
      setIsValid(false);
    } else {
      setPasswordError("");
      setIsValid(true);
    }
  };

  const handleCheckboxChange = (event) => {
    setCheckbox(event.target.checked);
  };

  const handleDialogClose = () => {
    setEmail("");
    setPassword("");
    setCheckbox(false);
    setEmailError("");
    setPasswordError("");
    setErrorMessage("");
    setSuccessMessage("");
    setIsValid(true);
    setShowForgotPassword(false);
    handleClose();
  };

  const handleLogin = async () => {
    if (!email || !password || !isValid) {
      setEmailError("Email is required");
      setPasswordError("Password is required");
      setIsValid(false);
      return;
    }

    try {
      const data = await postData(LOGIN_URL, { email, password });
      if (data) {
        const { token, _id: userId, name, email, imageURL } = data;
        await login(userId, name, email, imageURL, token);
        navigate("/account");
        handleDialogClose();
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email || emailError) {
      setEmailError("Please enter a valid email.");
      return;
    }

    try {
      await postData(FORGOT_PASSWORD_URL, { email });
      setSuccessMessage("Reset link sent. Check your email.");
      setErrorMessage("");
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(
        error.response?.data?.msg || "Failed to send reset link.",
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: { xs: 0, sm: 3 },
          mx: { xs: 0, sm: "auto" },
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          px: { xs: 2, sm: 6 },
          py: { xs: 2, sm: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          {/* Left Section */}
          <Box
            sx={{
              flex: 1,
              px: 2,
              py: 3,
              minWidth: { xs: "100%", sm: "300px" },
            }}
          >
            {!showForgotPassword ? (
              <>
                <Typography variant="h5" gutterBottom textAlign="center">
                  Sign In
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  fullWidth
                  sx={{ my: 2 }}
                >
                  Sign in with Google
                </Button>
                <Divider sx={{ my: 1 }}>
                  <Typography sx={{ color: "#8c8c8c" }}>OR</Typography>
                </Divider>
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  value={email}
                  error={emailError !== ""}
                  helperText={emailError}
                  onChange={handleEmailChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  value={password}
                  error={passwordError !== ""}
                  helperText={passwordError}
                  onChange={handlePasswordChange}
                  required
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkbox}
                      onChange={handleCheckboxChange}
                      sx={{
                        "&.Mui-checked": {
                          borderColor: "#333333",
                          color: "#333333",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      Remember for 30 days
                    </Typography>
                  }
                />
                <Button
                  variant="text"
                  size="small"
                  onClick={() => setShowForgotPassword(true)}
                  sx={{
                    color: "#45a049",
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "#45a049",
                    },
                  }}
                >
                  Forgot password?
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={handleLogin}
                >
                  Sign in
                </Button>
                {errorMessage && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {errorMessage}
                  </Alert>
                )}
                <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                  Don’t have an account?{" "}
                  <Button
                    variant="text"
                    onClick={() => {
                      onSwitchToRegister();
                      handleDialogClose();
                    }}
                    sx={{
                      color: "text.primary",
                      backgroundColor: "white",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "#45a049",
                      },
                    }}
                  >
                    Sign up
                  </Button>
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h5" gutterBottom textAlign="center">
                  Forgot Password
                </Typography>
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  value={email}
                  error={emailError !== ""}
                  helperText={emailError}
                  onChange={handleEmailChange}
                  required
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleForgotPassword}
                >
                  Send Reset Link
                </Button>
                <Button
                  variant="text"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => {
                    setShowForgotPassword(false);
                    setSuccessMessage("");
                    setErrorMessage("");
                  }}
                >
                  Back to Sign In
                </Button>
                {successMessage && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    {successMessage}
                  </Alert>
                )}
                {errorMessage && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {errorMessage}
                  </Alert>
                )}
              </>
            )}
          </Box>

          {/* Right Section */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#484747",
              color: "white",
              px: 2,
              py: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minWidth: { xs: "100%", sm: "300px" },
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Welcome to OneDayPlan!
            </Typography>
            <Typography variant="body2" sx={{ mb: 5, px: 2 }}>
              Get started now and make each day count by planning fun and
              meaningful activities that fit your lifestyle!
            </Typography>
            <Box
              component="img"
              src="https://s3-alpha-sig.figma.com/img/48f1/4826/c25c43d183d79ae91c15f66b7e2f61f8?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TE-A-vmPCp~~Pp13vu9Pjz0g2BysQrB15UKyQIwref7o-EESixHLj-aFTRRXWsk1tTkMDtEwOR0m3rOg-hXkywniX3WpFCdGe8ys6BJz9Bg46toz3Gdg4P~RZkMIhWV31~1QcfhCU-WgBmOOFcKCjcI-X2Us7dtYmYb~XcciPvktsiWNeUEzXkR5WD4KmGrsoO2n~YbjBaE8FovtQUZAGPPY3wGXGW7B6hJ8OD4osAezrOrOhPfRTD3tqg4ws00kTW11CQljoCG9q0fSNc7Nbj9ABqiuRaoDSBBGl3~R-bnGSv1GiuzQ72O7K-K-k57aBvKRnFwYTAQTe~VtDLSQfg__"
              alt="City View"
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", sm: 350 },
                height: { xs: 150, sm: 190 },
                objectFit: "cover",
                objectPosition: "bottom",
                mx: "auto",
                borderRadius: 2,
              }}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

LoginPage.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  onSwitchToRegister: PropTypes.func,
};

export default LoginPage;
