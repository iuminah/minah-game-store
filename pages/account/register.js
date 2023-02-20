import React, {useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import Visibility from "../../assets/icons/visibility_black_18dp.svg";
import VisibilityOff from "../../assets/icons/visibility_off_black_18dp.svg";
import Link from "next/link";
import {registerAccount} from "@/libs/api";
import PopupDialog from "@/components/Dialog/PopupDialog";

function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

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
      setOpenDialog(true);
      setDisableBtn(false);
    } else {
      // console.log(res);
      setErrorMessage(res.response.data.error.message);
      setDisableBtn(false);
    }
  };

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const title = "Chúc mừng bạn đã đăng ký thành công !";
  return (
    <div>
      {/* <PopupDialog openDialog={openDialog} title={title} />
      <div className="flex flex-col justify-center items-center py-4 md:px-0">
        <div className="form-layout">
          <p className="text-center text-xl lg:text-2xl font-bold pb-8">
            Tạo tài khoản
          </p>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <Input
              className="input-text"
              variant="outlined"
              label="Username"
              {...register("username", {required: true})}
            />
            {errors.username ? (
              <p className="form-error">Chưa nhập Username</p>
            ) : (
              <p className="form-error">&nbsp;</p>
            )}
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
              <p className="form-error">{errorMessage}</p>
            ) : (
              <p className="form-error">&nbsp;</p>
            )}
            <Button size="sm" className="p-0 w-full" disabled={disableBtn}>
              <input
                type="submit"
                value="Đăng ký"
                className="text-sm w-full h-full p-2"
              />
            </Button>

            <Link href="/account/login">
              <p className="text-left p-2 mt-1 text-blue-500">Đăng nhập</p>
            </Link>
          </form>
        </div>
      </div> */}
    </div>
  );
}

export default RegisterPage;
