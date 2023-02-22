import React, {useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import {resendEmail} from "@/libs/api";
import PopupDialog from "@/components/Dialog/PopupDialog";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import {useRouter} from "next/router";

function ResendEmailPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [disableBtn, setDisableBtn] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setDisableBtn(true);
    const res = await resendEmail(data.email);
    if (res.status === 200) {
      setOpenDialog(true);
    } else {
      setError(res.response.data.error.message);
      setDisableBtn(false);
    }
  };

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    router.push("/account/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <PopupDialog
          open={openDialog}
          close={handleCloseDialog}
          title="Successful !"
          content={
            <Typography>
              We have sent you an account verification email
            </Typography>
          }
        />
        <div className="flex flex-col justify-center items-center py-4 md:px-0">
          <div className="form-layout">
            <p className="text-center text-headline5 font-bold pb-2">
              VERIFICATION EMAIL
            </p>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <FormControl variant="standard" sx={{my: 1, width: "100%"}}>
                <InputLabel htmlFor="Email" sx={{px: 0.5}}>
                  Email
                </InputLabel>
                <Input
                  id="Email"
                  sx={{px: 0.5}}
                  {...register("email", {required: true})}
                />
                <FormHelperText sx={{px: 0.5}}>
                  {errors.email ? (
                    <span className="text-error">Email is required</span>
                  ) : error ? (
                    error
                  ) : (
                    <span>
                      Enter the email you need to verification your account
                    </span>
                  )}
                </FormHelperText>
              </FormControl>

              <Button
                variant="contained"
                sx={{mb: 1, mt: 3, width: "100%"}}
                disabled={disableBtn}
              >
                <input
                  type="submit"
                  value="SEND"
                  className="w-full h-full cursor-pointer"
                />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResendEmailPage;
