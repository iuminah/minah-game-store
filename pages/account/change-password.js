import PopupDialog from "@/components/Dialog/PopupDialog";
import {changePassword} from "@/libs/api";
import {
  selectToken,
  setToken,
  setUserData,
  setUserID,
} from "@/redux/accountSlice";
import {Visibility, VisibilityOff} from "@mui/icons-material";
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
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

function ChangePasswordPage() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const userJwt = useSelector(selectToken);
  console.log("userJwt :", userJwt);

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
    const {currentPassword, password, confirmPassword} = data;
    setDisableBtn(true);
    const res = await changePassword(
      currentPassword,
      password,
      confirmPassword,
      userJwt,
    );
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
    dispatch(setToken(null));
    dispatch(setUserID(null));
    dispatch(setUserData(null));
    router.push("/account/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <PopupDialog
        open={openDialog}
        close={handleCloseDialog}
        title={t("change password successful !")}
        content={
          <div className="space-y-2">
            <Typography>
              {t("congratulations, you have successfully change your password")}
            </Typography>
          </div>
        }
      />
      <div className="flex flex-col justify-center items-center py-4 md:px-0">
        <div className="form-layout">
          <p className="text-center text-headline5 font-bold pb-8 uppercase">
            {t("change password")}
          </p>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl variant="standard" sx={{my: 1, width: "100%"}}>
              <InputLabel htmlFor="current password" sx={{px: 0.5}}>
                {t("current password")}
              </InputLabel>
              <Input
                id="current password"
                sx={{px: 0.5}}
                {...register("currentPassword", {required: true})}
              />
              <FormHelperText sx={{px: 0.5, color: "#F07C79"}}>
                {errors.email ? (
                  <span>{t("current password is required")}</span>
                ) : (
                  <span>&nbsp;</span>
                )}
              </FormHelperText>
            </FormControl>
            <FormControl sx={{my: 1, width: "100%"}} variant="standard">
              <InputLabel htmlFor="password" sx={{px: 0.5}}>
                {t("password")}
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
                {errors.password ? (
                  <span>{t("password is required")}</span>
                ) : (
                  <span>&nbsp;</span>
                )}
              </FormHelperText>
            </FormControl>
            <FormControl sx={{my: 1, width: "100%"}} variant="standard">
              <InputLabel htmlFor="confirm-password" sx={{px: 0.5}}>
                {t("confirm password")}
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
                  <span>{t("Your passwords do no match")}</span>
                ) : errors.confirmPassword ? (
                  <span>{t("confirm password is required")}</span>
                ) : errorMessage === "Email or Username are already taken" ? (
                  <span>{t("Email or Username are already taken")}</span>
                ) : errorMessage === "email must be a valid email" ? (
                  <span>{t("email must be a valid email")}</span>
                ) : errorMessage ===
                  "password must be at least 6 characters" ? (
                  <span>{t("password must be at least 6 characters")}</span>
                ) : (
                  <span>&nbsp;</span>
                )}
              </FormHelperText>
            </FormControl>
            <Button
              variant="contained"
              sx={{mb: 1, mt: 3, width: "100%"}}
              disabled={disableBtn}
              type="submit"
            >
              {t("change password")}
            </Button>
            <div className="flex flex-col items-center lg:items-start justify-between p-2 my-2.5 space-y-2.5">
              <Link href="/account/login">
                <p className=" text-primary">{t("login")}</p>
              </Link>
              <Link href="/account/forgot-password">
                <p className="text-primary">{t("forgot password")}</p>
              </Link>
              <Link href="/account/resend-email">
                <p className="text-primary">{t("resend the confirm email")}</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;

export const getStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en-US", ["common"], null, [
        "en-US",
        "vi-VN",
      ])),
    },
    revalidate: true,
  };
};
