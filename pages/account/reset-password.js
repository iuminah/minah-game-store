import React, {useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {resetPassword} from "@/libs/api";
import PopupDialog from "@/components/Dialog/PopupDialog";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
  Input,
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "react-i18next";

function ResetPasswordPage() {
  const {t} = useTranslation();
  const router = useRouter();

  const [privateCode, setPrivateCode] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const code = router.query.code;
    setPrivateCode(code);
  }, [router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data) => {
    setDisableBtn(true);
    const res = await resetPassword(privateCode, data.password);
    if (res.status === 200) {
      setOpenDialog(true);
      setDisableBtn(false);
    } else {
      setErrorMessage(res.response.data.error.message);
      setDisableBtn(false);
    }
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
        title="Reset password successful !"
        content={
          <div className="space-y-2">
            <Typography>
              {t("congratulations, you have successfully reset your password")}
            </Typography>
          </div>
        }
      />
      <div className="flex flex-col justify-center items-center py-4 md:px-0">
        <div className="form-layout">
          <p className="text-center text-headline5 font-bold pb-8 uppercase">
            {t("reset password")}
          </p>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
                      return <span>{t("Your passwords do no match")}</span>;
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
                  <span>{t("confirm password is required")}</span>
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
              {t("reset password")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;

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
