import React, {useCallback, useState} from "react";
import {useSelector} from "react-redux";
import {selectUserData} from "@/redux/accountSlice";
import {useForm} from "react-hook-form";
import {changeUserInfo} from "@/libs/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useRouter} from "next/router";
import CropImage from "@/components/crop-image/CropImage";
import {Button, TextField} from "@mui/material";
import {useTranslation} from "react-i18next";

function ProfilePage() {
  const {t} = useTranslation();
  const router = useRouter();
  const {register, handleSubmit, reset} = useForm();
  const userData = useSelector(selectUserData);
  const {username, email, avatar} = userData?.attributes ?? {};

  const [imageID, setImageID] = useState();
  const [editInfo, setEditInfo] = useState(false);

  const getImageID = useCallback((id) => {
    setImageID(id);
  });

  const handleEdit = useCallback(() => {
    setEditInfo((pre) => !pre);
    reset();
  }, []);

  const onSubmit = async (input) => {
    let inputData = {
      username: input.username,
      email: input.email,
      avatar: imageID,
    };
    const res = await changeUserInfo(userData.id, inputData);
    console.log("res :", res);
  };

  if (!userData) {
    router.push("/");
  } else {
    return (
      <div className="flex justify-center items-center min-h-[calc(100dvh-441px)]">
        <div className="w-full bg-background-secondary p-10 rounded-xl">
          <p className="text-center text-headline4 pb-10">{t("profile")}</p>
          <form className="block" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row justify-center space-x-0 lg:space-x-8 space-y-6 lg:space-y-0">
              <div>
                <CropImage
                  currentAvatar={avatar}
                  editInfo={editInfo}
                  getImageID={getImageID}
                />
              </div>
              <div className="flex flex-col justify-between space-y-8 lg:space-y-0 w-full lg:w-2/4">
                <div className="w-full flex flex-col space-y-6">
                  <TextField
                    variant={editInfo ? "outlined" : "filled"}
                    disabled={!editInfo}
                    id="outlined-disabled"
                    label="User Name"
                    defaultValue={username}
                    {...register("username")}
                  />
                  <TextField
                    variant={editInfo ? "outlined" : "filled"}
                    disabled={!editInfo}
                    id="outlined-disabled"
                    label="Email"
                    defaultValue={email}
                    {...register("email")}
                  />
                  <Button variant="outlined">{t("change password")}</Button>
                </div>
                <div className="space-x-4 flex justify-center items-center">
                  <Button
                    sx={{width: "100%"}}
                    variant="contained"
                    onClick={handleEdit}
                  >
                    {editInfo ? "Cancel" : "Edit"}
                  </Button>
                  {editInfo ? (
                    <Button
                      sx={{width: "100%"}}
                      variant="contained"
                      type="submit"
                    >
                      Save
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {};

export default ProfilePage;

export const getStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en-US", ["common"], null, [
        "en-US",
        "vi-VN",
      ])),
    },
  };
};
