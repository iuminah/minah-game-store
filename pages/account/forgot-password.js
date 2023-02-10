import React, {useState} from "react";
import PropTypes from "prop-types";
import {useForm} from "react-hook-form";
import {Button, Input, p} from "@material-tailwind/react";
import {forgotPassword} from "@/libs/api";

function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [disableBtn, setDisableBtn] = useState(false);

  const onSubmit = async (data) => {
    console.log("data :", data);
    setDisableBtn(true);
    const res = await forgotPassword(data.email);
    if (res.status === 200) {
      console.log(res);
    } else {
      console.log(res);
      setDisableBtn(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-4 md:px-0">
      <div className="form-layout">
        <p className="text-center text-xl lg:text-2xl font-bold pb-8">
          Quên Mật Khẩu
        </p>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="input-text"
            label="Email"
            {...register("email", {required: true})}
          />
          {errors.email ? (
            <p className="form-error">Chưa nhập Email</p>
          ) : (
            <p className="form-error">&nbsp;</p>
          )}
          <Button size="sm" className="p-0 w-full" disabled={disableBtn}>
            <input
              type="submit"
              value="Gửi"
              className="text-sm w-full h-full p-2"
            />
          </Button>
        </form>
      </div>
    </div>
  );
}

ForgotPasswordPage.propTypes = {};

export default ForgotPasswordPage;
