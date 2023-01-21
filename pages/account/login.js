import React, {useState} from "react";
// import PropTypes from "prop-types";
import {Button, Input, Typography} from "@material-tailwind/react";
import {useForm} from "react-hook-form";
import {logIn} from "@/libs/api";
import {useRouter} from "next/router";

function login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Data Login : ", data);
    const {email, password} = data;
    const res = await logIn(email, password);
    console.log("res :", res);
    if (res.status === 200) {
      localStorage.setItem("token", res.data.jwt);
      localStorage.setItem("username", res.data.user.username);
      router.push("/");
    } else {
      setErrorMessage(res.response.data.error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <Typography className="text-center text-xl lg:text-2xl font-bold">
        Login
      </Typography>

      <form className="w-3/4 lg:w-1/5 space-y-4">
        <Input
          variant="outlined"
          label="Email"
          {...register("email", {required: true})}
        />
        {errors.email && <p>Chưa nhập Email</p>}
        <Input
          variant="outlined"
          label="Password"
          type="password"
          {...register("password", {required: true})}
        />
        {errors.password && <p>Chưa nhập Password</p>}
        {errorMessage ? <p>Email hoặc Password chưa đúng</p> : null}
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </form>
    </div>
  );
}

// login.propTypes = {};

export default login;
