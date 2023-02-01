import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {selectToken} from "@/redux/accountSlice";
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Button, Input, Typography} from "@material-tailwind/react";
import {useRouter} from "next/router";
import {resetPassword} from "@/libs/api";

function ResetPasswordPage(props) {
  const router = useRouter();

  const [privateCode, setPrivateCode] = useState();
  console.log("privateCode :", privateCode);

  useEffect(() => {
    const code = router.query.code;
    setPrivateCode(code);
  }, [router]);

  const token = useSelector(selectToken);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  // if (token === null) {
  //   return (
  //     <>
  //       <p>Bạn không có quyền truy cập trang này</p>
  //     </>
  //   );
  // }

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
    <div className="py-4">
      <Typography className="text-center text-xl lg:text-2xl font-bold pb-8">
        Đặt lại mật khẩu
      </Typography>
      <form
        className="w-3/4 lg:w-1/4 mx-auto form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className="input-text"
          label="Password"
          {...register("password", {required: true})}
        />
        {errors.password ? (
          <Typography className="form-error">Chưa nhập Password</Typography>
        ) : (
          <Typography className="form-error">&nbsp;</Typography>
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
  );
}

ResetPasswordPage.propTypes = {};

export default ResetPasswordPage;
