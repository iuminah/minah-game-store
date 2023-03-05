import React, {useCallback, useState} from "react";
import {Cropper} from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  Alert,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  Divider,
  Snackbar,
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {b64toBlob, getImageUrl} from "@/libs/ultis";
import Image from "next/image";
import {uploadAvatar} from "@/libs/api";

function CropImage({currentAvatar, editInfo, getImageID}) {
  const {t} = useTranslation();

  const [image, setImage] = useState();
  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [mess, setMess] = useState();

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    setOpenDialog(true);
    setMess("");
  };

  const getCropData = async () => {
    if (typeof cropper !== "undefined") {
      const croped = cropper.getCroppedCanvas().toDataURL();
      setCropData(croped);
      const block = croped.split(";");
      const contentType = block[0].split(":")[1];
      const realData = block[1].split(",")[1];
      const blob = b64toBlob(realData, contentType);
      setOpenDialog(false);
      const response = await uploadAvatar(blob);
      if (response.status === 200) {
        response
          .json()
          .then((res) => {
            getImageID(res[0].id);
          })
          .catch((err) => {
            console.log("err : ", err);
          });
      } else {
        setMess(t("image size is too large"));
      }
    }
  };

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div>
          <div className="w-[185px] h-[185px] lg:w-[250px] lg:h-[250px]">
            <Avatar
              variant="rounded"
              alt="Avatar"
              sx={{width: "100%", height: "100%"}}
              src={cropData || getImageUrl(currentAvatar)}
            />
          </div>
          <div className="text-center text-error pt-2">{mess}</div>
          {editInfo ? (
            <div className="mt-4 flex items-center justify-center w-full">
              <>
                <Button variant="contained" sx={{width: "100%", p: 0}}>
                  <label
                    htmlFor="file-upload"
                    className="w-full h-full p-1.5 cursor-pointer"
                  >
                    {t("choose image")}
                  </label>
                </Button>
                <input
                  type="file"
                  id="file-upload"
                  onChange={onChange}
                  hidden
                />
              </>
            </div>
          ) : null}
        </div>
      </div>
      <Dialog open={openDialog} className="select-none">
        <div className="p-4 lg:p-6 pb-0 flex flex-col justify-center items-center space-y-4">
          <p className="uppercase font-medium">{t("edit image")}</p>
          <Cropper
            style={{height: "300px", width: "100%", overflow: "hidden"}}
            zoomTo={0}
            aspectRatio={1}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
            dragMode="move"
            toggleDragModeOnDblclick={false}
          />
          <div
            className="img-preview select-none"
            style={{width: "100%", height: "180px"}}
          />
        </div>
        <div className="mt-4">
          <Divider />
        </div>
        <DialogActions>
          <div className="flex justify-center items-center w-full my-2 space-x-4">
            <Button onClick={handleCloseDialog}>{t("cancel")}</Button>
            <Button
              variant="contained"
              style={{float: "right"}}
              onClick={getCropData}
            >
              {t("crop image")}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CropImage;
