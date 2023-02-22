import React, {useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import Link from "next/link";
import {registerAccount} from "@/libs/api";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import PopupDialog from "@/components/Dialog/PopupDialog";
import {useRouter} from "next/router";

function RegisterPage() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data) => {
    const {username, email, password} = data;
    setDisableBtn(true);
    const res = await registerAccount(username, email, password);
    if (res.status === 200) {
      setOpenDialog(true);
      setDisableBtn(false);
    } else {
      setErrorMessage(res.response.data.error.message);
      setDisableBtn(false);
    }
    setDisableBtn(false);
  };

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    router.push("/account/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <PopupDialog
        open={openDialog}
        close={handleCloseDialog}
        title="Register Successful !"
        content={
          <div className="space-y-2">
            <Typography>
              Congratulations, you have successfully registered an account
            </Typography>
            <Typography>
              Please check your email to activate your account
            </Typography>
          </div>
        }
      />
      <div className="flex flex-col justify-center items-center py-4 md:px-0">
        <div className="form-layout">
          <p className="text-center text-headline5 font-bold pb-8">REGISTER</p>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl variant="standard" sx={{my: 1, width: "100%"}}>
              <InputLabel htmlFor="username" sx={{px: 0.5}}>
                User Name
              </InputLabel>
              <Input
                id="username"
                sx={{px: 0.5}}
                {...register("username", {required: true})}
              />
              <FormHelperText sx={{px: 0.5, color: "#F07C79"}}>
                {errors.email ? "User Name is required" : <span>&nbsp;</span>}
              </FormHelperText>
            </FormControl>
            <FormControl variant="standard" sx={{my: 1, width: "100%"}}>
              <InputLabel htmlFor="Email" sx={{px: 0.5}}>
                Email
              </InputLabel>
              <Input
                id="Email"
                sx={{px: 0.5}}
                {...register("email", {required: true})}
              />
              <FormHelperText sx={{px: 0.5, color: "#F07C79"}}>
                {errors.email ? "Email is required" : <span>&nbsp;</span>}
              </FormHelperText>
            </FormControl>
            <FormControl sx={{my: 1, width: "100%"}} variant="standard">
              <InputLabel htmlFor="password" sx={{px: 0.5}}>
                Password
              </InputLabel>
              <Input
                id="password"
                sx={{px: 0.5}}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      onMouseDown={handleShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                {...register("password", {required: true})}
              />
              <FormHelperText sx={{px: 0.5, color: "#F07C79"}}>
                {errors.password ? "Password is required" : <span>&nbsp;</span>}
              </FormHelperText>
            </FormControl>
            <FormControl sx={{my: 1, width: "100%"}} variant="standard">
              <InputLabel htmlFor="confirm-password" sx={{px: 0.5}}>
                Confirm password
              </InputLabel>
              <Input
                id="confirm-password"
                sx={{px: 0.5}}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      onMouseDown={handleShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                {...register("confirmPassword", {
                  required: true,
                  validate: (val) => {
                    if (watch("password") != val) {
                      return "Your passwords do no match";
                    } else {
                      setErrorMessage("");
                    }
                  },
                })}
              />
              <FormHelperText sx={{px: 0.5, color: "#F07C79"}}>
                {errors.confirmPassword?.message ? (
                  errors.confirmPassword.message
                ) : errors.confirmPassword ? (
                  "Confirm password is required"
                ) : errorMessage ? (
                  errorMessage
                ) : (
                  <span>&nbsp;</span>
                )}
              </FormHelperText>
            </FormControl>
            <Button
              variant="contained"
              sx={{mb: 1, mt: 3, width: "100%"}}
              disabled={disableBtn}
            >
              <input
                type="submit"
                value="Register"
                className="w-full h-full cursor-pointer"
              />
            </Button>
            <div className="flex flex-col items-center lg:items-start justify-between p-2 my-2.5 space-y-2.5">
              <Link href="/account/register">
                <p className=" text-primary">Create account</p>
              </Link>
              <Link href="/account/forgot-password">
                <p className="text-primary">Forgot password</p>
              </Link>
              <Link href="/account/resend-email">
                <p className="text-primary">Resend the confirm email</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
