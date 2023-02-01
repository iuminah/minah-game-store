import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {Button, IconButton, Input, Typography} from "@material-tailwind/react";
import {useForm} from "react-hook-form";
import {logIn} from "@/libs/api";
import {useRouter} from "next/router";
import Link from "next/link";
import Visibility from "../../assets/icons/visibility_black_18dp.svg";
import VisibilityOff from "../../assets/icons/visibility_off_black_18dp.svg";
import {useDispatch} from "react-redux";
import {setToken, setUserID} from "@/redux/accountSlice";

function LogIn() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="flex flex-col justify-center items-center py-4">
      <Typography className="text-center text-xl lg:text-2xl font-bold pb-8">
        Đăng nhập
      </Typography>

      <form className="w-3/4 lg:w-1/5 form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          className="input-text"
          variant="outlined"
          label="Email"
          {...register("email", {required: true})}
        />
        <div className="pl-3">
          {errors.email ? (
            <Typography className="form-error">Chưa nhập Email</Typography>
          ) : (
            <Typography className="form-error">&nbsp;</Typography>
          )}
        </div>
        <Input
          className="input-text"
          variant="outlined"
          label="Password"
          type={showPassword ? "text" : "password"}
          {...register("password", {required: true})}
          icon={
            <div className="cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? (
                <VisibilityOff className="fill-white" />
              ) : (
                <Visibility className="fill-white" />
              )}
            </div>
          }
        />
        <div className="pl-3">
          {errors.password ? (
            <Typography className="form-error">Chưa nhập password</Typography>
          ) : errorMessage ? (
            <Typography className="form-error">
              Email hoặc Password chưa đúng
            </Typography>
          ) : (
            <Typography className="form-error">&nbsp;</Typography>
          )}
        </div>
        <Button size="sm" className="p-0 w-full" disabled={disableBtn}>
          <input
            type="submit"
            value="Đăng nhập"
            className="text-sm w-full h-full p-2"
          />
        </Button>

        <Link href="/account/register">
          <Typography className="text-left p-2 mt-1 text-blue-500">
            Tạo tài khoản
          </Typography>
        </Link>
      </form>
    </div>
  );
}

LogIn.propTypes = {};

export default LogIn;
