import React, {useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import {logIn} from "@/libs/api";
import {useRouter} from "next/router";
import Link from "next/link";
import Visibility from "../../assets/icons/visibility_black_18dp.svg";
import VisibilityOff from "../../assets/icons/visibility_off_black_18dp.svg";
import {useDispatch, useSelector} from "react-redux";
import {selectToken, setToken, setUserID} from "@/redux/accountSlice";
import {Button, Input} from "antd";

function LogInPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const token = useSelector(selectToken);
  // if (token) return <p className="text-center">You are logged in</p>;

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data) => {
    setDisableBtn(true);
    const {email, password} = data;
    const res = await logIn(email, password);
    if (res.status === 200) {
      dispatch(setUserID(res.data.user.id));
      dispatch(setToken(res.data.jwt));
      router.push("/");
    } else {
      setErrorMessage(res.response.data.error.message);
      setDisableBtn(false);
    }
  };

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <div className="flex flex-col justify-center items-center py-4 md:px-0">
      <div className="form-layout">
        <p className="text-center text-xl lg:text-2xl font-bold pb-8">Login</p>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="input-text"
            variant="outlined"
            label="Email"
            {...register("email", {required: true})}
          />
          {errors.email ? (
            <p className="form-error">Email is required</p>
          ) : (
            <p className="form-error">&nbsp;</p>
          )}
          <input
            className="input-text"
            variant="outlined"
            label="Password"
            type={showPassword ? "text" : "password"}
            {...register("password", {required: true})}
            icon={
              <div className="cursor-pointer" onClick={handleShowPassword}>
                {showPassword ? (
                  <VisibilityOff className="fill-text-primary" />
                ) : (
                  <Visibility className="fill-text-primary" />
                )}
              </div>
            }
          />
          {errors.password ? (
            <p className="form-error">Password is required</p>
          ) : errorMessage ? (
            <p className="form-error">{errorMessage}</p>
          ) : (
            <p className="form-error">&nbsp;</p>
          )}
          {/* <Button className="p-0 w-full" disabled={disableBtn}> */}
          <input
            type="submit"
            value="Login"
            className="text-sm w-full h-full p-2"
          />
          {/* </Button> */}
          <div className="flex flex-col items-center lg:items-start justify-between p-2 my-2.5 space-y-2.5">
            <Link href="/account/register">
              <p className=" text-blue-500">Create account</p>
            </Link>
            <Link href="/account/forgot-password">
              <p className="text-blue-500">Forgot password</p>
            </Link>
            <Link href="/account/resend-email">
              <p className="text-blue-500">Resend the confirm email</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

LogInPage.propTypes = {};

export default LogInPage;
