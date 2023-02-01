import React, {useState} from "react";
import PropTypes from "prop-types";
import {useForm} from "react-hook-form";
import {Button, Input, Typography} from "@material-tailwind/react";
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
    <div className="py-4">
      <Typography className="text-center text-xl lg:text-2xl font-bold pb-8">
        Quên Mật Khẩu
      </Typography>
      <form
        className="w-3/4 lg:w-1/4 mx-auto form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className="input-text"
          label="Email"
          {...register("email", {required: true})}
        />
        {errors.email ? (
          <Typography className="form-error">Chưa nhập Email</Typography>
        ) : (
          <Typography className="form-error">&nbsp;</Typography>
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
  );
}

ForgotPasswordPage.propTypes = {};

export default ForgotPasswordPage;
