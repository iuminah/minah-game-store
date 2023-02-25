import React, {useCallback, useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {getUserData, logIn} from "@/libs/api";
import {useRouter} from "next/router";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {
  selectToken,
  selectUserID,
  setToken,
  setUserData,
  setUserID,
} from "@/redux/accountSlice";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

function LogInPage() {
  const {t} = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setDisableBtn(true);
    const {email, password} = data;
    await logIn(email, password).then((res) => {
      if (res.status === 200) {
        dispatch(setToken(res.data.jwt));
        dispatch(setUserID(res.data.user.id));
        router.push("/");
      } else {
        setErrorMessage(res.response.data.error.message);
        setDisableBtn(false);
      }
    });
  };

  const token = useSelector(selectToken);
  const userId = useSelector(selectUserID);

  useEffect(() => {
    if (userId) {
      (async function userData() {
        const data = await getUserData(userId);
        dispatch(setUserData(data));
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  if (token) {
    router.push("/");
  }

  return (
    <div className="flex flex-col justify-center items-center py-4 md:px-0">
      <div className="form-layout">
        <p className="text-center text-headline5 font-bold pb-8 uppercase">
          {t("login")}
        </p>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
              {errors.email ? (
                <span>{t("email is required")}</span>
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
                    aria-label="toggle password visibility"
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
              {errors.email ? (
                <span>{t("password is required")}</span>
              ) : errorMessage === "Invalid identifier or password" ? (
                <span>{t("Invalid identifier or password")}</span>
              ) : errorMessage === "Your account email is not confirmed" ? (
                <span>{t("Your account email is not confirmed")}</span>
              ) : (
                <span>&nbsp;</span>
              )}
            </FormHelperText>
          </FormControl>
          <Button
            variant="contained"
            sx={{my: 1, width: "100%"}}
            disabled={disableBtn}
            type="submit"
          >
            {t("login")}
          </Button>
          <div className="flex flex-col items-center lg:items-start justify-between p-2 my-2.5 space-y-2.5">
            <Link href="/account/register">
              <p className=" text-primary">{t("create account")}</p>
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
  );
}

LogInPage.propTypes = {};

export default LogInPage;

export const getStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"], null, [
        "en",
        "vi-VN",
      ])),
    },
  };
};
