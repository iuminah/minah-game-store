import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {Button, Input} from "@material-tailwind/react";
import {useForm} from "react-hook-form";
import {logIn} from "@/libs/api";
import {useRouter} from "next/router";
import Link from "next/link";
import Visibility from "../../assets/icons/visibility_black_18dp.svg";
import VisibilityOff from "../../assets/icons/visibility_off_black_18dp.svg";
import {useDispatch} from "react-redux";
import {setToken, setUserID} from "@/redux/accountSlice";

function LogInPage() {
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
    <div className="flex flex-col justify-center items-center py-4 md:px-0">
      <div className="w-full lg:w-2/5 px-8 lg:px-14 py-8 bg-gray">
        <p className="text-center text-xl lg:text-2xl font-bold pb-8">
          Đăng Nhập
        </p>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="input-text"
            variant="outlined"
            label="Email"
            {...register("email", {required: true})}
          />
          {errors.email ? (
            <p className="form-error">Chưa nhập Email</p>
          ) : (
            <p className="form-error">&nbsp;</p>
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
            <p className="form-error">Chưa nhập password</p>
          ) : errorMessage ? (
            <p className="form-error">Email hoặc Password chưa đúng</p>
          ) : (
            <p className="form-error">&nbsp;</p>
          )}
          <Button size="sm" className="p-0 w-full" disabled={disableBtn}>
            <input
              type="submit"
              value="Đăng nhập"
              className="text-sm w-full h-full p-2"
            />
          </Button>
          <div className="flex flex-col items-center lg:items-start justify-between p-2 my-2.5 space-y-2.5">
            <Link href="/account/register">
              <p className=" text-blue-500">Tạo tài khoản</p>
            </Link>
            <Link href="/account/forgot-password">
              <p className="text-blue-500">Quên mật khẩu</p>
            </Link>
            <Link href="/account/forgot-password">
              <p className="text-blue-500">Gửi lại email xác nhận</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

LogInPage.propTypes = {};

export default LogInPage;
