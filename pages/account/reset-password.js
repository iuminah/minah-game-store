import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {selectToken} from "@/redux/accountSlice";
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Button, Input, p} from "@material-tailwind/react";
import {useRouter} from "next/router";
import {resetPassword} from "@/libs/api";

function ResetPasswordPage(props) {
  const router = useRouter();

  const [privateCode, setPrivateCode] = useState();

  useEffect(() => {
    const code = router.query.code;
    setPrivateCode(code);
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data) => {
    const res = await resetPassword(privateCode, data.password);
    if (res.status === 200) {
      console.log(res);
      router.push("/account/login");
    } else {
      console.log(res);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-4 md:px-0">
      <div className="form-layout">
        <p className="text-center text-xl lg:text-2xl font-bold pb-8">
          Đặt lại mật khẩu
        </p>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="input-text"
            label="Password"
            {...register("password", {required: true})}
          />
          {errors.password ? (
            <p className="form-error">Chưa nhập Password</p>
          ) : (
            <p className="form-error">&nbsp;</p>
          )}
          <Button size="sm" className="p-0 w-full" disabled={false}>
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

ResetPasswordPage.propTypes = {};

export default ResetPasswordPage;
