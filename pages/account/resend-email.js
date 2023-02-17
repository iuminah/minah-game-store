// import React, {useState} from "react";
// import PropTypes from "prop-types";
// import {useForm} from "react-hook-form";
// import {Button, Input, p} from "@material-tailwind/react";
// import {resendEmail} from "@/libs/api";
// import PopupDialog from "@/components/Dialog/PopupDialog";

// function ResendEmailPage() {
//   const {
//     register,
//     handleSubmit,
//     formState: {errors},
//   } = useForm();

//   const [disableBtn, setDisableBtn] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [error, setError] = useState("");

//   const onSubmit = async (data) => {
//     console.log("data :", data);
//     setDisableBtn(true);
//     const res = await resendEmail(data.email);
//     if (res.status === 200) {
//       // console.log(res);
//       setOpenDialog(true);
//     } else {
//       // console.log(res);
//       setError(res.response.data.error.message);
//       setDisableBtn(false);
//     }
//   };

//   const title = "Email xác thực tài khoản đã đc gửi !";
//   const content = "Chúng tôi đã gửi lại cho bạn email xác thực tài khoản.";
//   return (
//     <div>
//       <PopupDialog openDialog={openDialog} title={title} content={content} />
//       <div className="flex flex-col justify-center items-center py-4 md:px-0">
//         <div className="form-layout">
//           <p className="text-center text-xl lg:text-2xl font-bold pb-8">
//             Confirm Email
//           </p>
//           <form className="form" onSubmit={handleSubmit(onSubmit)}>
//             <Input
//               className="input-text"
//               label="Email"
//               {...register("email", {required: true})}
//             />
//             {errors.email ? (
//               <p className="form-error">Email is required</p>
//             ) : error ? (
//               <p className="form-error">{error}</p>
//             ) : (
//               <p className="form-error">&nbsp;</p>
//             )}
//             <Button size="sm" className="p-0 w-full" disabled={disableBtn}>
//               <input
//                 type="submit"
//                 value="Submit"
//                 className="text-sm w-full h-full p-2"
//               />
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// ResendEmailPage.propTypes = {};

// export default ResendEmailPage;
