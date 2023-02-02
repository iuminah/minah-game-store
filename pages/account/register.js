import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {Button, Input, Typography} from "@material-tailwind/react";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import Visibility from "../../assets/icons/visibility_black_18dp.svg";
import VisibilityOff from "../../assets/icons/visibility_off_black_18dp.svg";
import Link from "next/link";
import {registerAccount} from "@/libs/api";

function RegisterPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data) => {
    const {username, email, password} = data;
    setDisableBtn(true);
    const res = await registerAccount(username, email, password);
    if (res.status === 200) {
      console.log(res);
    } else {
      console.log(res);
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
        Tạo tài khoản
      </Typography>

      <form className="w-3/4 lg:w-1/4 form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          className="input-text"
          variant="outlined"
          label="Username"
          {...register("username", {required: true})}
        />
        {errors.username ? (
          <Typography className="form-error">Chưa nhập Username</Typography>
        ) : (
          <Typography className="form-error">&nbsp;</Typography>
        )}
        <Input
          className="input-text"
          variant="outlined"
          label="Email"
          {...register("email", {required: true})}
        />
        {errors.email ? (
          <Typography className="form-error">Chưa nhập Email</Typography>
        ) : (
          <Typography className="form-error">&nbsp;</Typography>
        )}
        <Input
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
          <Typography className="form-error">Chưa nhập password</Typography>
        ) : errorMessage ? (
          <Typography className="form-error">
            Email hoặc Username đã tồn tại
          </Typography>
        ) : (
          <Typography className="form-error">&nbsp;</Typography>
        )}
        <Button size="sm" className="p-0 w-full" disabled={disableBtn}>
          <input
            type="submit"
            value="Đăng ký"
            className="text-sm w-full h-full p-2"
          />
        </Button>

        <Link href="/account/login">
          <Typography className="text-left p-2 mt-1 text-blue-500">
            Đăng nhập
          </Typography>
        </Link>
      </form>
    </div>
  );
}

RegisterPage.propTypes = {};

export default RegisterPage;
