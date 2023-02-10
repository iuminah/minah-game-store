import {useEffect, useState} from "react";
import {Button, Dialog} from "@material-tailwind/react";
import {useRouter} from "next/router";

export default function PopupDialog({openDialog, title, content}) {
  const router = useRouter();
  const [open, setOpen] = useState(openDialog);

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  const handleOpen = () => {
    setOpen(false);
    router.push("/account/login");
  };

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      animate={{
        mount: {scale: 1, y: 0},
        unmount: {scale: 0.9, y: -100},
      }}
      dismiss={{
        enabled: false,
      }}
      className="dialog"
    >
      <p className="text-xl p-4 py-5 text-blue-500 font-bold">{title}</p>
      <div className="font-bold p-4 space-y-2">
        {content ? (
          <p>{content}</p>
        ) : (
          <>
            <p>Vui lòng kiểm tra email để kích hoạt tài khoản</p>
            <p> Nếu chưa nhận được email, vùi lòng bấm gửi lại ở đây</p>
            <p>Hoặc tại trang Đăng Nhập bấm gửi lại email</p>
          </>
        )}
      </div>
      <div className="flex items-center justify-center px-4 py-4 w-full">
        <Button
          variant="gradient"
          color="blue"
          className="outline-none px-6 py-2"
          onClick={handleOpen}
        >
          <p className="text-white">OK</p>
        </Button>
      </div>
    </Dialog>
  );
}
