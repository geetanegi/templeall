import React from "react";
import { Link } from "react-router-dom";
import aceCampLogo from "./assets/images/Logo_png with heading.png";
import { ROUTES } from "./utils/routesPath";
// import AppleSignInButton from "../components/social-login/AppleSignInButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const TestComp: React.FC = () => {
  /***
   * Validation Schema of login Form
   * ***/

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center bg-gradient-green md:w-full">
        <img src={aceCampLogo} alt="" className="mb-[5px] w-[220px]" />
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "40ch" } }}
          noValidate
          autoComplete="off"
        >
          <div className="w-full md:max-w-md">
            <div className="mb-4">
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                type="text"
                className="w-full"
                sx={{
                  input: {
                    color: "white", // White text color
                  },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "transparent", // Transparent background
                    borderColor: "white", // White border color
                  },
                  "& .MuiOutlinedInput-root:hover": {
                    borderColor: "white", // White border on hover
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    borderColor: "white", // White border when focused
                  },
                  "& .MuiInputLabel-root": {
                    color: "white", // White label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white", // White label color when focused
                  },
                }}
              />
            </div>
            <div className="mb-4">
              <TextField
                id="filled-basic"
                label="Filled"
                variant="filled"
                className="w-full"
                sx={{
                  input: {
                    color: "white", // White text color
                  },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "transparent", // Transparent background
                    borderColor: "white", // White border color
                  },
                  "& .MuiOutlinedInput-root:hover": {
                    borderColor: "white", // White border on hover
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    borderColor: "white", // White border when focused
                  },
                  "& .MuiInputLabel-root": {
                    color: "white", // White label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white", // White label color when focused
                  },
                }}
              />
            </div>
            <div className="mb-4">
              <TextField
                id="standard-basic"
                label="Standard"
                variant="standard"
                className="w-full"
                sx={{
                  input: {
                    color: "white", // White text color
                  },
                  "& .MuiInput-underline": {
                    borderColor: "white", // White underline border color
                  },
                  "& .MuiInput-underline:hover": {
                    borderColor: "white", // White border on hover
                  },
                  "& .MuiInput-underline.Mui-focused": {
                    borderColor: "white", // White border when focused
                  },
                  "& .MuiInputLabel-root": {
                    color: "white", // White label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "white", // White label color when focused
                  },
                }}
              />
            </div>

            <div className="text-center">
              <Button
                // sx={{
                //   backgroundColor: "green", // Override button background color
                //   color: "white", // Text color
                //   "&:hover": {
                //     backgroundColor: "darkgreen", // Hover state background color
                //   },
                // }}
                sx={{
                  backgroundColor: "limegreen", // Custom background (ensure you have this variable defined)
                  color: "white", // Custom text color
                  "&:hover": {
                    backgroundColor: "limegreen", // Adjust the hover color as needed
                  },
                }}
                className="h-[36px] w-[200px] rounded-[12px]"
              >
                Login
              </Button>
            </div>
          </div>
        </Box>

        <div className="mt-[40px] flex w-full max-w-sm flex-col justify-center gap-1 text-[14px] md:max-w-md">
          <p className={`text-center text-[14px] text-primaryText`}>
            Don't have an account?{" "}
            <Link
              to={ROUTES.SIGNUP}
              className={`text-[14px] text-link hover:underline`}
            >
              Sign Up
            </Link>
          </p>
          <p className="mt-[10px] text-center text-[14px] text-white">
            - or sign in using -{" "}
          </p>
        </div>
      </div>
    </>
  );
};
export default TestComp;
